# Grid 复合表格组件

`YoGrid` 组件是对 `YoQuery` (搜索/过滤) 和 `YoTable` (表格) 的深度封装组合。它使得开发者可以轻易地构建出一个**带复杂搜索条件与自动分页获取数据的完整数据列表页**，并且通过内部事件通讯自动完成了两者的串联。

<script setup>
import { withBase } from 'vitepress'
import { ref, reactive } from 'vue'
import { YoGrid } from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'
import { ElTag, ElInput, ElButton } from 'element-plus'

const searchForm = reactive({
    name: '',
    status: '',
    date: ''
})

const queryConfig = [
    { type: 'input', label: '姓名', prop: 'name', placeholder: '请输入姓名' },
    {
        type: 'select',
        label: '状态',
        prop: 'status',
        options: [
            { label: '全部', value: '' },
            { label: '激活', value: 'active' },
            { label: '禁用', value: 'disabled' }
        ]
    },
    { label: '自定义插槽', prop: 'customField', isSlot: true }
]

const tableColumns = [
    { label: '姓名', prop: 'name' },
    { label: '状态', prop: 'status', isSlot: true },
    { label: '邮箱', prop: 'email' },
    {
        label: '创建时间',
        prop: 'createdAt',
        render(row) {
             return h(ElTag, { type: 'success' }, () => row.createdAt)
        }
    },
    {
        label: '操作',
        width: 150,
        fixed: 'right',
        align: 'center',
        render() {
             return h('div', { class: 'flex gap-2 justify-center' }, [
                 h(ElButton, { type: 'primary', link: true, size: 'small' }, () => '详情'),
                 h(ElButton, { type: 'danger', link: true, size: 'small' }, () => '删除')
             ])
        }
    }
]

const fetchData = async (params) => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    const { PageIndex = 1, PageSize = 10, name } = params
    const total = 45
    const items = []
    const start = (PageIndex - 1) * PageSize

    for (let i = 0; i < PageSize; i++) {
        const id = start + i + 1
        if (id > total) break
        items.push({
            id,
            name: `${name || '用户'}_${id}`,
            status: id % 2 === 0 ? 'active' : 'disabled',
            email: `user${id}@example.com`,
            createdAt: new Date().toLocaleDateString()
        })
    }

    return {
        Items: items,
        TotalCount: total
    }
}

import { h } from 'vue'
</script>

<style>
/* 修复 VitePress 默认 table 样式冲突 */
.vp-doc .demo table {
    border: none !important;
    margin: 0 !important;
    display: table !important;
    width: 100% !important;
    border-collapse: separate !important;
}
.vp-doc .demo table thead tr th,
.vp-doc .demo table tbody tr td {
    border: none !important;
    padding: 0 !important;
    text-align: unset !important;
    background: unset !important;
}

.demo {
    border-radius: 8px;
    margin-bottom: 20px;
}
</style>

## 基础用法

你需要分别对 `YoQuery` 和 `YoTable` 准备所需的属性配置，并通过组合属性传入 `YoGrid`。`YoGrid` 内部已将其 `Search/Reload` 等行为与 `Table` 的重新加载进行了联动。


> **注意事项：** 在 `YoGrid` 中，初始化的第一次数据请求是由其内部的 `YoQuery` 的 `onMounted` 钩子发出搜索事件来触发过。为了防止重复请求，`YoGrid` 内部通过 `provide/inject` 机制（`yoGridContext`）与子组件进行了「握手」，自动关闭了子组件的 `autoLoad` 行为。

<div class="demo">
    <YoGrid
        :query="{ config: queryConfig, model: searchForm,showSetting: true }"
        :table="{ columns: tableColumns, getTableFunction: fetchData, height: 400, stripe: true }"
    >
        <!-- 查询区域的自定义插槽 -->
        <template #customField="{ model }">
            <el-input v-model="model.customField" placeholder="插槽输入" />
        </template>
        <!-- 表格区域的自定义插槽 -->
        <template #status="{ data }">
            <el-tag :type="data.status === 'active' ? 'success' : 'info'">
                {{ data.status === 'active' ? '激活' : '禁用' }}
            </el-tag>
        </template>
    </YoGrid>
