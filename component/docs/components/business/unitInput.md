# UnitInput 单位输入框

用于输入带有单位的数值或文本，通常用于金额、重量、尺寸等场景。底层基于 `YoInput` 和 `YoSelect` 组合实现。

## 基础用法

通过 `v-model` 绑定输入值，通过 `v-model:unit` 绑定单位值。

<div class="demo">
    <YoUnitInput
      v-model="val"
      v-model:unit="unit"
      :options="[
        { label: '元', value: '元' },
        { label: '万元', value: 'WAN' },
        { label: '千万', value: 'QWAN' }
      ]"
      placeholder="请输入金额"
      style="width: 300px"
    />
</div>

```vue
<template>
  <YoUnitInput 
    v-model="amount" 
    v-model:unit="unit"
    :options="unitOptions"
    placeholder="请输入金额"
    style="width: 300px"
  />
</template>

<script setup>
import { ref } from 'vue'
const amount = ref('')
const unit = ref('WAN')
const unitOptions = [
  { label: '元', value: '元' },
  { label: '万元', value: 'WAN' },
  { label: '千万', value: 'QWAN' }
]
</script>
```

## 禁用状态

设置 `disabled` 属性即可禁用整个组件（包括输入框和下拉框）。

<div class="demo">
    <YoUnitInput
      v-model="val"
      v-model:unit="unit"
      :options="unitOptions"
      disabled
      style="width: 300px"
    />
</div>

## 数据来源

`YoUnitInput` 为单位下拉框提供了多种数据加载方式，逻辑与 `YoSelect` 保持一致。

### 通过枚举加载

设置 `enumName` 属性。组件会在加载完成后自动选中第一项。

```vue
<template>
  <YoUnitInput v-model="val" v-model:unit="unit" enumName="CurrencyUnit" />
</template>
```

### 通过 API 接口加载

设置 `api` 属性。组件会在接口返回数据后自动选中第一项。

```vue
<template>
  <YoUnitInput 
    v-model="val" 
    v-model:unit="unit" 
    api="/api/System/GetUnits" 
    :keyValue="{ value: 'Id', label: 'Name' }"
  />
</template>
```

### 本地配置 (Options)

直接传入 `options` 数组。

```vue
<template>
  <YoUnitInput v-model="val" v-model:unit="unit" :options="localOptions" />
</template>
```

## API

### Props 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入框绑定的值 | `string` \| `number` | — |
| `v-model:unit` | 单位下拉框绑定的值 | `string` \| `number` | — |
| `options` | 单位下拉选项列表 | `Array` | `[]` |
| `api` | 获取单位选项的接口地址 | `string` | — |
| `enumName` | 获取单位选项的枚举全名 | `string` | — |
| `keyValue` | 选项的键值映射，例如 `{ value: 'id', label: 'name' }` | `Object` | `{ value: 'Value', label: 'Description' }` |
| `unitWidth` | 单位下拉框的宽度 (px) | `number` \| `string` | `100` |
| `unitPlaceholder` | 单位下拉框的占位符 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |

### Events 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入框值改变时触发 | `(val: string \| number)` |
| `update:unit` | 单位值改变时触发 | `(unit: string \| number)` |
| `unit-change` | 单位改变时的原生事件 | `(unit: string \| number)` |

### Slots 插槽

支持 `YoInput` 的所有插槽（如 `prefix` 等），同时支持以下单位相关的插槽：

| 插槽名 | 说明 |
| --- | --- |
| `unit-prefix` | 单位下拉框的前缀内容 |
| `unit-empty` | 单位下拉框无数据时的显示内容 |
| `unit-default` | 自定义单位下拉项渲染 |
| (其他) | 其他以 `unit-` 开头的插槽会透传给内部的 `YoSelect` |

<script setup>
import '../../../packages/dist/style.css'
import { ref } from 'vue'
const val = ref('')
const unit = ref('WAN')
const unitOptions = [
  { label: '元', value: '元' },
  { label: '万元', value: 'WAN' },
  { label: '千万', value: 'QWAN' }
]
</script>
