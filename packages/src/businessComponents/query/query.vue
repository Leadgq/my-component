<template>
    <div class="yo-query" :style="gridStyle">
        <YoTitle :content="title" class="title"></YoTitle>
        <div class="flex search flex-end" :class="{ isActive: isShowSuperSearchArea }">
            <YoSearch v-model="model[quickSearchKey]" :width="'386px'" placeholder="快速搜索" v-if="!isShowSuperSearchArea"
                @search="quickSearch"></YoSearch>
            <YoSearch :isSearchModel="false" :direction="isShowSuperSearchArea ? 'up' : 'down'" :button-type="'default'"
                class="super-search" @advancedSearch="advancedSearch">
                {{ isShowSuperSearchArea ? '收起' : '高级搜索' }}
            </YoSearch>

            <!-- 字段设置 (仅在高级搜索模式下显示) -->
            <el-popover placement="bottom-end" :width="200" trigger="click" popper-class="yo-table-setting-popover"
                v-if="showSetting && isShowSuperSearchArea" :persistent="false">
                <template #reference>
                    <el-icon class="setting-icon cursor-pointer">
                        <Menu />
                    </el-icon>
                </template>
                <div class="setting-content">
                    <div class="flex align-center setting-title">
                        <span style="font-weight: bold;">选择想要展示的筛选信息</span>
                        <el-icon class="pointer cursor-pointer" style="margin-left: 8px;" @click="resetFields"
                            title="重置">
                            <Refresh />
                        </el-icon>
                    </div>
                    <div class="setting-list">
                        <el-checkbox-group v-model="visibleKeys">
                            <div v-for="item in config" :key="item.prop" class="setting-item">
                                <el-checkbox :label="item.prop">
                                    {{ item.label }}
                                </el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                </div>
            </el-popover>
        </div>
        <el-form v-bind="formAttrs" :model="model" class="yo-query-form" v-if="isShowSuperSearchArea">
            <template v-for="item in visibleConfig" :key="item.prop">
                <el-form-item v-bind="item.formItemProps || {}" :label="item.label" :prop="item.prop"
                    :style="{ gridColumn: `span ${item.span || 1}` }" class="flex align-center ">
                    <!-- 1. 插槽支持 (最高优先级) -->
                    <slot v-if="item.isSlot" :name="item.prop" :item="item" :model="model"></slot>
                    <!-- 2.嵌套渲染 -->
                    <div v-else-if="item.children" class="yo-query-composite">
                        <template v-for="child in item.children" :key="child.prop">
                            <!-- 在嵌套模型下使用自定义 -->
                            <slot v-if="child.isSlot" :name="child.prop" :item="child" :model="model"></slot>
                            <!-- 在嵌套模型下使用自定义 -->
                            <RenderCell v-else-if="child.render" :render="child.render" :model="model" :item="child"
                                :style="[child.style || { flex: 1 }, child.props?.width ? { width: child.props.width, flex: 'none' } : {}]" />
                            <!-- 在嵌套模型下使用组件 -->
                            <FieldItem v-else :model="model" :item="child" />
                        </template>
                    </div>
                    <!-- render模式 -->
                    <RenderCell v-else-if="item.render" :render="item.render" :model="model" :item="item" />
                    <!-- 其他模式 -->
                    <FieldItem v-else :model="model" :item="item" />
                </el-form-item>
            </template>
        </el-form>

        <!-- 确认和重置 -->
        <div class="flex align-center justify-center footer flex-end" v-if="isShowSuperSearchArea">
            <yo-button type="primary" @click="reload">重置</yo-button>
            <yo-button type="default" @click="search">搜索</yo-button>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { computed, useAttrs, cloneVNode, ref, watch, onMounted } from 'vue'
import {
    ElForm,
    ElFormItem,
    ElOption,
    ElSelect,
    ElDatePicker,
    ElInputNumber,
    ElSwitch,
} from 'element-plus'
import { YoTitle } from '../title'
import { YoInput, YoSearch, YoButton } from '../../components'
import { Menu, Refresh } from "@element-plus/icons-vue"
import { useLocalStorage, useCloned } from '@vueuse/core'