</div>

```vue
<template>
  <div style="padding: 20px;">
    <YoGrid
        cache-key="grid-cache"
        :is-cache="true"
        :query="{ config: queryConfig, model: searchForm, title: '用户列表', showSetting: true }"
        :table="{ columns: tableColumns, getTableFunction: fetchData, height: 400 }"
    >
        <!-- 查询插槽 -->
        <template #customField="{ model }">
            <el-input v-model="model.customField" placeholder="插槽输入" />
        </template>

        <!-- 表格插槽 -->
        <template #status="{ data }">
            <el-tag :type="data.status === 'active' ? 'success' : 'info'">
                {{ data.status === 'active' ? '激活' : '禁用' }}
            </el-tag>
        </template>
    </YoGrid>
  </div>
</template>

<script setup lang="jsx">
import { reactive } from "vue"

const searchForm = reactive({
    name: "",
    status: "",
    customField: ""
})

const queryConfig = [
    { type: "input", label: "姓名", prop: "name" },
    {
        type: "select", label: "状态", prop: "status",
        options: [
            { label: "激活", value: "active" },
            { label: "禁用", value: "disabled" }
        ]
    },
    { label: "自定义", prop: "customField", isSlot: true }
]

const tableColumns = [
    { label: "姓名", prop: "name" },
    { label: "状态", prop: "status", isSlot: true },
    {
        label: "创建时间",
        prop: "createdAt",
        render(data) {
            return <el-tag type="success">{data.createdAt}</el-tag>
        }
    }
]

const fetchData = async (params) => {
    // 请求数据，params中包含了分页与过滤字段（如：name, status）
    // 返回格式建议为 { Data: { Items: [], TotalCount: 0 } }
    const { PageIndex, PageSize } = params
    // ... 发送请求并返回数据
}
</script>
```

<a :href="withBase('/grid.png')" target="_blank">
  <img :src="withBase('/grid.png')" alt="多级表头示例" style="cursor:zoom-in;" />
</a>

<a :href="withBase('/grid-flow.png')" target="_blank">
  <img :src="withBase('/grid-flow.png')" alt="多级表头示例" style="cursor:zoom-in;" />
</a>

```vue

<template>
  <div>
    <YoGrid 
      :is-cache="true" 
      cache-key="grid-tabs-demo"
      :tabs="{
        prop: 'status',
        config: [
          { label: '待发布', value: '1' },
          { label: '编辑中', value: '2' },
          { label: '已驳回', value: '3' }
        ]
      }"
      :query="{ config: queryConfig, model: searchForm }" 
      :table="{ columns: tableColumns, api: '/api/v1/list' }"
    />
  </div>
</template>
```

---

## 标签页用法 (Tabs)

`YoGrid` 支持通过 `tabs` 属性在搜索栏下方快速集成顶层切换页。Tabs 的状态会自动与搜索参数绑定，并支持缓存、动态 API、动态列以及属性覆盖。

### 核心特性

- **数据联动**：切换 Tab 自动合并当前生效的搜索参数并执行 `table.reload()`。
- **动态列与插槽**：支持在 `tabs.config` 中为每个 Tab 指定独立的 `columns`。定义为 `isSlot: true` 的列插槽会自动从 `YoGrid` 透传。
- **属性覆盖**：支持在 Tab 配置中覆盖表格的任何属性（如 `api`, `height`, `showSetting`, `stripe` 等）。
- **状态持久化**：开启 `isCache` 后，当前选中的 Tab 会存入 `localStorage`，且不同 Tab 的列显示设置（Column Setting）会自动物理隔离缓存。

### 示例代码

