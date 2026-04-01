# Table 表格组件

封装自 `el-table` 的业务表格组件，支持**分页**、**序号列**、**多选**、**固定列**、**自定义渲染**、**插槽列**与**多级表头**

<script setup>
import { withBase } from 'vitepress'
import '../../../packages/dist/style.css'
import { ref } from 'vue'
import { ElButton } from 'element-plus'

/* ---------- 基础用法数据 ---------- */
const basicData = ref(
    Array.from({ length: 22 }, (_, i) => ({
        id: i + 1,
        name: ['张三', '李四', '王五', '赵六', '陈七'][i % 5],
        age: 20 + (i % 15),
        email: `user${i + 1}@example.com`,
    }))
)

const basicColumns = ref([
    { prop: 'id',    label: 'ID',   width: 80,  align: 'center' },
    { prop: 'name',  label: '姓名',  width: 100 },
    { prop: 'age',   label: '年龄',  width: 80,  align: 'center' },
    { prop: 'email', label: '邮箱', showOverflowTooltip: true },
])

const basicGetFn = ({ PageIndex = 1, PageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = basicData.value.length
        const list  = basicData.value.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
        resolve({ Items: list, TotalCount: total })
    }, 300))

/* ---------- render / slot 数据 ---------- */
const renderData = ref(
    Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: ['张三', '李四', '王五'][i % 3],
        status: ['启用', '禁用', '待审核'][i % 3],
    }))
)

const renderColumns = ref([
    { prop: 'id',   label: 'ID',   width: 80, align: 'center' },
    { prop: 'name', label: '姓名', width: 120 },
    {
        prop: 'status',
        label: '状态',
        width: 100,
        align: 'center',
        render(row) {
            const colorMap = { '启用': '#42ba5b', '禁用': '#e85050', '待审核': '#ed892f' }
            return h('span', { style: { color: colorMap[row.status], fontWeight: 600 } }, row.status)
        }
    },
])

const renderGetFn = ({ PageIndex = 1, PageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = renderData.value.length
        const list  = renderData.value.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
        resolve({ Items: list, TotalCount: total })
    }, 300))

/* ---------- 多级表头数据 ---------- */
const multiData = ref(
    Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: ['张三', '李四', '王五'][i % 3],
        email: `user${i + 1}@example.com`,
        phone: `1380013${String(i).padStart(4,'0')}`,
        dept:  ['技术部','产品部','市场部'][i % 3],
        amount: (Math.random() * 9999).toFixed(2),
    }))
)

const multiColumns = ref([
    { prop: 'id',   label: 'ID',   width: 70, align: 'center' },
    { prop: 'name', label: '姓名', width: 100 },
    {
        label: '联系方式',
        children: [
            { prop: 'email', label: '邮箱', width: 220, showOverflowTooltip: true },
            { prop: 'phone', label: '手机号', width: 150 },
        ]
    },
    {
        label: '财务信息',
        children: [
            { prop: 'dept',   label: '部门',     width: 100 },
            { prop: 'amount', label: '金额（元）', width: 120, align: 'right' },
        ]
    },
])

const multiGetFn = ({ PageIndex = 1, PageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = multiData.value.length
        const list  = multiData.value.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
        resolve({ Items: list, TotalCount: total })
    }, 300))

/* ---------- 多选 ---------- */
const selData = ref(
    Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: ['张三', '李四', '王五', '赵六'][i % 4],
        dept: ['技术部', '产品部'][i % 2],
    }))
)
const selColumns = ref([
    { prop: 'id',   label: 'ID',   width: 80, align: 'center' },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'dept', label: '部门' },
])
const selGetFn = ({ PageIndex = 1, PageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = selData.value.length
        const list  = selData.value.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
        resolve({ Items: list, TotalCount: total })
    }, 300))
const selTableRef = ref(null)
const onGetSelection = () => {
    const rows = selTableRef.value?.getSelection() ?? []
    alert(`已选 ${rows.length} 行：${rows.map(r => r.name).join('、')}`)
}

import { h } from 'vue'
</script>

<style>
/* 修复 VitePress 默认 table 样式渗透进 el-table 内部 table 标签的问题 */
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
    overflow-x: auto;
}
</style>

## 基本用法

传入 `api` 与 `columns` 即可渲染带自动分页请求的表格。组件会自动将分页信息（`PageIndex`, `PageSize`）附加到请求参数中并行请求。