const props = defineProps({
    isCache: {
        type: Boolean,
        default: false
    },
    cacheKey: {
        type: String,
        default: '',
        required: false
    },
    quickSearchKey: {
        type: String,
        default: 'name'
    },
    title: {
        type: String,
        default: ''
    },
    config: {
        type: Array,
        required: true,
        default: () => []
    },
    model: {
        type: Object,
        required: true
    },
    cols: {
        type: Number,
        default: 3
    },
    labelWidth: {
        type: [String, Number],
        default: 'auto'
    },
    labelGap: {
        type: [String, Number],
        default: '12px'
    },
    xGap: {
        type: [String, Number],
        default: '41px'
    },
    yGap: {
        type: [String, Number],
        default: '30px'
    },
    // 是否显示字段配置设置
    showSetting: {
        type: Boolean,
        default: false
    }
})

const isShowSuperSearchArea = defineModel('isShowSuperSearchArea', { default: false })

// 这里都是缓存相关
function useQueryCache(props, model, isShowSuperSearchArea) {
    // 1. 计算不需要缓存的字段
    const ignoredKeys = computed(() => {
        const keys = new Set()
        const traverse = (items) => {
            items.forEach(item => {
                if (item.isCache === false) keys.add(item.prop)
                if (item.children) traverse(item.children)
            })
        }
        traverse(props.config)
        return keys
    })

    // 2. 初始值快照 (用于重置)
    const clonedValue = ref(null)
    if (props.cacheKey && props.isCache) {
        const { cloned } = useCloned(model)
        clonedValue.value = cloned.value
    }

    // 3. 展开状态持久化
    if (props.cacheKey && props.isCache) {
        const expandCache = useLocalStorage(props.cacheKey + '_expand', isShowSuperSearchArea.value)
        isShowSuperSearchArea.value = expandCache.value
        watch(isShowSuperSearchArea, (val) => {
            expandCache.value = val
        })
    }

    // 4. 数据缓存持久化
    const cache = (props.cacheKey && props.isCache) ? useLocalStorage(props.cacheKey, model) : null

    // 5. 初始化恢复
    if (cache?.value && props.isCache) {
        const filteredCache = { ...cache.value }
        ignoredKeys.value.forEach(key => delete filteredCache[key])
        Object.assign(model, filteredCache)
    }

    // 保存缓存
    const saveCache = (currentModel) => {
        if (!cache) return
        const savedModel = { ...currentModel }
        ignoredKeys.value.forEach(key => delete savedModel[key])
        cache.value = savedModel
    }

    const addQuickSearchToCache = () => {
        if (cache) {
            cache.value[props.quickSearchKey] = props.model[props.quickSearchKey]
        }
    }

    const resetCache = () => {
        if (clonedValue.value) {
            Object.assign(model, clonedValue.value)
        }
        if (cache) cache.value = null
    }

    // 删除对应key的缓存
    const deleteCacheByKey = (key) => {
        if (cache) {
            delete cache.value[key]
        }
    }

    return {
        saveCache,
        resetCache,
        deleteCacheByKey,
        addQuickSearchToCache
    }
}

const { saveCache, resetCache, deleteCacheByKey, addQuickSearchToCache } = useQueryCache(props, props.model, isShowSuperSearchArea)

/**
 * 封装查询组件字段展示逻辑
 */
function useQueryFields(props) {
    const allKeys = props.config.map(item => item.prop).filter(Boolean)
    const visibleKeys = ref([...allKeys])

    if (props.cacheKey && props.isCache) {
        const fieldCache = useLocalStorage(props.cacheKey + '_query_fields', [...allKeys])
        visibleKeys.value = fieldCache.value
        watch(visibleKeys, (newVal) => {
            fieldCache.value = newVal
        }, { deep: true })
    }

    const visibleConfig = computed(() => {
        const keySet = new Set(visibleKeys.value)
        return props.config.filter(item => !item.prop || keySet.has(item.prop))
    })

    const resetFields = () => {
        visibleKeys.value = [...allKeys]
    }

    return {
        visibleKeys,
        visibleConfig,
        resetFields
    }
}

const { visibleKeys, visibleConfig, resetFields } = useQueryFields(props)

const getFilteredModel = () => {
    const filteredModel = {}
    if (isShowSuperSearchArea.value) {
        // 高级搜索模式：仅发送可见的配置字段，并排除快速搜索字段
        const keySet = new Set(visibleKeys.value)
        Object.keys(props.model).forEach(key => {
            if (keySet.has(key) && key !== props.quickSearchKey) {
                filteredModel[key] = props.model[key]
            }
        })
    } else {
        // 快速搜索模式：仅发送快速搜索字段
        filteredModel[props.quickSearchKey] = props.model[props.quickSearchKey]
    }
    return filteredModel
}