```vue
<template>
  <YoGrid 
    :is-cache="true" 
    cache-key="project_grid"
    :tabs="tabsConfig"
    :query="{ config: queryConfig, model: searchForm }" 
  >
    <!-- 即便是定义在 Tab 里的列插槽，在这里正常写即可 -->
    <template #action="{ data }">
      <el-button type="primary" size="small">操作</el-button>
    </template>
  </YoGrid>
</template>

<script setup>
const tabsConfig = {
  prop: 'status', // 后端接收状态的字段名
  config: [
    { label: '全部', value: '' },
    { 
      label: '异常订单', 
      value: 'error',
      api: '/api/v1/orders/exception', // 该 Tab 专属接口
      height: 400,                     // 覆盖表格高度
      columns: [                       // 该 Tab 专属列配置
        { label: '订单号', prop: 'orderNo' },
        { label: '操作', prop: 'action', isSlot: true } // 支持插槽
      ]
    }
  ]
}
</script>
```

---

### 详细使用

```vue
<template>
    <div>
        <YoGrid :is-cache="true" cache-key="grid-test-cache" ref="gridRef"
            v-model:isShowSuperSearchArea="showSuperSearch" :query="{
                config: queryConfig,
                model: searchForm,
                quickSearchKey: 'quickSearch',
                showSetting: true,
                title: '测试机哦'
            }" :tabs="{
                prop: 'tabsStauts',
                config: [
                    {
                        showSetting: true,
                        label: '已激活',
                        value: 'active',
                        api: '/table/list1',
                        columns: tableColumns,
                        height: 400,
                        //斑马纹
                        stripe: true
                    },
                    {
                        label: '已禁用',
                        value: 'disabled',
                        api: '/table/alt-list',
                        showSetting: true,
                        columns: diasabelColumns
                    },
                    {
                        label: '高级数据', value: 'pro', api: '/table/simple-list',
                        columns: [
                            { label: '排名', prop: 'rank', width: 80 },
                            { label: '高级姓名', prop: 'names' },
                            { label: '分数', prop: 'score' },
                            { label: '金额', prop: 'amount', align: 'right' },
                        ]
                    }
                ]
            }">
            <template #action="{ data }">
                <div class="flex gap-2">
                    <el-button type="primary" size="small">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </div>
            </template>
        </YoGrid>

    </div>
</template>

<script setup lang="jsx">
import { reactive, ref, useTemplateRef, onMounted } from "vue"
import { YoGrid, YoInput, YoTag } from "yo-pc-ui"

const gridRef = useTemplateRef("gridRef")

const showSuperSearch = ref(false)
const searchForm = reactive({
    name: "",
    status: "",
    customField: "",
    date: "",
    test1: "",
    test2: "",
})

const queryConfig = [
    {
        type: "select",
        label: "api模式-name",
        prop: "name",
        api: '/api/Data/GetItems',
        keyValue: { value: 'id', label: 'text' }
    },
    {
        type: "select",
        label: "枚举-status",
        prop: "status",
        enumName: 'GetEnumItems',
        isCache: true,
        props: {
            clearable: true,
            disabled: false,
            size: "small"
        }
    },
    { label: "自定义", prop: "customField", isSlot: true },
    {
        type: "date",
        label: "日期",
        prop: "date",
        labelWidth: '100px',
        props: {
            type: 'daterange',
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期"
        }
    },
    {
        label: "测试",
        space: '30px',
        prop: "test",
        children: [
            {
                label: "测试1",
                type: 'input',
                prop: 'test1',
                props: {
                    width: '100px',
                    disabled: true,
                    placeholder: '我是占位符'
                }
            },
            {
                label: "测试2",
                type: 'input',
                prop: 'test2',
            },
        ]
    }
]

const tableColumns = [
    { type: 'expand', isSlot: true, width: 50 },
    { label: "姓名", prop: "names", },
    { label: "状态", prop: "status", isSlot: true, },
    { label: "邮箱", prop: "email", isSlot: true, align: 'center', },
    {
        label: "创建时间",
        prop: "createdAt",
        render(data) {
            return (
                <el-tag type="success">{data.createdAt}</el-tag>
            )
        }
    },
    {
        label: '财务信息',
        align: 'center',
        children: [
            {
                prop: 'dept',
                label: '所属部门',
                align: 'center',
                sortable: true, formatter: (v) => {
                    return v.status
                }
            },
            { prop: 'amount', label: '金额（元）', align: 'right' },
            { label: '备注（无prop）', width: 150, render: (row) => <span>{row.name}的备注信息</span> }
        ]
    },
    {
        label: '操作',
        width: 200,
        fixed: 'right',
        align: "center",
        render() {
            return (
                <div class="flex gap-2">
                    <el-button type="primary" size="small">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </div>
            )
        }
    }
]

const diasabelColumns = [
    { label: '姓名', prop: 'names' },
    { label: '禁用原因', prop: 'type' },
    { label: '禁用时间', prop: 'isActive' },
    {
        label: '操作',
        width: 200,
        fixed: 'right',
        align: 'center',
        prop: 'action',
        isSlot: true
    }
]

</script>

```

