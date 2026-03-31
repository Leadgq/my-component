# MaterialFile 材料附件组件

`YoMaterialFile` 用于展示多行材料上传需求，通常用于表单中。每一行代表一个材料项，支持标签（材料名称）、模板下载及附件上传/预览。它是对 `YoFile` 的业务封装，自动循环渲染材料列表。

## 基础用法

通过 `v-model` 绑定材料列表数据。

```vue
<template>
  <YoMaterialFile v-model="materialList" />
</template>

<script setup>
import { ref } from 'vue'
const materialList = ref([
  {
    MaterialId: 1,
    MaterialName: '营业执照',
    IsRequired: true,
    Files: '', // 附件 ID 字符串或数组
    MaxCount: 1,
    UploadType: 1 // 图片模式
  },
  {
    MaterialId: 2,
    MaterialName: '授权委托书',
    ExcelTempId: '12345', // 模板 ID，显示在名称下方
    Files: []
  }
])
</script>
```

---

## 核心功能

### 模板下载

如果材料项配置了 `ExcelTempId`，在左侧 Label 下方会显示“模板下载”按钮。

- 配置单个 ID：显示单个下载按钮。
- 配置多个 ID（逗号分隔或数组）：自动循环生成多个下载按钮（带序号）。

### 只读与权限

可以通过以下方式控制只读状态：

- **全局只读**：设置组件 `readOnly` 属性。
- **单项只读**：在材料项数据中设置 `readOnly: true` 或 `isUpload: false`。

### 合同签署预览

当设置 `signContractChannel === 10` 时，组件进入合同签署查看模式，右侧显示“查看”按钮。

---

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model / modelValue` | 材料列表数据（结构见下方） | `Array` | `[]` |
| `readOnly` | 全局只读模式 | `Boolean` | `false` |
| `apiUrl` | 基础接口地址 | `String` | `''` |
| `uploadBtnName` | 上传按钮名称 | `String` | `'上传'` |
| `layout` | 内部 YoFile 的布局：`horizontal / vertical` | `String` | `'horizontal'` |
| `api / fileUrl` | 获取材料列表的接口地址（若未传 modelValue） | `String` | `''` |
| `parentProp` | 用于表单校验的父级路径前缀 | `String` | `''` |

### 材料项（Item）数据结构

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| `MaterialId` | 材料唯一标识 | `Number / String` |
| `MaterialName` | 材料名称（Label 显示内容） | `String` |
| `IsRequired` | 是否必填 | `Boolean` |
| `Files` | 已上传附件 ID（双向绑定） | `String / Array` |
| `UploadType` | 模式：`1` 图片卡片，`3` 文件列表 | `Number` |
| `MaxCount` | 最大允许上传数量 | `Number` |
| `ExcelTempId` | 模板 ID（支持单 ID、逗号分隔 ID 或数组） | `String / Array` |
| `isUpload` | 是否允许当前项上传 | `Boolean` |
| `readOnly` | 当前项是否只读 | `Boolean` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `label` | 自定义标签区域内容（已默认实现带模板下载的排版） |
