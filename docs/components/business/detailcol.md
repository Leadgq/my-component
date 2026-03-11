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

另外，还可以配置各项是否可见 `isVisiable`，或是提供自定义行内插槽和 Render 函数。

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
    // type: 'money' 表示此时金额类型的输入框处于只读但没有 disabled 的状态
    { title: '账户余额', value: '25000.00', type: 'money' },
    { title: '开户状态', value: '已开户' },
    // isVisiable: false 会隐藏该项
    { title: '备注', value: 'VIP 客户', isVisiable: false }
]);
</script>
```

## 自定义dender

<YoDetailCol :rowData="customRenderData" />

```vue
<YoDetailCol :rowData="customRenderData" />

<script setup lang="jsx">
import { ref,h } from 'vue';

const customRenderData = ref([
     {
        title: '信用评级',
        value: 4.5,
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
| `isSlot` | 定义是否提供插槽功能，支持的值为 `'before'` \| `'middle'` \| `'after'`，用于声明展示不同位置的命名插槽。 | `string` | — |
| `render` | 支持 Vue 的 JSX Render 函数自定义渲染内容 `(data) => VNode`。使用此函数将替换掉系统自带的默认输入框内容。 | `function` | — |

### Slots 插槽

当 `rowData` 选项中开启了 `isSlot` 属性时，即表示启用了对于某一列特定位置的命名插槽，对应的可插接名称分别是：

| 插槽名 | 说明 |
| --- | --- |
| `before` | 当 `isSlot === 'before'` 时，插入到该项最前面的原生内容中。 |
| `middle` | 当 `isSlot === 'middle'` 时，插入在标签与内容框之间。 |
| `after` | 当 `isSlot === 'after'` 时，插入到该项最后的原生内容中。 |
