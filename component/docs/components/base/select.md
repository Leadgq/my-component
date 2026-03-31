# Select 选择器

封装自 `el-select` 的下拉选择器，支持**静态选项**、**接口请求**和**枚举加载**三种模式。

## 基础用法

通过 `options` 传入静态数据。

<div class="demo">
  <YoSelect v-model="val1" :options="options1" placeholder="请选择" />
</div>

```vue
<template>
  <YoSelect v-model="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]
</script>
```

## 接口加载 (API)

传入 `api` 属性，组件会自动请求接口。可以使用 `keyValue` 配置字段映射。

<div class="demo">
  <YoSelect v-model="val2" api="/api/demo/list" :keyValue="{ value: 'id', label: 'name' }" />
</div>

```vue
<template>
  <!-- 组件会自动发送 GET 请求，并根据 keyValue 映射字段 -->
  <YoSelect 
    v-model="value" 
    api="/api/user-list" 
    :keyValue="{ value: 'id', label: 'userName' }" 
  />
</template>
```

## 枚举加载 (Enum)

传入 `enumName` 属性，组件会从统一枚举接口加载数据。

<div class="demo">
  <YoSelect v-model="val3" enumName="ProjectStatus" />
</div>

```vue
<template>
  <!-- 请求路径: /api/Enum/GetEnumItems?fullname=ProjectStatus -->
  <YoSelect v-model="value" enumName="ProjectStatus" />
</template>
```

## 插槽支持

支持 `el-select` 的所有原生插槽（如 `prefix`, `empty`, `default` 等）。

```vue
<template>
  <YoSelect v-model="value">
    <el-option label="自定义项" value="custom" />
  </YoSelect>
</template>
```

---

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定值 | `any` | — |
| `options` | 静态选项数组 | `Array` | `[]` |
| `api` | 接口请求地址 | `String` | — |
| `enumName` | 全局枚举名称 | `String` | — |
| `keyValue` | 字段映射配置 (仅用于 api 模式) | `Object` | `{ value: 'value', label: 'label' }` |
| `...` | 其余 `el-select` 原生属性均可透传 | — | — |

### keyValue 配置项

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选项的值对应的字段名 | `string` | `'value'` |
| `label` | 选项的标签对应的字段名 | `string` | `'label'` |

<script setup>
import { ref } from 'vue'
import '../../../packages/dist/style.css'

const val1 = ref('')
const options1 = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]

const val2 = ref('')
const val3 = ref('')
</script>

<style>
.demo {
  border: 1px solid #ebeef5;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 24px;
}
</style>
