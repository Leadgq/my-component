# Empty 空状态

当无数据时，显示的空状态占位图。内置了统一的业务空状态图标。

<script setup>
import { YoEmpty } from '../../../packages/src'
</script>

## 基础用法

直接使用组件即可展示默认的空状态图标和提示文案。

<div class="demo">
  <YoEmpty />
</div>

```vue
<template>
  <YoEmpty />
</template>
```

## 自定义描述

通过 `description` 属性自定义提示文案。

<div class="demo">
  <YoEmpty description="暂无相关记录" />
</div>

```vue
<template>
  <YoEmpty description="暂无相关记录" />
</template>
```

## 自定义图片大小

通过 `image-size` 属性控制图片的大小。

<div class="demo">
  <YoEmpty :image-size="100" />
</div>

```vue
<template>
  <YoEmpty :image-size="100" />
</template>
```

## 底部内容插槽

使用 `default` 插槽在底部添加操作按钮或其他内容。

<div class="demo">
  <YoEmpty>
    <el-button type="primary">返回重试</el-button>
  </YoEmpty>
</div>

```vue
<template>
  <YoEmpty>
    <el-button type="primary">返回重试</el-button>
  </YoEmpty>
</template>
```

## 自定义图标和文本

通过 `image` 和 `description` 插槽可以完全自定义显示内容。

<div class="demo">
  <YoEmpty>
    <template #image>
      <el-icon :size="60"><warning /></el-icon>
    </template>
    <template #description>
      <span style="color: #909399">自定义描述文本</span>
    </template>
    <el-button type="primary">主要操作</el-button>
  </YoEmpty>
</div>

```vue
<template>
  <YoEmpty>
    <template #image>
      <el-icon :size="60"><Warning /></el-icon>
    </template>
    <template #description>
      <span style="color: #909399">自定义描述文本</span>
    </template>
    <el-button type="primary">主要操作</el-button>
  </YoEmpty>
</template>
```

---

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `image` | 图片地址 | `string` | (内置 emty.png) |
| `image-size` | 图片大小（宽度） | `number` | — |
| `description` | 提示文案 | `string` | `'暂无数据'` |
| `...` | 其余 `el-empty` 原生属性均可透传 | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义底部内容 |
| `image` | 自定义图片内容 |
| `description` | 自定义提示文案 |

<style>
.demo {
  border: 1px solid #ebeef5;
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 24px;
  background-color: #fff;
}
</style>
