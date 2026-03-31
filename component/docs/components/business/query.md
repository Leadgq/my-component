# Query 搜索组件

业务搜索表单组件，基于 `el-form` 封装。支持栅格布局、多种预置表单类型、自定义渲染（render/JSX）、插槽扩展以及复合字段。

<script setup>
import { ref, reactive, h, onMounted } from 'vue'
import { YoQuery, YoTitle } from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'
import { ElTag, ElRate, ElInput, ElTreeSelect } from 'element-plus'
import { withBase } from 'vitepress'

// --- 基础用法 ---
const basicModel = reactive({
    name: '',
    type: ''
})
const basicConfig = [
    { type: 'input', label: '名称', prop: 'name', placeholder: '请输入名称' },
    {
        type: 'select',
        label: '类型',
        prop: 'type',
        options: [
            { label: '类型A', value: 'A' },
            { label: '类型B', value: 'B' }
        ]
    }
]

// --- Render 模式 ---
const renderModel = reactive({
    custom: '初始值'
})
const renderConfig = [
    {
        label: '自定义渲染',
        prop: 'custom',
        span: 3,
        render: (model) => h('div', { style: 'display:flex; gap:8px; align-items:center' }, [
            h(ElTag, { type: 'success' }, () => 'Render'),
            h(ElInput, {
                modelValue: model.custom,
                'onUpdate:modelValue': (val) => model.custom = val,
                placeholder: 'h 函数渲染'
            })
        ])
    }
]

// --- 插槽模式 ---
const slotModel = reactive({
    slotField: 0
})
const slotConfig = [
    { label: '插槽字段', prop: 'slotField', isSlot: true }
]

// --- 复合字段 ---
const compositeModel = reactive({
    t1: '',
    t2: '',
    t3: ''
})
const compositeConfig = [
    {
        label: '组合查询',
        prop: 'group',
        span: 3,
        children: [
            { type: 'select', prop: 't1', placeholder: '省', options: [{ label: '浙江', value: 'zj' }], style: { width: '120px' } },
            { type: 'select', prop: 't2', placeholder: '市', options: [{ label: '杭州', value: 'hz' }], style: { width: '120px' } },
            { type: 'input', prop: 't3', placeholder: '详细地址', style: { flex: 1 } }
        ]
    }
]

// --- 异步树状结构 ---
const treeModel = reactive({
    deptId: null
})
const treeOptions = ref([])
const treeConfig = [
    {
        label: '部门',
        prop: 'deptId',
        render: (model) => h(ElTreeSelect, {
            modelValue: model.deptId,
            'onUpdate:modelValue': (val) => model.deptId = val,
            data: treeOptions.value,
            placeholder: treeOptions.value.length ? '请选择部门' : '加载中...',
            checkStrictly: true,
            style: { width: '100%' }
        })
    }
]

onMounted(() => {
    setTimeout(() => {
        treeOptions.value = [
            {
                label: '总公司',
                value: '1',
                children: [
                    { label: '开发部', value: '1-1' },
                    { label: '市场部', value: '1-2' }
                ]
            }
        ]
    }, 2000)
})
</script>

<style>
.demo-block {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 24px;
}
.demo-data {
    margin-top: 16px;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
}
</style>

## 基础用法

通过 `config` 配置表单项，通过 `model` 绑定数据。默认采用栅格布局（默认 3 列）。

<div class="demo-block">
    <YoQuery :config="basicConfig" :model="basicModel" title="基础查询" />
    <div class="demo-data">Model: {{ basicModel }}</div>
</div>

```vue
<template>
  <YoQuery title="基础查询" :config="config" :model="form" />
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({ name: '', type: '' })
const config = [
  { type: 'input', label: '名称', prop: 'name' },
  { 
    type: 'select', 
    label: '类型', 
    prop: 'type', 
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' }
    ] 
  }
]
</script>
```

## 自定义渲染 (Render/JSX)

通过 `render` 函数可以完全控制表单项的渲染逻辑。支持 `h` 函数或 `JSX`（需环境支持）。