<div class="demo">
    <YoTable :tableData="basicData.slice(0, 10)" :columns="basicColumns" :isShowPagination="false" />
</div>

```vue
<template>
  <!-- 直接配置接口路径和请求方法，组件会自动获取数据并合并分页参数 -->
  <YoTable api="/api/user/list" method="POST" :columns="columns" />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
    { prop: 'id',    label: 'ID',   width: 80,  align: 'center' },
    { prop: 'name',  label: '姓名',  width: 100 },
    { prop: 'email', label: '邮箱', showOverflowTooltip: true },
])
</script>
```

## 自定义渲染（render）

在 `columns` 配置项中加入 `render(row)` 函数，即可完全自定义该列的单元格内容，参数为当前行数据。

<div class="demo">
    <YoTable :tableData="renderData" :columns="renderColumns" :isShowPagination="false" />
</div>

```vue
<script setup lang="jsx">
const columns = ref([
    { prop: 'name', label: '姓名' },
    {
        prop: 'status',
        label: '状态',
        render(row) {
            const colorMap = { '启用': '#42ba5b', '禁用': '#e85050', '待审核': '#ed892f' }
            // 可使用 JSX 或 h()
            return <span style={{ color: colorMap[row.status] }}>{row.status}</span>
        }
    },
])
</script>
```

## 使用插槽（isSlot）

将 `isSlot: true` 加入列配置，然后在 `<YoTable>` 中用 `<template #[propName]>` 提供插槽内容，作用域变量为 `{ data }`（当前行）。

```vue
<template>
  <YoTable api="/api/user/list" :columns="columns">
    <!-- 插槽名即列的 prop 值 -->
    <template #name="{ data }">
      <el-input v-model="data.name" />
    </template>
  </YoTable>
</template>

<script setup>
const columns = ref([
    { prop: 'id',   label: 'ID' },
    { prop: 'name', label: '姓名', isSlot: true },   // 启用插槽
])
</script>
```

## 多级表头

在 `columns` 中为列配置 `children` 数组即可生成分组表头（支持任意深度嵌套）。分组列无需配置 `prop`，叶子列内仍可使用 `render` / `isSlot`。

<div class="demo">
    <YoTable :tableData="multiData" :columns="multiColumns" :isShowPagination="false" />
</div>

```vue
<script setup>
const columns = ref([
    { prop: 'name', label: '姓名' },
    {
        label: '联系方式',           // 分组列，不写 prop
        children: [
            { prop: 'email', label: '邮箱' },
            { prop: 'phone', label: '手机号' },
        ]
    },
    {
        label: '财务信息',
        children: [
            { prop: 'dept',   label: '部门' },
            { prop: 'amount', label: '金额', align: 'right' },
        ]
    },
])
</script>
```

<a :href="withBase('/table.png')" target="_blank">
  <img :src="withBase('/table.png')" alt="多级表头示例" style="cursor:zoom-in;" />
</a>

## 特殊列类型 (Special Types)

组件内置了一些常用的业务列类型，可以通过 `type` 属性开启，并配合 `keys`、`separateSymbol`、`format` 等属性使用。

### 1. 多字段拼接 (multKey)

用于将多个字段的值根据分隔符拼接展示。

```javascript
{
    label: '多字段 (multKey)',
    prop: "mult_test", // 仅作为 key 使用
    type: 'multKey',
    keys: ['name', 'email'],
    separateSymbol: ' / ',
    width: 250
}
```

### 2. 金额 + 单位 (moneymultKey)

用于展示格式化后的金额，并附加单位。单位可以是固定字符串，也可以是数据中的另一个字段。

```javascript
{
    label: '金额+单位 (moneymultKey)',
    type: 'moneymultKey',
    keys: ['amount', { fix: true, key: '元' }], // 也可以是 { fix: false, key: 'currency' }
    width: 200,
    align: 'right'
}
```

### 3. 日期格式化 (date)

支持单个日期格式化，或多个日期拼接。

```javascript
// 单个日期格式化
{ prop: 'createdAt', label: '日期', width: 120, format: 'YYYY/MM/DD' },

// 多个日期拼接
{
    label: '起止日期 (date)',
    type: 'date',
    keys: ['startDate', 'endDate'],
    format: 'YYYY-MM-DD',
    separateSymbol: ' - ',
    width: 250
}
```

## 多选（showCheckbox）

