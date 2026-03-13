<template>
    <div class="yo-grid">
        <YoQuery ref="queryRef" v-bind="queryProps" v-model:is-show-super-search-area="isShowSuperSearchArea"
            :model="queryModel" @search="handleSearch" @reload="handleReload" @quick-search="handleQuickSearch"
            :quick-search-key="queryQuickSearchKey" :is-cache="isCache" :showSetting="queryShowSetting">
            <template v-for="(_, name) in querySlots" #[name]="slotData">
                <slot :name="name" v-bind="slotData"></slot>
            </template>
        </YoQuery>

        <YoTable ref="tableRef" v-bind="tableProps" :get-table-function="getTableFunctionWrapper"
            :showSetting="showSetting">
            <template v-for="(_, name) in tableSlots" #[name]="slotData">
                <slot :name="name" v-bind="slotData"></slot>
            </template>
        </YoTable>
    </div>
</template>

<script setup lang="jsx">
import { ref, computed, useSlots } from "vue"
import { YoQuery, YoTable } from "../index"

const props = defineProps({
    isCache: { type: Boolean, default: false },
    // Query props
    queryConfig: { type: Array, default: () => [] },
    queryModel: { type: Object, required: true },
    cacheKey: { type: String, default: "" },
    queryTitle: { type: String, default: "" },
    queryCols: { type: Number, default: 3 },
    queryQuickSearchKey: { type: String, default: "name" },
    queryLabelWidth: { type: [String, Number], default: "auto" },
    queryLabelGap: { type: [String, Number], default: "12px" },
    queryXGap: { type: [String, Number], default: "41px" },
    queryYGap: { type: [String, Number], default: "30px" },

    // Table props
    tableColumns: { type: Array, default: () => [] },
    getTableFunction: { type: Function, required: true },
    isShowPagination: { type: Boolean, default: true },
    paginationOptions: { type: Object, default: () => ({ pageNum: 1, pageSize: 10, total: 0 }) },
    pageSizesOption: { type: Array, default: [10, 20, 50, 100] },
    noWidth: { type: Number },
    showCheckbox: { type: Boolean, default: false },
    // 对表格的配置例如高度
    tableOption: { type: Object, default: () => ({}) },
    showSetting: { type: Boolean, default: false },
    queryShowSetting: { type: Boolean, default: false }
})

const queryRef = ref(null)
const tableRef = ref(null)
const slots = useSlots()

const isShowSuperSearchArea = defineModel('isShowSuperSearchArea', { default: false })

const queryProps = computed(() => ({
    config: props.queryConfig,
    cacheKey: props.cacheKey,
    title: props.queryTitle,
    cols: props.queryCols,
    labelWidth: props.queryLabelWidth,
    labelGap: props.queryLabelGap,
    xGap: props.queryXGap,
    yGap: props.queryYGap
}))

const tableProps = computed(() => ({
    columns: props.tableColumns,
    isShowPagination: props.isShowPagination,
    paginationOptions: props.paginationOptions,
    pageSizesOption: props.pageSizesOption,
    noWidth: props.noWidth,
    showCheckbox: props.showCheckbox,
    cacheKey: props.cacheKey,
    isCache: props.isCache,
    ...props.tableOption
}))


const querySlots = computed(() => {
    const queryPropKeys = new Set()
    props.queryConfig.forEach(item => {
        if (item.isSlot) queryPropKeys.add(item.prop)
        if (item.children) {
            item.children.forEach(child => {
                if (child.isSlot) queryPropKeys.add(child.prop)
            })
        }
    })
    const result = {}
    Object.keys(slots).forEach(key => {
        if (queryPropKeys.has(key)) result[key] = slots[key]
    })
    return result
})

const tableSlots = computed(() => {
    const tablePropKeys = new Set()
    props.tableColumns.forEach(item => {
        if (item.isSlot) tablePropKeys.add(item.prop)
    })
    const result = {}
    Object.keys(slots).forEach(key => {
        if (tablePropKeys.has(key)) result[key] = slots[key]
    })
    return result
})

// 当前生效的搜索参数 (用于过滤隐藏字段)
const currentSearchParams = ref({})

const getTableFunctionWrapper = (params) => {
    // 使用过滤后的参数进行请求
    return props.getTableFunction({ ...params, ...currentSearchParams.value })
}

const handleSearch = (filteredModel) => {
    currentSearchParams.value = filteredModel
    tableRef.value?.reload()
}

const handleReload = () => {
    currentSearchParams.value = {}
    tableRef.value?.reload()
}

const handleQuickSearch = (filteredModel) => {
    currentSearchParams.value = filteredModel
    tableRef.value?.reload()
}

defineExpose({
    reload: () => tableRef.value?.reload(),
    loadData: () => tableRef.value?.loadData(),
    getSelection: () => tableRef.value?.getSelection(),
    deleteCacheByKey: (key) => queryRef.value?.deleteCacheByKey(key),
    queryRef,
    tableRef
})
</script>

<style scoped>
.yo-grid {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>