<div class="demo-block">
    <YoQuery :config="renderConfig" :model="renderModel" title="渲染函数" />
    <div class="demo-data">Model: {{ renderModel }}</div>
</div>

```vue
<script setup lang="jsx">
const config = [
  {
    label: '自定义',
    prop: 'custom',
    render: (model) => (
      <div style="display:flex; gap:8px;">
        <el-tag>JSX</el-tag>
        <el-input v-model={model.custom} />
      </div>
    )
  }
]
</script>
```

## 使用插槽 (Slot)

当 `isSlot` 为 `true` 时，可以使用与 `prop` 同名的插槽。

<div class="demo-block">
    <YoQuery :config="slotConfig" :model="slotModel" title="插槽模式">
        <template #slotField="{ model }">
            <el-rate v-model="model.slotField" />
        </template>
    </YoQuery>
    <div class="demo-data">Model: {{ slotModel }}</div>
</div>

```vue
<template>
  <YoQuery :config="config" :model="form">
    <template #slotField="{ model }">
      <el-rate v-model="model.slotField" />
    </template>
  </YoQuery>
</template>

<script setup>
const config = [{ label: '评分', prop: 'slotField', isSlot: true }]
</script>
```

## 复合字段 (Children)

通过 `children` 可以在一个表单项内部并列放置多个组件，常用于地址选择、范围输入等场景。

<div class="demo-block">
    <YoQuery :config="compositeConfig" :model="compositeModel" title="复合模式" />
    <div class="demo-data">Model: {{ compositeModel }}</div>
</div>

```vue
<script setup>
const config = [
  {
    label: '组合内容',
    span: 1,
    children: [
      { type: 'select', prop: 't1', placeholder: '省', options: [{ label: '浙江', value: 'zj' }],
        props: {
          width: '100px'
        }
      },
      { type: 'select', prop: 't2', placeholder: '市', options: [{ label: '杭州', value: 'hz' }],
        props: {
          width: '100px'
        } },
      { type: 'input', prop: 't3', placeholder: '详细地址' ,
        props: {
         width: '100px'
        }
      }
    ]
  }
]
</script>
```

## 异步树状结构 (Render)

通过 `render` 函数结合 `el-tree-select` 实现异步加载的树状选择。

<div class="demo-block">
    <YoQuery :config="treeConfig" :model="treeModel" title="异步树测试" />
    <div class="demo-data">Model: {{ treeModel }}</div>
</div>

```vue
<script setup lang="jsx">
import { ref, onMounted } from 'vue'

const treeOptions = ref([])
onMounted(() => {
  // 模拟异步请求
  setTimeout(() => {
    treeOptions.value = [
      { label: '总公司', value: '1', children: [...] }
    ]
  }, 2000)
})

const config = [
  {
    label: '部门',
    prop: 'deptId',
    render: (model) => (
      <el-tree-select
        v-model={model.deptId}
        data={treeOptions.value}
        check-strictly
        placeholder="请选择"
      />
    )
  }
]
</script>
```

<a :href="withBase('/query.png')" target="_blank">
  <img :src="withBase('/query.png')" alt="多级表头示例" style="cursor:zoom-in;" />
</a>

