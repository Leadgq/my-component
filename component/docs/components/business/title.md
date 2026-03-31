# 标题组件

业务自定义标题组件

## 基本一级

<script setup>
import { ref } from 'vue'
import '../../../packages/dist/style.css'
</script>

<div class="demo">
    <div class="button-row">
      <yo-title content="委托代理信息"></yo-title>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-title content="委托代理信息"></yo-title>
  </div>
</template>
<script setup>

</script>
```

## 基本二级

<div class="demo">
    <div class="button-row">
      <yo-title content="委托代理信息" :titleLevel="2"></yo-title>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-title content="委托代理信息" :titleLevel="2"></yo-title>
  </div>
</template>
<script setup>

</script>
```

## 基本三级

<div class="demo">
    <div class="button-row">
      <yo-title content="委托代理信息" :titleLevel="3"></yo-title>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-title content="委托代理信息" :titleLevel="3"></yo-title>
  </div>
</template>
<script setup>

</script>
```

## 插槽

<div class="demo">
    <div class="button-row">
      <yo-title content="委托代理信息" :titleLevel="1">
        <template #second>第二标题</template>
      </yo-title>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-title content="委托代理信息" :titleLevel="1">
        <template #second>第二标题</template>
    </yo-title>
  </div>
</template>
<script setup>

</script>
```

### Props

| 参数            | 说明         | 类型      | 默认值      |
| --------------- | ------------ | --------- | ----------- |
| `content`       | 标题内容     | `string`  | `''`        |
| `titleLevel`    | 标题等级     | `number`  | `1`         |

### 插槽

| 插槽            | 说明         | 类型      | 默认值      |
| --------------- | ------------ | --------- | ----------- |
| `second`       | 二级标题     | `string`  | `''`        |
