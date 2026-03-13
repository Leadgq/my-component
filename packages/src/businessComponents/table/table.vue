<template>
    <div class="yo-table-wrap">
        <el-table ref="tableRef" :data="tableData" v-loading="loading" v-bind="tableAttrs">
            <el-table-column v-if="showCheckbox" type="selection" width="50" />
            <el-table-column v-if="columns.length > 0" type="index" label="序号" align="center"
                :width="noWidth ? noWidth : '60px'" />
            <TableColumn v-for="(column, idx) in visibleColumns" :key="column.prop || column.label || idx"
                :column="column" />
        </el-table>
        <div class="yo-table-pagination" v-if="isShowPagination && pagination.total > 0">
            <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :page-sizes="paginSize" :total="pagination.total" layout="total, prev, pager, next, sizes, jumper"
                @current-change="handlePageChange" @size-change="handleSizeChange" />
        </div>
    </div>
</template>

<script setup lang="jsx">
import { ElTable, ElPagination, ElTableColumn, ElPopover, ElCheckboxGroup, ElCheckbox, ElIcon } from "element-plus"
import { Setting, Refresh } from "@element-plus/icons-vue"
import { computed, h, onMounted, reactive, ref, useAttrs, useSlots, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const outerSlots = useSlots()

const props = defineProps({
    getTableFunction: {
        type: Function,
        required: true
    },
    columns: {
        type: Array,
        default: () => []
    },
    isShowPagination: {
        type: Boolean,
        default: true
    },
    paginationOptions: {
        type: Object,
        default: () => ({
            pageNum: 1,
            pageSize: 10,
            total: 0
        })
    },
    pageSizesOption: {
        type: Array,
        default: [10, 20, 50, 100]
    },
    // 序号宽度
    noWidth: {
        type: Number,
        required: false
    },
    // 是否显示多选框
    showCheckbox: {
        type: Boolean,
        default: false
    },
    // 是否开启缓存
    isCache: {
        type: Boolean,
        default: false
    },
    // 缓存 Key
    cacheKey: {
        type: String,
        default: ""
    },
    // 是否显示列设置
    showSetting: {
        type: Boolean,
        default: false
    }
})


const tableAttrs = computed(() => attrs)

// 需要从列配置中剔除的自定义字段，避免透传给 el-table-column 产生警告
const STRIP_KEYS = ['render', 'isSlot', 'children']

const makeColProps = (col) => {
    const result = { ...col }
    STRIP_KEYS.forEach(k => delete result[k])
    return result
}

const TableColumn = (colProps) => {
    const col = colProps.column

    // 分组列：递归渲染子列
    if (col.children?.length) {
        return h(ElTableColumn, { label: col.label, ...makeColProps(col) }, {
            default: () => col.children.map((child, idx) =>
                h(TableColumn, { key: child.prop || child.label || idx, column: child })
            )
        })
    }

    const colSlots = {}
    if (col.render) {
        colSlots.default = (scope) => col.render(scope.row)
    } else if (col.isSlot) {
        colSlots.default = (scope) => outerSlots[col.prop]?.({ data: scope.row })
    }

    // 处理表头设置图标注入
    if (props.showSetting && isSettingColumn(col)) {
        colSlots.header = (scope) => (
            <div
                class={['flex align-center pointer header-setting-wrap',
                    col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'justify-center' : '']}
            >
                <span>{scope.column.label}</span>
                <ElPopover placement="bottom-end" width={200} trigger="click" popper-class="yo-table-setting-popover" persistent={false}>
                    {{
                        reference: () => (
                            <ElIcon class="setting-icon cursor-pointer" size={16} onClick={(e) => e.stopPropagation()}>
                                <Setting />
                            </ElIcon>
                        ),
                        default: () => (
                            <div class="setting-content">
                                <div class="flex align-center setting-title">
                                    <span style="font-weight: bold;">选择列中要展示的信息</span>
                                    <ElIcon class="pointer cursor-pointer" style="margin-left: 8px;" onClick={resetColumns} title="重置列">
                                        <Refresh />
                                    </ElIcon>
                                </div>
                                <div class="setting-list">
                                    <ElCheckboxGroup v-model={visibleKeys.value}>
                                        {props.columns.map(item => (
                                            <div key={item.prop || item.label} class="setting-item">
                                                <ElCheckbox label={item.prop || item.label} disabled={isSettingColumn(item)}>
                                                    {item.label}
                                                </ElCheckbox>
                                            </div>
                                        ))}
                                    </ElCheckboxGroup>
                                </div>
                            </div>
                        )
                    }}
                </ElPopover>
            </div>
        )
    }

    return h(ElTableColumn, makeColProps(col), colSlots)
}

/**
 * 判断是否为需要放置设置图标的列 (通常是操作列或最后一列)
 */
const isSettingColumn = (col) => {
    if (!col) return false
    const label = (col.label || '').trim()
    return col.fixed === 'right' || label === '操作' || col.prop === 'op' || col.showSetting === true
}

/**
 * 列显示/隐藏逻辑封装
 */
function useTableColumns(props) {
    // 所有的 id 列表 (使用 prop 或 label 作为唯一标识)
    const allKeys = props.columns.map(c => c.prop || c.label).filter(Boolean)

    // 默认可见性 (全选)
    const visibleKeys = ref([...allKeys])

    // 如果指定了 cacheKey，则启用持久化
    if (props.cacheKey && props.isCache) {
        const columnCache = useLocalStorage(props.cacheKey + '_columns', [...allKeys])
        visibleKeys.value = columnCache.value
        watch(visibleKeys, (newVal) => {
            columnCache.value = newVal
        }, { deep: true })
    }

    // 计算实际显示的列
    const visibleColumns = computed(() => {
        const keySet = new Set(visibleKeys.value)
        return props.columns.filter(col => {
            // 设置列始终强制显示
            if (isSettingColumn(col)) return true
            return keySet.has(col.prop || col.label)
        })
    })

    const resetColumns = () => {
        visibleKeys.value = [...allKeys]
    }

    return {
        visibleKeys,
        visibleColumns,
        resetColumns
    }
}

const { visibleKeys, visibleColumns, resetColumns } = useTableColumns(props)

TableColumn.props = ['column']

const tableData = ref([])
const loading = ref(false)

let pagination = reactive({});
let paginSize = reactive([])


const getTableData = async () => {
    let res = null;
    if (props.isShowPagination) {
        res = await props.getTableFunction({
            PageIndex: pagination.pageNum,
            PageSize: pagination.pageSize
        })
    } else {
        res = await props.getTableFunction()
    }
    return res;
}

const setTableData = (res) => {
    if (Array.isArray(res)) {
        tableData.value = res
        pagination.total = res.length
    } else if (res.Data) {
        tableData.value = res.Data.Items ?? []
        pagination.total = res.Data.TotalCount ?? 0
    } else {
        tableData.value = res.list ?? []
        pagination.total = res.total ?? 0
    }
}

const loadData = async () => {
    if (!props.getTableFunction) return
    try {
        loading.value = true
        const res = await getTableData();
        setTableData(res);
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const handlePageChange = (page) => {
    pagination.pageNum = page
    loadData()
}

const handleSizeChange = (size) => {
    pagination.pageSize = size
    pagination.pageNum = 1
    loadData()
}

const reload = () => {
    pagination.pageNum = 1
    pagination.pageSize = props.paginationOptions.pageSize;
    loadData()
}

const megePagination = () => {
    if (props.isShowPagination) {
        pagination = props.paginationOptions
        paginSize = props.pageSizesOption
    }
}

onMounted(() => {
    megePagination();
    loadData()
})

const tableRef = ref(null)

defineExpose({
    reload,
    loadData,
    getSelection: () => tableRef.value?.getSelectionRows() ?? []
})
</script>

<style lang="scss">
.yo-table-wrap {
    width: 100%;
}

.yo-table-pagination {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
}

.header-setting-wrap {
    width: 100%;
    color: #333;

    .setting-icon {
        color: #9A9A9A;
        transition: color 0.3s;
        margin-left: 15px;
        display: block;

        &:hover {
            color: var(--primary-color) !important;
        }
    }
}
</style>

<style lang="scss">
.yo-table-setting-popover {
    padding: 12px 0 !important;

    .setting-content {
        .setting-title {
            padding: 0 16px 8px 16px;
            border-bottom: 1px solid #ebeef5;
            margin-bottom: 8px;
        }

        .setting-list {
            max-height: 250px;
            overflow-y: auto;
            padding: 0 16px;

            .setting-item {
                padding: 4px 0;
            }
        }
    }
}
</style>