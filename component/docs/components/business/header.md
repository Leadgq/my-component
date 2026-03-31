# Header 头部组件

业务自定义头部组件，封装了页面标题、返回功能和操作插槽，注意的是header是没有背景的——ui定的。

<script setup>
import { ref } from 'vue'
import { YoHeader,YoButton } from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'

const handleBack = () => {
    alert('点击了返回组件事件');
}
</script>

<style scoped>
.demo{
    background-color: #ccc;
    margin-bottom: 15px;
}
</style>

## 基本使用

最简单的基本用法，仅展示页面标题。

<div class="demo">
    <div class="button-row">
        <yo-header title="基本头部组件"></yo-header>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-header title="基本头部组件"></yo-header>
  </div>
</template>
```

## 带返回按钮

设置 `isShowBack` 即可显示返回按钮组件；通过 `btnText` 属性可以自定义返回按钮的文本内容。

点击返回按钮默认会执行浏览器回退 `window.history.back()`。如果外部监听了 `back` 事件或 `onBack` 属性，将触发自定义的 `back` 回调。

<div class="demo">
    <div class="button-row">
        <yo-header title="带返回按钮头部" isShowBack></yo-header>
    </div>
    <div class="button-row" style="margin-top: 15px;">
        <yo-header title="自定义返回文案" isShowBack btnText="取消" @back="handleBack"></yo-header>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-header title="带返回按钮头部" isShowBack></yo-header>
  </div>
  <div class="button-row" style="margin-top: 15px;">
    <yo-header title="自定义返回文案" isShowBack btnText="取消" @back="handleBack"></yo-header>
  </div>
</template>

<script setup>
const handleBack = () => {
    console.log('点击了取消组件事件');
}
</script>
```

## 插槽 (Slots)

组件支持 `second` 以及 `action` 插槽。
- **`second`**：用于向自带的 `YoTitle` 传入二级标题内容。
- **`action`**：用于展示位于右侧的操作功能区（如编辑、保存等操作按钮）。

<div class="demo">
    <div class="button-row">
        <yo-header title="包含操作区域的头部" isShowBack>
            <template #second>
                <span style="color: #666; font-size: 14px; margin-left: 8px;">状态：启用中</span>
            </template>
            <template #action>
                <YoButton class="action-btn">编辑</YoButton>
                <YoButton class="action-btn">删除</YoButton>
            </template>
        </yo-header>
    </div>
</div>


```vue
<template>
  <div class="button-row">
    <yo-header title="包含操作区域的头部" isShowBack>
        <template #second>
            <span style="color: #666; font-size: 14px; margin-left: 8px;">状态：启用中</span>
        </template>
        <template #action>
            <button class="action-btn">编辑</button>
            <button class="action-btn">删除</button>
        </template>
    </yo-header>
  </div>
</template>

<style>
.action-btn {
    margin-left: 10px;
    padding: 5px 15px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
}
</style>
```

## API

### Props 属性

| 参数         | 说明                                | 类型      | 默认值  |
| ------------ | ----------------------------------- | --------- | ------- |
| `title`      | 标题内容                            | `string`  | `''`    |
| `isShowBack` | 是否显示返回按钮                    | `boolean` | `false` |
| `btnText`    | 返回按钮的显示文本，在显示返回时生效 | `string`  | `'返回'`|

### Events 事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| `back` | 点击返回按钮时触发。如果组件没有绑定该事件，则会默认调用 `window.history.back()` 返回上一页。 | — |

### Slots 插槽

| 插槽名   | 说明                                       | 类型 |
| -------- | ------------------------------------------ | ---- |
| `second` | 一级标题之后的二级标题内容                 | —    |
| `action` | 头部组件右侧的操作内容区域，通常存放操作按钮 | —    |