const advancedSearch = () => {
    props.model[props.quickSearchKey] = ''
    //点击高级搜索删除快速搜索的缓存
    deleteCacheByKey(props.quickSearchKey)
    isShowSuperSearchArea.value = !isShowSuperSearchArea.value
}

const gridStyle = computed(() => ({
    '--query-cols': props.cols,
    '--query-label-gap': typeof props.labelGap === 'number' ? `${props.labelGap}px` : props.labelGap,
    '--query-x-gap': typeof props.xGap === 'number' ? `${props.xGap}px` : props.xGap,
    '--query-y-gap': typeof props.yGap === 'number' ? `${props.yGap}px` : props.yGap,
}))

// 内部渲染函数组件
const RenderCell = (props, { attrs }) => {
    const vnode = props.render(props.model, props.item)
    if (vnode && (attrs.style || attrs.class)) {
        return cloneVNode(vnode, {
            style: attrs.style,
            class: attrs.class
        }, true)
    }
    return vnode
}


const FieldItem = (props) => {
    const { model, item } = props;
    const Comp = getComponent(item.type);
    const placeholder = item.placeholder || (item.type === 'select' ? '请选择' : '请输入');
    const style = Object.assign(
        {},
        item.style || { flex: 1, width: '100%' },
        item.props?.width ? { width: item.props.width, flex: 'none' } : {}
    );

    const events = item.events || {};

    return (
        <Comp
            modelValue={model[item.prop]}
            onUpdate:modelValue={(val) => (model[item.prop] = val)}
            placeholder={placeholder}
            clearable={true}
            style={style}
            {...item.props}
            {...events}
        >
            {item.type === 'select' && item.options && (
                <>
                    {item.options.map(opt => (
                        <ElOption
                            key={opt[item.valueKey || 'value']}
                            label={opt[item.labelKey || 'label']}
                            value={opt[item.valueKey || 'value']}
                        />
                    ))}
                </>
            )}
        </Comp>
    );
};
const attrs = useAttrs()
const formAttrs = computed(() => ({
    labelWidth: props.labelWidth,
    ...attrs
}))


const componentMap = {
    input: YoInput,
    select: ElSelect,
    date: ElDatePicker,
    number: ElInputNumber,
    switch: ElSwitch
}

const getComponent = (type) => {
    return componentMap[type] || componentMap.input
}

const emit = defineEmits(['change', 'reload', 'search', 'quickSearch'])
function search() {
    saveCache(props.model)
    emit('search', getFilteredModel())
}
function reload() {
    resetCache()
    emit('reload', props.model)
}
function quickSearch() {
    const val = props.model[props.quickSearchKey]
    const filteredModel = { [props.quickSearchKey]: val }
    addQuickSearchToCache()
    emit('quickSearch', filteredModel)
}

onMounted(() => {
    // 初始化时通知外部当前生效的过滤参数
    emit('search', getFilteredModel())
})

watch(isShowSuperSearchArea, () => {
 emit('search', getFilteredModel())  
})

// 组件提供移除特定key的方法
defineExpose({
    deleteCacheByKey
})
</script>

<style scoped lang="scss">
$space: 20px;

.yo-query {
    background-color: #fff;
    margin-bottom: 16px;
    box-sizing: border-box;
    padding: 14px 26px 31px 20px;

    .title {
        margin-bottom: $space;
    }

    .search {

        &.isActive {
            margin-bottom: 24px;
        }
    }

    .super-search {
        margin-left: $space;
    }

    .setting-icon {
        margin-left: 15px;
        color: #9a9a9a;
        font-size: 26px;
        display: block;

        &:hover {
            color: var(--primary-color);
        }
    }

    .footer {
        margin-top: $space;
    }
}

.yo-query-form {
    display: grid;
    grid-template-columns: repeat(var(--query-cols), 1fr);
    gap: var(--query-y-gap) var(--query-x-gap);
    padding-left: 11px;
    padding-right: 11px;
    box-sizing: border-box;
}

.yo-query-composite {
    display: flex;
    gap: 8px;
    width: 100%;
}

:deep(.el-form-item) {
    margin-bottom: 0px !important;
    margin-right: 0px !important;

    .el-form-item__label {
        padding-right: var(--query-label-gap) !important;
        color: #6a7998;
    }

    .el-form-item__label-wrap {
        margin-left: 0 !important;
    }
}

:deep(.el-form-item__content) {
    display: flex;
    align-items: center;
}
</style>