---

## API

由于 `YoGrid` 本质上同时支持并包裹了组件 `Query` 和 `Table`，因此它的 Props 一分为二，前缀为 `query` 的配置主要传递给 Query 子组件，前缀为 `table` 或其余表格向的则传递给 Table 子组件。

### Props (控制整体与状态)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `isCache` | 是否全局开启组件的记忆缓存功能 | `Boolean` | `false` |
| `cacheKey` | 缓存的唯一标识，开启缓存后必须提供 | `String` | `''` |
| `staticParams` | 额外的静态请求参数，每次请求都会携带 | `Object` | `{}` |

### Props (传给 Query 组件)

**`query`** 对象支持以下内部属性（直接作为对象的 `key: value` 传入）：

| 内部属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `config` | 搜索表单配置数组（参见 `YoQuery` API）| `Array` | `[]` |
| `model` | 表单绑定的数据对象 | `Object` | `{}` |
| `title` | 搜索区域左上角的标题 | `String` | `''` |
| `cols` | 搜索表单布局栅格数 | `Number` | `3` |
| `quickSearchKey` | 高级及快速搜索模式切换时关联的默认快速搜索字段 | `String` | `'name'` |
| `labelWidth` | 标签宽度 | `String`/`Number`| `'auto'` |
| `labelGap` | 标签与组件间距 | `String`/`Number`| `'12px'` |
| `xGap` | 水平间距 | `String`/`Number`| `'41px'` |
| `yGap` | 垂直间距 | `String`/`Number`| `'30px'` |
| `btnPostion` | 高级搜索区域底部按钮的对齐位置（传给 `YoQuery`） | `String` | `'end'` | `'start'` | `'center'` |
| `showSetting` | 是否开启搜索字段筛选配置齿轮（高级搜索内）| `Boolean` | `false` |

### Props (传给 Tabs 配置)

**`tabs`** 对象支持以下内部属性：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 映射到接口参数中的字段名 | `String` | — |
| `default` | 默认选中的 Tab 值 | `any` | — |
| `config` | 标签页数组配置 | `Array` | `[]` |

**`tabs.config`** 数组项支持：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 标签显示名称 | `String` | — |
| `value` | 标签对应的值 | `any` | — |
| `api` | 该 Tab 专属的请求接口（可选）| `String` | — |
| `columns` | 该 Tab 专属的列配置（可选）| `Array` | — |

*注意：高级查询模式受控切换属性保留了 Vue 特有的双向绑定：`v-model:isShowSuperSearchArea`，此属性直接挂在 `YoGrid` 上，不需要包进 `query` 对象。*

### Props (传给 Table 组件)

**`table`** 对象支持以下内部属性（直接作为对象的 `key: value` 传入）：

