# File 附件上传组件

`YoFile` 组件用于实现文件的上传、预览、下载和删除功能。它集成了多种上传模式（普通列表、图片卡片、表格样式、拖拽上传），并支持接入不同的存储后端（如 MinIO、七牛云）。

<script setup>
import { ref } from 'vue'
import { YoFile } from '../../../packages/dist/index.js'

const fileIds = ref([])
</script>

## 基础用法

最简单的用法是通过 `v-model` 或 `ids` 绑定附件 ID 列表。

```vue
<template>
  <YoFile v-model:fileList="fileList"/>
</template>

<script setup>
import { ref } from 'vue'
const fileList = ref([])
</script>
```

---

## 展示模式

通过 `uploadType` 属性控制展示风格：

- `1`: 图片卡片模式 (`picture-card`)
- `3/4`: 文件列表模式（默认）

### 图片卡片模式

适用于头像、证件照等图片上传。

```vue
<template>
  <YoFile :uploadType="1" :fileLimit="3" uploadText="添加图片" isHasText />
</template>
```

---

## 布局与样式

### 布局模式

通过 `layout` 属性设置上传按钮与文件列表的排列方式：

- `horizontal`: 水平排列（默认）
- `vertical`: 垂直排列

```vue
<template>
  <YoFile layout="vertical" />
</template>
```

### 拖拽上传

设置 `drag-mode` 开启拖拽区域。

```vue
<template>
  <YoFile :dragMode="true" />
</template>
```

### 表格样式列表

通过 `showTable` 属性将附件列表展示为带表头的表格形式。

```vue
<template>
  <YoFile :showTable="true" />
</template>
```

---

## 存储后端配置

组件支持通过 `upType` 切换存储服务：

- **MinIO**: 设置 `upType="minio"` 并提供相关配置。
- **七牛云**: 设置 `upType="qiniu"`。

```vue
<template>
  <YoFile 
    upType="minio" 
    :minioApi="minioApi"
    minioFetchAdress="/api/fetch"
  />
</template>
```

---

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model / modelValue` | 绑定的附件 ID 列表（数组或逗号分隔字符串） | `Array / String` | `[]` |
| `ids` | 绑定的附件 ID 列表（同 `modelValue`） | `Array / String` | `[]` |
| `uploadBtnName` | 上传按钮文字 | `String` | `'上传'` |
| `uploadType` | 上传/展示模式：`1` 为图片卡片，其余为文件列表 | `Number` | `3` |
| `readOnly` | 是否只读（隐藏上传和删除按钮） | `Boolean` | `false` |
| `isHasText` | 图片模式下是否显示下方文案 | `Boolean` | `false` |
| `uploadText` | 图片模式下显示的文案内容 | `String` | `'上传图片'` |
| `isDelete` | 是否显示删除按钮 | `Boolean` | `true` |
| `isShowUpload` | 是否显示上传按钮 | `Boolean` | `true` |
| `showTable` | 是否展示大表格样式的附件列表 | `Boolean` | `false` |
| `autoUpload` | 是否自动上传 | `Boolean` | `true` |
| `dragMode` | 是否开启区域拖拽上传 | `Boolean` | `false` |
| `fileLimit` | 最大允许上传文件数量（0 为不限制） | `Number` | `0` |
| `fileSize` | 单个文件大小限制（单位字节，>10000 按字节算，否则按 MB 算） | `Number` | `104857600` |
| `layout` | 布局模式：`horizontal` (默认) 或 `vertical` | `String` | `'horizontal'` |
| `upType` | 存储类型：`''` (基础), `'qiniu'`, `'minio'` | `String` | `''` |
| `apiUrl` | 基础上传 API 地址（覆盖全局配置） | `String` | `''` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 绑定的 ID 列表更新时触发 | `ids: Array / String` |
| `update:ids` | 绑定的 ID 列表更新时触发 | `ids: Array / String` |
| `update:fileList` | 完整文件列表对象更新时触发 | `fileList: Array` |
| `delFile` | 文件从服务器删除成功后触发 | `fileId: Number / String` |
| `upload-complete` | 所有文件上传任务完成时触发 | `fileList: Array` |
| `callback` | 文件列表变更时的通用回调 | `fileList: Array` |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `submitUpload()` | 手动触发上传（在 `autoUpload` 为 `false` 时使用） | `-` |
| `clearFiles()` | 清空上传列表 | `-` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `trigger` | 自定义上传触发区域 |
| `tip` | 文件上传区域下方的提示信息 |
