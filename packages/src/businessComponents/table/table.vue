<template>
    <div class="yo-table-wrap">
        <el-table ref="tableRef" :data="tableData" v-loading="loading" v-bind="tableAttrs">
            <el-table-column v-if="showCheckbox" type="selection" width="50" />
            <el-table-column type="index" label="序号" align="center" :width="noWidth ? noWidth : '60px'" />
            <TableColumn v-for="(column, idx) in columns" :key="column.prop || column.label || idx" :column="column" />
        </el-table>
        <div class="yo-table-pagination" v-if="isShowPagination && pagination.total > 0">
            <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :page-sizes="paginSize" :total="pagination.total" layout="total, prev, pager, next, sizes, jumper"
                @current-change="handlePageChange" @size-change="handleSizeChange" />
        </div>
    </div>
</template>

<script setup>
import { ElTable, ElPagination, ElTableColumn } from "element-plus"
import { computed, h, onMounted, reactive, ref, useAttrs, useSlots } from "vue";

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

const TableColumn = (props) => {
    const col = props.column

    // 分组列：递归渲染子列
    if (col.children?.length) {
        return h(ElTableColumn, { label: col.label, ...makeColProps(col) }, {
            default: () => col.children.map((child, idx) =>
                h(TableColumn, { key: child.prop || child.label || idx, column: child })
            )
        })
    }

    // 支持 render 函数 或 外部 slot
    const colSlots = {}
    if (col.render) {
        colSlots.default = (scope) => col.render(scope.row)
    } else if (col.isSlot) {
        colSlots.default = (scope) => outerSlots[col.prop]?.({ data: scope.row })
    }

    return h(ElTableColumn, makeColProps(col), colSlots)
}

TableColumn.props = ['column']

const tableData = ref([])
const loading = ref(false)

let pagination = reactive({});
let paginSize = reactive([])

const loadData = async () => {
    if (!props.getTableFunction) return
    try {
        loading.value = true
        let res = null;
        if (props.isShowPagination) {
            res = await props.getTableFunction({
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize
            })
        } else {
            res = await props.getTableFunction()
        }
        if (Array.isArray(res)) {
            tableData.value = res
            pagination.total = res.length
        } else {
            tableData.value = res.list ?? []
            pagination.total = res.total ?? 0
        }
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