设置 `showCheckbox` 属性显示全选框，通过组件 `ref` 调用 `getSelection()` 获取选中行数组。

<div class="demo">
    <ElButton type="primary" size="small" style="margin-bottom:12px" @click="onGetSelection">获取选中行</ElButton>
    <YoTable ref="selTableRef" showCheckbox :tableData="selData" :columns="selColumns" :isShowPagination="false" />
</div>

```vue
<template>
  <el-button @click="getRows">获取选中行</el-button>
  <YoTable ref="tableRef" showCheckbox api="/api/user/list" :columns="columns" />
</template>

<script setup>
import { ref } from 'vue'

const tableRef = ref(null)
const getRows  = () => {
    const rows = tableRef.value.getSelection()
    console.log(rows)
}
</script>
```

## 固定列

在列配置中加入 `fixed: 'left'` 或 `fixed: 'right'` 即可固定列。固定列需要表格具备横向/纵向滚动（通过 `height` 属性或总列宽超出容器宽度触发）。

```vue
<template>
  <!-- height 触发纵向滚动，使固定列生效 -->
  <YoTable api="/api/user/list" :columns="columns" :height="500" />
</template>

<script setup>
const columns = ref([
    { prop: 'name',   label: '姓名', fixed: 'left',  width: 120 },
    { prop: 'email',  label: '邮箱',                 width: 300 },
    { prop: 'amount', label: '金额',                 width: 400 },
    {
        prop: 'action',
        label: '操作',
        fixed: 'right',
        width: 140,
        render(row) {
            return (
                <div>
                    <el-button type="primary" link size="small">编辑</el-button>
                    <el-button type="danger"  link size="small">删除</el-button>
                </div>
            )
        }
    },
])
</script>
```

## 不显示分页

设置 `:isShowPagination="false"` 关闭分页。此时组件发出的请求将不再携带 `PageIndex` 和 `PageSize` 参数。

```vue
<template>
  <YoTable 
    api="/api/user/all" 
    method="GET" 
    :isShowPagination="false" 
    :columns="columns" 
  />
</template>
```

## 手动刷新

通过 `ref` 调用 `reload()` 可重置到第一页并重新请求数据，`loadData()` 则在当前页刷新。

```vue
<template>
  <el-button @click="tableRef.reload()">刷新至第一页</el-button>
  <YoTable 
    ref="tableRef" 
    api="/api/user/list" 
    :columns="columns" 
  />
</template>
```

## el-table 原生属性透传

`YoTable` 会将所有未声明的属性通过 `v-bind="$attrs"` 透传给 `el-table`，直接使用 Element Plus 的原生属性即可。

```vue
<!-- stripe、border、height 等均可直接传 -->
<YoTable
  stripe
  :border="false"
  :height="600"
  api="/api/user/list"
  :columns="columns"
/>
```

## 手动定义列 (Manual Columns)

如果您不想通过 `columns` 配置项，或者想在特定位置插入原生列，可以直接在 `<YoTable>` 内部使用 `<el-table-column>`。

### 1. 后置插入 (默认插槽)

默认情况下，手动编写的列会追加到所有自动生成的业务列**之后**。

```vue
<YoTable :tableData="data">
  <el-table-column prop="action" label="操作" width="120" />
</YoTable>
```

### 2. 前置插入 (#prepend)

通过 `#prepend` 插槽，您可以将列插入到业务列**之前**（通常在多选框之后）。

```vue
<YoTable :tableData="data">
  <template #prepend>
    <el-table-column type="expand">
      <template #default="{ row }"> ... </template>
    </el-table-column>
  </template>
</YoTable>
```

---

## API

