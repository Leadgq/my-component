# DetailCol 详情多列布局组件

基于 CSS Grid 实现的详情信息多列布局组件，适用于大部分基础信息、详情信息的展示场景，可以方便地将一维数组数据渲染为响应式的多列表单/详情布局。

<script setup>
import { YoDetailCol,YoButton } from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'
import { ref ,h} from 'vue'
import {ElRate} from 'element-plus'
const basicData = ref([
    [
          { title: '姓名', value: '张三',labelW:30 },
    { title: '年龄', value: '28',labelW:30 },
    { title: '性别', value: '男',labelW:30 },
    ],
    [
    { title: '手机号码', value: '13800138000', span: 8 },
    { title: '邮箱', value: 'zhangsan@example.com', span: 8 }
]
])

const renderData = ref([
    [
        { title: '账户余额', value: '25000.00', type: 'money' },
        { title: '开户状态', value: '已开户' },
        { title: '备注', value: 'VIP 客户', isVisiable: true }
    ]
])

const customRenderData = ref([
    [
        {
            title: '信用评级',
            value: 4.5,
            isSlot: "middle",
            key: "level",
            render: (cellData) => {
                console.log(cellData)
                return h(ElRate, {
                    modelValue: cellData.value,
                    disabled: true,
                    showScore: true,
                    textColor: '#ff9900'
                });
            }
        },
        {
            title: '操作',
            value: 'btn',
            span: 12,
            render: (cellData) => {
                return h('div', [
                    h(YoButton, { type: 'primary', size: 'small', onClick: () => alert('编辑') }, () => '编辑用户'),
                    h(YoButton, { type: 'danger', size: 'small', plain: true, onClick: () => alert('删除') }, () => '删除'),
                    h(YoButton, { type: 'primary', size: 'small', plain: true, onClick: () => test() }, () => '网络测试')
                ]);
            }
        }
    ]
])

async function test(){
const value =5;
customRenderData.value[0][0].value = value;
}

function netWorkValue(){
    return new Promise((reslove)=>{
        setTimeout(() => {
            reslove(5)
        }, 2000);
    })
}
</script>

<style scoped>
.demo {
    background-color: #f8f9fa;
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
}
.demo-inner {
    min-width: 800px;
}
/* 防止在 Vitepress 的 content 区域中 el-input 被挤压变形或超长溢出 */
:deep(.el-input) {
    width: 100%;
}
:deep(.el-input__inner) {
    text-overflow: ellipsis;
}
:deep(.yo-detail-col) {
    width: 100%;
}
</style>

## 基本用法

通过传入 `rowData` 数组，可以快速渲染出多列排版的详情信息。默认情况下，每个项占据 8 份宽度（对应于 24 栅格，即占据 1/3，一行显示三个项）。

<div class="demo">
    <div class="demo-inner">
        <YoDetailCol :rowData="basicData" :label_width="30" />
    </div>
</div>

```vue
<template>
  <div class="demo">
    <div class="demo-inner">
      <yo-detail-col :rowData="basicData" :label_width="80"></yo-detail-col>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const basicData = ref([
  [
    { title: '姓名', value: '张三' },
    { title: '年龄', value: '28' },
    { title: '性别', value: '男' }
  ],
  [
    // 通过 span 控制网格跨度，满行 24，默认 8。这里占两列。
    { title: '手机号码', value: '13800138000', span: 16 }, 
    { title: '邮箱', value: 'zhangsan@example.com', span: 8 }
  ]
]);
</script>
```

## 自定义类型与内容

另外，还可以配置各项是否可见 `isVisiable`。当 `isVisiable` 显式设为 `false` 时，该项不会被渲染。

<div class="demo">
    <div class="demo-inner">
        <YoDetailCol :rowData="renderData" :label_width="90" />
    </div>
</div>

```vue
<template>
  <div class="demo">
    <div class="demo-inner">
      <yo-detail-col :rowData="renderData" :label_width="90"></yo-detail-col>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const renderData = ref([
  [
    { title: '账户余额', value: '25000.00' },
    { title: '开户状态', value: '已开户' },
    // isVisiable: false 会隐藏该项
    { title: '备注', value: 'VIP 客户', isVisiable: false }
  ]
]);
</script>
```

## 自定义 render

通过 `render` 渲染函数，您可以完全自定义每个字段的展示效果。这在需要展示标签、按钮或复杂交互组件时非常有用。

<YoDetailCol :rowData="customRenderData" />

</script>
## 下划线模式

通过设置 `underLine` 属性，可以开启简洁的下划线展示模式。

<div class="demo">
    <YoDetailCol :rowData="basicData" :underLine="true" :label_width="50" />
</div>

```vue
<template>
  <yo-detail-col :rowData="basicData" :underLine="true" :label_width="80"></yo-detail-col>
</template>
```

## API

### Props 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rowData` | 详情配置数据，必须为二维数组。 | `Array` | `[]` |
| `layout` | 布局模式：`grid` (网格) 或 `flex` (弹性) | `string` | `'grid'` |
| `label_width` | 默认标签宽度 (px) | `number` | `70` |
| `labelAlign` | 标签对齐方式：`start`, `center`, `end` | `string` | `'start'` |
| `valueAlign` | 内容对齐方式：`start`, `center`, `end` | `string` | `'start'` |
| `underLine` | 是否开启下划线模式 | `boolean` | `false` |
| `space` | 标签与内容间距 (px) | `number` \| `string` | `12` |
| `backgroundColor` | 背景颜色 | `string` | `''` |

### `rowData` 配置项详情

`rowData` 数组内每个对象项均支持以下属性：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标签文本。 | `string` | — |
| `value` | 值。 | `any` | — |
| `span` | 跨占列数 (1-24)。 | `number` | `8` |
| `labelW` | 单项标签宽度。 | `number` \| `string` | — |
| `labelAlign` | 单项标签对齐：`start`, `center`, `end` | `string` | — |
| `valueAlign` | 单项内容对齐方式：`start`, `center`, `end` | `string` | — |
| `underLine` | 单项是否开启下划线。 | `boolean` | — |
| `space` | 单项标签右间距。 | `string` | — |
| `isVisiable` | 当前项是否显示。 | `boolean` | `true` |
| `render` | 自定义渲染函数：`(data) => VNode` | `function` | — |
| `before` / `middle` / `after` | 辅助渲染函数。 | `function` | — |

### 渲染函数扩展说明

组件通过 `before`、`middle`、`after`、`render` 四个渲染函数属性来扩展每个字段项的渲染能力，**这些均为函数属性，不是 Vue 具名插槽**。

| 属性 | 插入位置 | 与 `render` 的关系 |
| --- | --- | --- |
| `before` | 整个字段项的最前面（标签之前） | 可与 `render` 同时使用 |
| `middle` | 标签文本与值内容框之间 | 可与 `render` 同时使用 |
| `after` | 整个字段项的最后面（值内容框之后） | 可与 `render` 同时使用 |
| `render` | 完全替换默认的展示区域 | 设置后不再渲染默认展示内容 |
