# Table 表格组件

封装自 `el-table` 的业务表格组件，支持**分页**、**序号列**、**多选**、**固定列**、**自定义渲染**、**插槽列**与**多级表头**，通过 `getTableFunction` 驱动数据加载。

<script setup>
import { withBase } from 'vitepress'
import { YoTable } from '../../../packages/dist/index.js'
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

const basicGetFn = ({ pageNum = 1, pageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = basicData.value.length
        const list  = basicData.value.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        resolve({ list, total })
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

const renderGetFn = ({ pageNum = 1, pageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = renderData.value.length
        const list  = renderData.value.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        resolve({ list, total })
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

const multiGetFn = ({ pageNum = 1, pageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = multiData.value.length
        const list  = multiData.value.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        resolve({ list, total })
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
const selGetFn = ({ pageNum = 1, pageSize = 10 } = {}) =>
    new Promise(resolve => setTimeout(() => {
        const total = selData.value.length
        const list  = selData.value.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        resolve({ list, total })
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

传入 `getTableFunction` 与 `columns` 即可渲染带分页的表格。`getTableFunction` 接收 `{ pageNum, pageSize }` 参数，需返回 `{ list, total }` 格式（或直接返回数组）。

<div class="demo">
    <YoTable :getTableFunction="basicGetFn" :columns="basicColumns" />
</div>

```vue
<template>
  <YoTable :getTableFunction="getTableFunction" :columns="columns" />
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([/* 你的数据 */])

const columns = ref([
    { prop: 'id',    label: 'ID',   width: 80,  align: 'center' },
    { prop: 'name',  label: '姓名',  width: 100 },
    { prop: 'email', label: '邮箱', showOverflowTooltip: true },
])

// 接收 { pageNum, pageSize }，返回 { list, total }（或直接返回数组）
const getTableFunction = ({ pageNum = 1, pageSize = 10 } = {}) => {
    return new Promise(resolve => {
        const total = tableData.value.length
        const list  = tableData.value.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        resolve({ list, total })
    })
}
</script>
```

## 自定义渲染（render）

在 `columns` 配置项中加入 `render(row)` 函数，即可完全自定义该列的单元格内容，参数为当前行数据。

<div class="demo">
    <YoTable :getTableFunction="renderGetFn" :columns="renderColumns" />
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
  <YoTable :getTableFunction="getTableFunction" :columns="columns">
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
    <YoTable :getTableFunction="multiGetFn" :columns="multiColumns" />
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

## 多选（showCheckbox）

设置 `showCheckbox` 属性显示全选框，通过组件 `ref` 调用 `getSelection()` 获取选中行数组。

<div class="demo">
    <ElButton type="primary" size="small" style="margin-bottom:12px" @click="onGetSelection">获取选中行</ElButton>
    <YoTable ref="selTableRef" showCheckbox :getTableFunction="selGetFn" :columns="selColumns" />
</div>

```vue
<template>
  <el-button @click="getRows">获取选中行</el-button>
  <YoTable ref="tableRef" showCheckbox :getTableFunction="getTableFunction" :columns="columns" />
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
  <YoTable :getTableFunction="getTableFunction" :columns="columns" :height="500" />
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

设置 `:isShowPagination="false"` 关闭分页，此时 `getTableFunction` 被调用时不携带分页参数。

```vue
<YoTable :getTableFunction="getTableFunction" :columns="columns" :isShowPagination="false" />
```

## 手动刷新

通过 `ref` 调用 `reload()` 可重置到第一页并重新请求数据，`loadData()` 则在当前页刷新。

```vue
<template>
  <el-button @click="tableRef.reload()">刷新至第一页</el-button>
  <YoTable ref="tableRef" :getTableFunction="getTableFunction" :columns="columns" />
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
  :getTableFunction="getTableFunction"
  :columns="columns"
/>
```

---

## API

### Props 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `getTableFunction` | 数据获取函数，接收 `{ pageNum, pageSize }` 参数，需返回 `Promise<{ list, total }>` 或 `Promise<Array>` | `Function` | — |
| `columns` | 列配置数组，详见[列配置项](#columns-列配置项) | `Array` | `[]` |
| `isShowPagination` | 是否显示分页 | `Boolean` | `true` |
| `paginationOptions` | 分页初始值，`{ pageNum, pageSize, total }` | `Object` | `{ pageNum:1, pageSize:10, total:0 }` |
| `pageSizesOption` | 每页条数选择项 | `Array` | `[10, 20, 50, 100]` |
| `showCheckbox` | 是否显示多选列 | `Boolean` | `false` |
| `noWidth` | 序号列宽度（px） | `Number` | `60` |
| `...el-table 原生属性` | 所有 `el-table` 支持的属性均可直接透传（如 `stripe`、`border`、`height` 等） | — | — |

### columns 列配置项

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 字段名，对应数据对象的 key | `string` | — |
| `label` | 列标题 | `string` | — |
| `width` | 列宽度（px） | `number` / `string` | — |
| `align` | 对齐方式：`left` / `center` / `right` | `string` | `left` |
| `fixed` | 固定列：`left` / `right` | `string` | — |
| `render` | 自定义渲染函数 `(row) => VNode`，支持 JSX 或 `h()` | `Function` | — |
| `isSlot` | 启用外部命名插槽，插槽名为该列的 `prop` 值，作用域变量为 `{ data }` | `boolean` | `false` |
| `children` | 子列配置数组，配置后该列变为分组表头，支持任意深度嵌套 | `Array` | — |
| `...el-table-column 原生属性` | 所有 `el-table-column` 支持的属性均可直接配置（如 `showOverflowTooltip`、`sortable` 等） | — | — |

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
| `[column.prop]` | 当列配置了 `isSlot: true` 时启用，插槽名为该列的 `prop` 值 | `{ data }` 当前行对象 |
