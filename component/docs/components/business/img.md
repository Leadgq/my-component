# Img 附件展示组件

`YoImg` 组件用于展示一组已上传的附件（图片或文件）。它支持从不同的存储服务（如 MinIO, 七牛, 基础存储）获取数据，并提供「列表」和「网格」两种展示模式，内置了图片预览和文件下载功能。

<script setup>
import { ref, reactive } from 'vue'
import '../../../packages/dist/style.css'

</script>

## 基础用法

通过 `ids` 属性传入逗号分隔的附件 ID 字符串。组件会自动调用接口获取附件详情并展示。

::: tip
`YoImg` 内部会自动根据文件的 `type` (MIME Type) 判断是图片还是普通文件，并匹配相应的图标。
:::

### 列表模式 (默认)

列表模式下，附件按行排列，包含图标、名称、大小以及预览/下载按钮。

```vue
<template>
  <YoImg ids="[]" :type="1" />
</template>
```

### 网格模式

网格模式下，图片直接以方块形式展示（使用 `el-image`），非图片文件则展示为大图标块。可以通过 `width` 和 `height` 控制尺寸。

```vue
<template>
  <YoImg 
    ids="[1,2,3,4]" 
    :type="2" 
    width="120px" 
    height="120px" 
    fit="cover" 
  />
</template>
```

---

## 存储类型支持

`YoImg` 支持多种存储后端的地址拼接逻辑，通过 `upType` 属性控制：

- **base** (默认): 使用通用附件接口地址。
- **minio**: 支持从 MinIO 服务获取文件。
- **qiniu**: 支持从七牛云 CDN 获取文件。

```vue
<template>
  <!-- MinIO 示例 -->
  <YoImg 
    ids="[1,2,3,4]" 
    upType="minio" 
    minioApi="http://minio.example.com"
    minioFetchAdress="/api/fetch"
  />
</template>
```

---

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `ids` | 附件 ID  `[]` | `[]` |
| `type` | 展示模式。`1`: 列表, `2`: 网格 | `Number` | `1` |
| `width` | 网格模式下项的宽度 | `String` | `'100px'` |
| `height` | 网格模式下项的高度 | `String` | `'100px'` |
| `fit` | 图片缩放模式（同 `el-image` 的 `fit`） | `String` | `'cover'` |
| `defaultUrl` | 无数据或加载失败时的占位图地址 | `String` | `''` |
| `apiUrl` | 基础 API 地址（覆盖全局配置） | `String` | `''` |
| `upType` | 存储类型：`base`, `minio`, `qiniu` | `String` | `'base'` |
| `minioApi` | MinIO 服务基础地址 | `String` | `''` |
| `minioFetchAdress` | MinIO 获取文件的 API 路径 | `String` | `''` |
| `minioParmar` | MinIO 获取文件的额外参数 | `String` | `''` |
| `qiNiuCdnAPI` | 七牛云 CDN 地址前缀 | `String` | `''` |

### Methods

通过 `ref` 可以手动触发数据加载：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `loadData(ids)` | 根据传入的 IDs 重新加载数据 | `ids: String` |
