# Tree 树形组件 test

针对 `el-tree` 进行了二次封装，支持同步/异步数据加载，搜索过滤，展开折叠，复选摘要以及本地持久化缓存功能。

## 代码预览

<script setup>
import { ref } from 'vue'
import '../../../packages/dist/style.css'

const treeData = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          { id: 9, label: '三级 1-1-1' },
          { id: 10, label: '三级 1-1-2' }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      { id: 5, label: '二级 2-1' },
      { id: 6, label: '二级 2-2' }
    ]
  }
])
</script>

<div class="demo">
    <YoTree :data="treeData" />
</div>

## 异步数据加载

配置 `api` 属性后，组件会自动发起数据请求。

```vue
<template>
  <YoTree 
    api="/api/dept/list" 
    method="GET"
    :tree-props="{ label: 'name' }"
  />
</template>
```

## 功能配置

### 搜索与工具栏

通过 `showSearch` 和 `showActions` 控制搜索框和展开/折叠按钮组。

<div class="demo">
    <YoTree
        :data="treeData"
        showActions
        scrollHeight="200px"
    />
</div>

### 复选框与摘要

设置 `showCheckbox` 开启勾选，选中后会展示选择摘要。

<div class="demo">
    <YoTree
        :data="treeData"
        showCheckbox
        showActions
    />
</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 本地树数据 | `Array` | `null` |
| `api` | 异步接口地址 | `String` | `''` |
| `method` | 请求方法 | `String` | `'POST'` |
| `queryParams` | 额外请求参数 | `Object` | `{}` |
| `nodeKey` | 节点 ID 字段 | `String` | `'id'` |
| `treeProps` | tree 渲染 mapping (label, children, disabled) | `Object` | `{ label: 'label', ... }` |
| `showSearch` | 是否显示搜索框 | `Boolean` | `true` |
| `showFilter` | 搜索时是否实时过滤节点 | `Boolean` | `false` |
| `showActions` | 是否显示工具栏 (展开/折叠/全选) | `Boolean` | `false` |
| `showCheckbox` | 是否显示复选框 | `Boolean` | `false` |
| `scrollHeight` | 树内容区高度 | `String` | `'auto'` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `prefix` | 节点文案前缀区域 |
| `extra` | 节点右端操作按钮区域 |

### Methods

| 方法名 | 说明 |
| --- | --- |
| `reload()` | 重新拉取接口数据 |
| `getCheckedNodes()` | 获取已勾选数据的数组 |
| `setCheckedKeys(keys)` | 设置指定 key 为选中状态 |