```vue
<template>
    <div style="padding: 20px;">
        <YoTitle content="YoQuery 搜索组件测试" />

        <YoQuery :config="queryConfig" :model="searchForm" :cols="3" :title="'申请信息'" label-width="200px"
            label-gap="30px">

            <!-- 自定义插槽测试 -->
            <template #customField="{ model }">
                <el-tag type="warning">这是插槽内容</el-tag>
                <el-input v-model="model.customField" placeholder="插槽内的输入框" style="width: 150px; margin-left: 8px;" />
            </template>

        </YoQuery>

        <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 4px;">
            <h4>当前表单数据：</h4>
            <pre>{{ searchForm }}</pre>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { h, ref, reactive, onMounted } from 'vue'
import { YoQuery, YoTitle } from '../../../packages/src/businessComponents'
import { ElTag, ElInput, ElSelect, ElOption } from 'element-plus'
import { YoInput } from '../../../packages/src/components/input'

const searchForm = reactive({
    keyword: '',
    status: '',
    dateRange: [],
    customField: '这是插槽的默认内容',
    customRender: '',
    asyncValue: '',
    key: false,
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    deptId: null
})

const asyncOptions = ref([])
const treeOptions = ref([])

const simulateFetch = () => {
    // 模拟网络请求
    setTimeout(() => {
        asyncOptions.value = [
            { label: '服务A (异步)', value: 'a' },
            { label: '服务B (异步)', value: 'b' },
            { label: '服务C (异步)', value: 'c' }
        ]
        console.log('异步数据加载完成')
    }, 1500)

    // 模拟异步部门树数据
    setTimeout(() => {
        treeOptions.value = [
            {
                label: '总公司',
                value: '1',
                children: [
                    { label: '技术部', value: '1-1' },
                    { label: '人事部', value: '1-2' }
                ]
            }
        ]
        console.log('部门树加载完成')
    }, 2000)
}

onMounted(() => {
    simulateFetch()
})


const queryConfig = ref([
    {
        type: 'input',
        label: '代理人姓名',
        prop: 'keyword',
        placeholder: '请输入代理人姓名',
        props: { size: "default" }
    },
    {
        type: 'switch',
        label: '开关',
        prop: 'key',
    },
    {
        type: 'select',
        label: '证件类型',
        prop: 'status',
        options: [
            { label: '全部', value: '' },
            { label: '身份证', value: 'id' },
            { label: '护照', value: 'passport' }
        ]
    },
    {
        type: 'input',
        label: '证件号码',
        prop: 'idCard',
        placeholder: '请输入证件号码',
        props: {
            type: "number",
            disabled: true,
        }
    },
    {
        type: 'select',
        label: '性别',
        prop: 'gender',
        options: [
            { label: '男', values: 'male' },
            { label: '女', values: 'female' }
        ],
        valueKey: 'values'
    },
    {
        type: 'input',
        label: '手机号',
        prop: 'phone',
        placeholder: '请输入手机号'
    },
    {
        type: 'input',
        label: '邮箱',
        prop: 'email',
        placeholder: '请输入邮箱'
    },
    {
        type: 'date',
        label: '日期范围',
        prop: 'dateRange',
        props: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
        }
    },
    {
        label: '标的类型',
        prop: 'targetType',
        span: 2,
        children: [
            {
                type: 'select',
                prop: 't1',
                placeholder: '请选择省',
                options: [{ label: '浙江省', value: '1' }],
                style: {
                    width: '150px'
                },
                props: {
                    size: "default"
                }
            },
            {
                type: 'select',
                prop: 't2',
                placeholder: '请选择市',
                options: [{ label: '杭州市', valuess: '1-1' }],
                style: {
                    width: '200px'
                },
                valueKey: 'valuess',
                props: {
                    size: "default"
                }
            },
            {
                type: 'input',
                prop: 't4',
                placeholder: '请输入详细地址',
                style: {
                    width: '200px'
                },
                props: {
                    size: "small",
                    disabled: true,
                }
            },
            {
                label: '自定义内容',
                prop: 't3',
                render: (model) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ElTag type="success">JSX</ElTag>
                        <YoInput
                            v-model={model.t3}
                            placeholder="JSX渲染的输入"
                            style={{ width: '150px' }}
                            size="default"
                        />
                    </div>
                )
            }
        ]
    },
    {
        label: '自定义插槽',
        prop: 'customField',
        isSlot: true
    },

    {
        label: '异步加载 (Render)',
        prop: 'asyncValue',
        render: (model) => {
            return (
                <ElSelect
                    v-model={model.asyncValue}
                    placeholder={asyncOptions.value.length ? '请选择' : '数据加载中...'}
                    style={{ width: '100%' }}>
                    {asyncOptions.value.map(opt => (
                        <ElOption
                            label={opt.label}
                            value={opt.value}
                            key={opt.value}
                        />
                    ))}
                </ElSelect>
            )
        }
    },
    {
        label: '部门 (Async Tree)',
        prop: 'deptId',
        render: (model) => (
            <el-tree-select
                onChange={(val) => {
                    console.log('选择值：', val)
                }}
                v-model={model.deptId}
                data={treeOptions.value}
                placeholder={treeOptions.value.length ? '请选择部门' : '树数据加载中...'}
                check-strictly
                style={{ width: '100%' }}
            />
        )
    }
])
</script>


```

