# DetailCol 详情多列布局组件

基于 CSS Grid 实现的详情信息多列布局组件，适用于大部分基础信息、详情信息的展示场景，可以方便地将一维数组数据渲染为响应式的多列表单/详情布局。

<script setup>
import { YoDetailCol,YoButton } from '../../../packages/dist/index.js'
import '../../../packages/dist/style.css'
import { ref ,h} from 'vue'
import {ElRate} from 'element-plus'
const basicData = ref([
    { title: '姓名', value: '张三',labelW:30 },
    { title: '年龄', value: '28',labelW:30 },
    { title: '性别', value: '男',labelW:30 },
    { title: '手机号码', value: '13800138000', span: 16 },
    { title: '邮箱', value: 'zhangsan@example.com', span: 8 }
])

const renderData = ref([
    { title: '账户余额', value: '25000.00', type: 'money' },
    { title: '开户状态', value: '已开户' },
    { title: '备注', value: 'VIP 客户', isVisiable: true }
])

const customRenderData = ref([
     {
        title: '信用评级',
        value: 4.5,
        isSlot: "middle",
        key:"level",
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
        span:12,
        render: (cellData) => {
            return h('div', [
                h(YoButton, { type: 'primary', size: 'small', onClick: () => alert('编辑') }, () => '编辑用户'),
                h(YoButton, { type: 'danger', size: 'small', plain: true, onClick: () => alert('删除') }, () => '删除'),
                h(YoButton, { type: 'primary', size: 'small', plain: true, onClick: () => test() },()=>'网络测试')
            ]);
        }
    }
])

async function test(){
const value =5;
customRenderData.value[0].value = value;
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
    { title: '姓名', value: '张三' },
    { title: '年龄', value: '28' },
    { title: '性别', value: '男' },
    // 通过 span 控制网格跨度，满行 24，默认 8。这里占两列。
    { title: '手机号码', value: '13800138000', span: 16 }, 
    { title: '邮箱', value: 'zhangsan@example.com', span: 8 }
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
    { title: '账户余额', value: '25000.00' },
    { title: '开户状态', value: '已开户' },
    // isVisiable: false 会隐藏该项
    { title: '备注', value: 'VIP 客户', isVisiable: false }
]);
</script>
```

## 自定义 render

通过 `render` 渲染函数，您可以完全自定义每个字段的展示效果。这在需要展示标签、按钮或复杂交互组件时非常有用。

<YoDetailCol :rowData="customRenderData" />

```vue
<template>
  <YoDetailCol :rowData="customRenderData" />
</template>

<script setup lang="jsx">
import { ref, h } from 'vue';
import { YoTag, YoButton } from 'yo-pc-ui';

const customRenderData = ref([
    {
        title: '状态',
        value: 1, // 1: 正常, 0: 停用, 2: 异常
        render: (cellData) => {
            const val = cellData.value;
            const types = { 1: 'success', 0: 'danger', 2: 'warning' };
            const labels = { 1: '正常', 0: '停用', 2: '异常' };
            return h(YoTag, { 
                type: types[val] || 'info', 
                effect: 'dark' 
            }, () => labels[val]);
        }
    },
    {
        title: '信用评级',
        value: 4.5,
        render: (cellData) => {
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
        render: (cellData) => {
            return h('div', [
                h(YoButton, { type: 'primary', size: 'small', onClick: () => alert('编辑') }, () => '编辑用户'),
                h(YoButton, { type: 'danger', size: 'small', plain: true, onClick: () => alert('删除') }, () => '删除')
            ]);
        }
    },
])
</script>
```

## API

### Props 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rowData` | 详情配置数据，可为一维数组甚至嵌套的二维数组。组件内部会自动 `flat()` 打平解析 | `Array` | `[]` |
| `label_width` | 默认统一的标签文本宽度 (单位: `px`) | `number` | `70` |

### `rowData` 配置项详情

`rowData` 数组内每个对象项所支持的属性如下所列：

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标签文本内容，支持传入包含 HTML 的字符串。 | `string` | — |
| `value` | 需要显示在输入框内的值。 | `any` | — |
| `span` | CSS Grid 的跨占列数。通常网格总计 24 份，比如设为 `16` 即可占据三分之二的宽度。 | `number` | `8` |
| `labelW` | 自定义当前单个标签文本的宽度，如不传则使用组件的 `label_width` 属性。 | `number` \| `string` | — |
| `space` | 自定义当前单个标签距离右侧输入框的间距，对应 `margin-right`。 | `string` | — |
| `isVisiable` | 当前项是否显示，如果显式设为 `false` 则不渲染该项。 | `boolean` | `true` |
| `before` | 渲染函数，插入到该项最前面。函数签名：`(data) => VNode`。 | `function` | — |
| `middle` | 渲染函数，插入在标签与内容框之间。函数签名：`(data) => VNode`。 | `function` | — |
| `after` | 渲染函数，插入到该项最后面。函数签名：`(data) => VNode`。 | `function` | — |
| `render` | 渲染函数，完全替换默认的 `el-input` 展示内容。函数签名：`(data) => VNode`。 | `function` | — |

### 渲染函数扩展说明

组件通过 `before`、`middle`、`after`、`render` 四个渲染函数属性来扩展每个字段项的渲染能力，**这些均为函数属性，不是 Vue 具名插槽**。

| 属性 | 插入位置 | 与 `render` 的关系 |
| --- | --- | --- |
| `before` | 整个字段项的最前面（标签之前） | 可与 `render` 同时使用 |
| `middle` | 标签文本与值内容框之间 | 可与 `render` 同时使用 |
| `after` | 整个字段项的最后面（值内容框之后） | 可与 `render` 同时使用 |
| `render` | 完全替换默认的 `el-input` 显示区域 | 设置后不再渲染默认输入框 |
