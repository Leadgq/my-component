# yo-conent

<script setup>
import { ref } from 'vue'
import {YoContent, YoTitle} from '../../../packages/dist/index.js'
</script>

<div>
  <YoContent title="内容区域">
    <template #second>
      <div>副标题</div>
    </template>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <YoTitle :content="'委托代理人信息'" :title-level="2"></YoTitle>
  </YoContent>
</div>


```vue
<template>
<div>
  <YoContent title="内容区域">
    <template #second>
      <div>副标题</div>
    </template>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <div>第一区域</div>
    <YoTitle :content="'委托代理人信息'" :title-level="2"></YoTitle>
  </YoContent>
</div>
</template>
```

## 插槽


| 插槽            | 说明         | 类型      | 默认值      |
| --------------- | ------------ | --------- | ----------- |
| `default`       | 主要内容     | `string`  | `''`        |
| `second`       | 第二标题     | `string`  | `''`        |
| `title`       | 标题     | `string`  | `''`        |