---

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `cacheKey` | 搜索条件缓存 Key，开启缓存时必填 | `String` | `''` |
| `isCache` | 是否开启搜索条件缓存 | `Boolean` | `false` |
| `showSetting` | 是否显示字段展示设置图标 | `Boolean` | `false` |
| `title` | 标题文本 | `String` | `''` |
| `config` | 配置项数组 | `Array` | `[]` |
| `model` | 绑定的数据对象 | `Object` | — |
| `cols` | 布局列数（有几列） | `Number` | `3` |
| `labelWidth` | 标签宽度 | `String / Number` | `'auto'` |
| `labelGap` | 标签与组件的间距 | `String / Number` | `'12px'` |
| `xGap` | 组件之间的水平间距 | `String / Number` | `'41px'` |
| `yGap` | 组件之间的垂直间距 | `String / Number` | `'30px'` |
| `btnPostion` | 高级搜索区域底部按钮的对齐位置：`start`/`center`/`end` | `String` | `'end'` |
| `v-model:isShowSuperSearchArea` | 是否显示高级搜索区域 | `Boolean` | `false` |
| `quickSearchKey` | 快速搜索关联的字段名 | `String` | `'name'` |

### Config 配置项 (Item)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 组件类型：`input`/`select`/`date`/`number`/`switch` | `String` | `'input'` |
| `label` | 标签文本 | `String` | — |
| `labelWidth` | 标签宽度 (覆盖全局 `labelWidth`) | `String / Number` | — |
| `space` | 标签与组件的间距 (覆盖全局 `labelGap`) | `String / Number` | — |
| `prop` | 字段名 | `String` | — |
| `placeholder` | 占位提示 | `String` | — |
| `span` | 占据的栅格列数(跨列) | `Number` | `1` |
| `props` | 透传给内部组件的属性 | `Object` | — |
| `events` | 透传给内部组件的事件 | `Object` | — |
| `options` | 下拉框/单选/多选的选项 | `Array<{label, value}>` | — |
| `labelKey` | 选项 label 的 key 名 | `String` | `'label'` |
| `valueKey` | 选项 value 的 key 名 | `String` | `'value'` |
| `isSlot` | 是否启用插槽模式 | `Boolean` | `false` |
| `isCache` | 该字段是否参与缓存（设为 `false` 则不记录历史值） | `Boolean` | `true` |
| `render` | 自定义渲染函数 `(model, item) => VNode` | `Function` | — |
| `children` | 嵌套组件配置（复合模式） | `Array` | — |
| `style` | 组件样式 | `Object` | — |
| `formItemProps`| 透传给 `el-form-item` 的属性 | `Object` | — |

### Slots

| `[prop]` | 对应配置项中 `prop` 命名的插槽 | `{ model, item }` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `search` | 点击高级搜索确认、或初始化/切换模式时触发，返回当前可见的过滤参数 | `(filteredModel: Object)` |
| `quickSearch` | 快速搜索输入回车或点击搜索时触发，仅返回快速搜索字段参数，同时保存这部分缓存 | `(filteredModel: Object)` |
| `reload` | 点击重置或清空搜索条件时触发，返回完整的模型数据（排除被移除的缓存） | `(model: Object)` |
| `change` | 内部搜索条件受控改变时的预留事件（部分内部组件透传触发） | — |

### Methods

通过 `ref` 访问组件实例调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `deleteCacheByKey(key)` | 删除缓存中特定字段的数据 | `key: String` |