| 内部属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 表格列配置数组（参见 `YoTable` API）| `Array` | `[]` |
| `getTableFunction`| 获取表格数据的异步函数（与 `api` 属性二选一，推荐优先使用 `api`） | `Function` | — |
| `api` | 请求后端的接口地址，配置后自动代理发送数据请求 | `String` | — |
| `method` | 使用 `api` 请求数据时的请求方法 | `String` | `'POST'` |
| `isShowPagination`| 是否底端显示分页 | `Boolean` | `true` |
| `paginationOptions`| 默认初始分页配置 | `Object` | `{ pageNum:1, pageSize:10, total:0 }`|
| `pageSizesOption` | 切换条数拉下菜单可选项 | `Array` | `[10, 20, 50, 100]` |
| `noWidth` | 序号列固定宽度 | `Number` | — |
| `showCheckbox` | 是否显示多选 Checkbox 列 | `Boolean` | `false` |
| `checkboxWidth` | 多选 Checkbox 列的固定宽度（传给 `YoTable`） | `Number` | `50` |
| `showSetting` | 是否在表头展示列控制齿轮 | `Boolean` | `false` |
| `onSelect` | 勾选单行 Checkbox 时触发的事件 | `Function(selection, row)` | — |
| `onSelectAll`| 勾选全选 Checkbox 时触发的事件 | `Function(selection)` | — |
| `onSelectionChange`| 多选选择项发生变化时触发的事件 | `Function(selection)` | — |
| `...` | 其余 `ElTable` 原生属性/事件皆可传入（事件需加 `on` 前缀驼峰化），由于兜底透传会直接生效 | `Any` | — |

#### columns 列配置字段说明

`columns` 数组中每一项除了标准的 `ElTableColumn` 属性外，还支持以下扩展字段：

| 字段名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 列绑定的数据字段名 | `String` | — |
| `label` | 列标题文字 | `String` | — |
| `render` | 自定义单元格内容渲染函数，参数为当前行数据 `row` | `Function(row): VNode` | — |
| `renderHeader` | 自定义列**表头**内容渲染函数，参数为当前列对象 `column` | `Function(column): VNode` | — |
| `isSlot` | 是否通过具名插槽渲染单元格（插槽名即为 `prop` 值）| `Boolean` | `false` |
| `children` | 多级表头子列配置，结构与列配置相同 | `Array` | — |
| `type` | 列类型，支持 `expand`（展开行）、`index`（序号）等 | `String` | — |
| `showSetting` | 强制将此列作为「设置列」展示列控制齿轮 | `Boolean` | `false` |

> `render` 与 `renderHeader` 均使用 JSX / `h()` 函数返回内容，可以在 `<script setup lang="jsx">` 中直接写 JSX。

**renderHeader 示例** — 在列表头内嵌入筛选输入框：

```vue
<script setup lang="jsx">
import { ref } from 'vue'
import { ElInput } from 'element-plus'

const filterName = ref('')

const tableColumns = [
  {
    label: '姓名',
    prop: 'name',
    // 表头自定义：标题 + 筛选框
    renderHeader: (column) => (
      <div style="display:flex; align-items:center; gap:6px;">
        <span>{column.label}</span>
        <ElInput
          v-model={filterName.value}
          size="small"
          placeholder="筛选"
          style="width:90px;"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )
  },
  { label: '状态', prop: 'status' }
]
</script>
```

---

### Slots 插槽

由于底层透传了插槽，不管是 `isSlot` 为 true 的 Query 表单项插槽，还是 Table 数据列的自定义插槽，都可以直接在 `YoGrid` 内部采用 `<template #插槽名>` 声明：

| 插槽名 | 说明 | 作用域变量 |
| --- | --- | --- |
| `default` | **自定义内容插槽**。一旦使用默认插槽，`YoGrid` 将不再渲染内置的 `YoTable`，允许开发者完全接管结果展示区域。 | — |
| `expand` | 当列配置为 `{ type: 'expand', isSlot: true }` 时自动触发的展开行插槽 | `{ data }` |
| `[自定义 prop]` | 通过 `queryConfig` 声明或 `tableColumns` 声明得到的同名插槽 | query时：`{ model, item }`<br/>table时：`{ data }` |

### Methods

通过 `ref` 获取底层内部状态：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `reload()` | 重置页码为 1，并携带当前搜索参数重新请求数据 | — |
| `getSelection()`| 获取表格当前多选行数据数组 | — |
| `deleteCacheByKey(key)` | 删除 Query中某个字段特定的缓存记录 | `key: String` |
| `queryRef` | **YoQuery** 组件实例的引用 | — |
| `tableRef` | **YoTable** 组件实例的引用 | — |