### Props 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `api` | 独立模式：请求后端的接口地址 | `String` | — |
| `method` | 当使用 `api` 请求数据时的 HTTP 方法 | `String` | `'POST'` |
| `queryParams` | 当使用 `api` 请求数据时的额外查询参数对象 | `Object` | `{}` |
| `staticParams` | 额外的静态请求参数，每次请求都会携带 | `Object` | `{}` |
| `tableData` | 外部模式：直接传入表格数据 | `Array` | `null` |
| `pagination` | 外部模式：配合 `tableData` 使用的分页信息 | `Object` | `null` |
| `columns` | 列配置数组 | `Array` | `[]` |
| `showSetting` | 是否开启列展示设置（齿轮图标） | `Boolean` | `false` |
| `settingColumns` | 列设置：指定哪些列出现在勾选列表里（不传则所有非固定列可控） | `Array` | `null` |
| `rowKey` | 行数据的 Key，跨页选中或行合并必须设置 | `String` | `'id'` |
| `reserveSelection` | 是否跨页保留选中状态（需配合 `rowKey`） | `Boolean` | `false` |
| `mergeBy` | 自动合并：指定列名数组，相邻行 `rowKey` 相同则合并 | `Array` | `null` |
| `spanMethod` | 手动合并：自定义单元格合并逻辑，优先级高于 `mergeBy` | `Function` | `null` |
| `isShowPagination` | 是否显示分页 | `Boolean` | `true` |
| `paginationOptions` | 分页初始值（独立模式使用） | `Object` | `{ pageNum: 1, pageSize: 10, total: 0 }` |
| `pageSizesOption` | 每页条数选择项 | `Array` | `[10, 20, 50, 100]` |
| `layout` | 分页组件布局 | `String` | `'total, prev, pager, next, sizes, jumper'` |
| `showCheckbox` | 是否显示多选列 | `Boolean` | `false` |
| `checkboxWidth`| 多选 Checkbox 列的宽度（px） | `Number` | `50` |
| `noWidth` | 序号列宽度（px） | `Number` | `100` |
| `loading` | 是否显示加载状态 | `Boolean` | `false` |
| `...el-table 原生属性` | 所有 `el-table` 支持的属性均可直接透传 | — | — |

### columns 列配置项

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 字段名，对应数据对象的 key | `string` | — |
| `label` | 列标题 | `string` | — |
| `width` | 列宽度（px） | `number` / `string` | — |
| `align` | 对齐方式：`left` / `center` / `right` | `string` | `left` |
| `fixed` | 固定列：`left` / `right` | `string` | — |
| `type` | 列类型：`index` (序号) / `selection` (勾选) / `expand` (展开) / `multKey` (多字段) / `moneymultKey` (带货币多字段) / `date` (日期) | `string` | — |
| `format` | 格式化模板，用于 `multKey` 等类型或配合 `renderCell` | `string` | — |
| `dateFormat` | 日期格式化字符串（如 `YYYY-MM-DD`），仅在 `type: 'date'` 时生效 | `string` | — |
| `render` | 自定义渲染函数 `(row) => VNode`，支持 JSX 或 `h()` | `Function` | — |
| `isSlot` | 启用外部命名插槽，插槽名为该列的 `prop` 值，作用域变量为 `{ data }` | `boolean` | `false` |
| `children` | 子列配置数组 | `Array` | — |
| `showSetting` | 单独控制该列是否显示设置图标（通常用于操作列） | `boolean` | `false` |
| `...el-table-column 原生属性` | 所有 `el-table-column` 支持的属性均可直接配置 | — | — |

### Events 事件

组件底层透传了所有 `el-table` 的事件，直接在 `<YoTable>` 上使用小写带连字符的格式绑定即可（如 `@select`），或在使用 `YoGrid` 传入 `table` 配置对象时使用 `on` + 大驼峰格式（如 `onSelect`、`onSelectionChange`）。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `select` | 当用户手动勾选数据行的 Checkbox 时触发的事件 | `(selection, row)` |
| `select-all` | 当用户手动勾选全选 Checkbox 时触发的事件 | `(selection)` |
| `selection-change` | 当选择项发生变化时会触发该事件 | `(selection)` |
| `sort-change` | 当表格的排序条件发生变化的时候会触发该事件 | `{ column, prop, order }` |
| `row-click` | 当某一行被点击时会触发该事件 | `(row, column, event)` |
| `...el-table 原生事件` | 所有 `el-table` 支持的事件均可直接绑定 | — |

### Methods 方法

通过 `ref` 访问组件实例调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `reload()` | 重置到第一页并重新请求数据 | — |
| `loadData()` | 在当前页刷新数据（不重置页码） | — |
| `getSelection()` | 返回当前选中的行数组（`showCheckbox` 为 `true` 时可用） | — |

### Slots 插槽

| 插槽名 | 说明 | 作用域变量 |
| --- | --- | --- |
| `prepend` | 前置插槽，位于多选框之后、业务列之前 | — |
| `default` | 默认插槽，位于业务列之后 | — |
| `[column.prop]` | 当列配置了 `isSlot: true` 时启用，插槽名为该列的 `prop` 值 | `{ data }` 当前行对象 |
