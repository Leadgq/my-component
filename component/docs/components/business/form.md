# Form 动态表单组件

`YoForm` 是一个高精度的配置驱动型表单组件，基于 Element Plus 的 `el-form` 进行了深度封装。它支持通过 JSON 配置自动生成栅格布局的表单，并内置了复杂的联动逻辑、动态属性计算以及多种业务组件的集成。

<script setup>
import { reactive, ref } from 'vue'
import '../../../packages/dist/style.css'

const formModel = reactive({
  name: '',
  age: 18,
  type: '1',
  remark: ''
})

const formConfig = [
  { type: 'input', label: '姓名', prop: 'name', required: true },
  { type: 'number', label: '年龄', prop: 'age', span: 1 },
  {
    type: 'select',
    label: '类型',
    prop: 'type',
    options: [
      { label: '类型A', value: '1' },
      { label: '类型B', value: '2' }
    ]
  },
  {
    type: 'input',
    label: '备注',
    prop: 'remark',
    span: 2,
    hidden: (model) => model.type === '2'
  }
]

const formRef = ref(null)

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    console.log('Final Model:', formRef.value.getVisibleValues())
  } catch (err) {
    console.error('Validation Failed')
  }
}
</script>

## 基础用法

通过 `model` 绑定数据对象，`config` 传入字段配置数组。

<div class="demo">
  <YoForm
    ref="formRef"
    :model="formModel"
    :config="formConfig"
    :cols="2"
  />
  <div style="margin-top: 20px; text-align: right;">
    <YoButton type="primary" @click="handleSubmit">提交</YoButton>
  </div>
</div>

```vue
<template>
  <YoForm 
    ref="formRef"
    :model="formModel" 
    :config="formConfig" 
    :cols="2"
  />
</template>

<script setup>
const formModel = reactive({ name: '', type: '1' })

const formConfig = [
  { type: 'input', label: '姓名', prop: 'name', required: true },
  {
            prop: 'remarks',
            label: (model) => model.role === 'vip' ? '核心VIP建议' : '详细备注',
            type: 'input',
            span: (model) => model.role === 'vip' ? 2 : 1,
            props: (model) => ({
                type: 'textarea',
                disabled: model.gender === 'unknown',
                placeholder: model.role === 'vip' ? '请留下您的宝贵建议' : '普通备注不可编辑'
            })
 }
]
</script>
```

### 全部代码

```vue
<template>
    <div class="form-test">
        <h2>YoForm 测试案例 (含验证)</h2>
        <el-card>
            <YoForm ref="formRef" :model="formData" :config="formConfig" label-width="120px" :cols="3"
                :loading="isLoading" >
                <template #customSlot="{ model }">
                    <el-input v-model="model.customSlot" placeholder="请输入备注说明" />
                </template>

                <div class="form-footer">
                    <YoButton type="primary" @click="handleSubmit">提交验证</YoButton>
                    <YoButton @click="handleReset">重置</YoButton>
                    <YoButton @click="handleClear">清除校验</YoButton>
                    <YoButton @click="getVisibleValues">获取可见值</YoButton>
                    <YoButton @click="setValues">设置值</YoButton>
                </div>
            </YoForm>
        </el-card>

        <el-card style="margin-top: 20px;">
            <h3>当前数据模型 (Model State):</h3>
            <pre>{{ formData }}</pre>
        </el-card>

        <div style="margin-top: 20px; color: #666;">
            <p>提示：</p>
            <ul>
                <li>1. "用户姓名" 是必填项。</li>
                <li>2. 当角色切换为 "超级VIP" 时，"VIP 等级" 变为必填项。</li>
                <li>3. 当角色为 "普通用户" 时，即使 "VIP 等级" 有验证规则，也会因为被隐藏而跳过验证。</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { reactive, ref, onMounted, computed } from 'vue'
import { YoMessage, YoButton } from "yo-pc-ui"



const formRef = ref(null)
const formData = reactive({
    name: '',
    role: '',
    vipLevel: '',
    minPrice: 0,
    maxPrice: 0,
    remarks: '',
    customSlot: "",
    gender: '',
    status: '',
    date: "",
    monery: "",
    monery2: "",
    monery2Unit: "",
    fileS: "",
    materialList: []
})


const mockData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                name: '高强',
                role: 'vip',
                vipLevel: 'gold',
                minPrice: 10,
                maxPrice: 20,
                remarks: '这是备注',
                customSlot: "sss",
                gender: 'male',
                status: 'active',
                monery: "YUAN",
                monery2: "100",
                monery2Unit: "WAN",
                fileS: "",
                date: ["2026-03-16", "2026-03-17"]
            })
        }, 2000)
    })
}
const isLoading = ref(false)

const setValues = async () => {
    isLoading.value = true
    const res = await mockData()
    Object.assign(formData, res)
    isLoading.value = false
}
onMounted(() => {
    setValues();
})

const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    vipLevel: [{ required: true, message: '请选择 VIP 等级', trigger: 'change' }],
    minPrice: [{ required: true, message: '请填写最小价格', trigger: 'blur' }],
    maxPrice: [
        { required: true, message: '请填写最大价格', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value === null || value === undefined || value === '') {
                    return callback();
                }
                if (formData.minPrice !== null && value < formData.minPrice) {
                    callback(new Error('最大价格不能小于最小价格'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    gender: [{ required: true, message: '请选择性别', trigger: 'submit' }],
    customSlot: [{ required: true, message: '请填写备注说明', trigger: 'submit' }]
}

const formConfig = ref(
    [
        {
            prop: 'name',
            label: '用户姓名',
            type: 'input',
            placeholder: '请输入姓名',
            required: true,
        },
        {
            prop: "monery2",
            type: "unitInput",
            label: "金额2",
            api: "api/Data/monery",
            unitProp: "monery2Unit",
            keyValue: { value: "value", label: "label" },
        },
        {
            prop: "date",
            type: "date",
            label: "日期",
            props: {
                clearable: true,
                //范围
                type: "daterange",
            }
        },
        {
            prop: "fileS",
            type: "file",
            label: "文件",
            props: {
                uploadType: 3,
                apiUrl: "http://localhost:3000",
                layout: "vertical"
            },
            required: true
        },
        {
            type: 'select',
            prop: "monery",
            api: "api/Data/monery",
            label: "金额",
            props: {
                clearable: true
            },
            keyValue: { value: "value", label: "label" }
        },
        {
            label: '价格区间',
            children: [
                { prop: 'minPrice', type: 'number', props: { placeholder: '最小价格', controls: false } },
                { prop: 'maxPrice', type: 'number', props: { placeholder: '最大价格', controls: false } }
            ]
        },
        {
            prop: 'role',
            label: '用户角色',
            type: 'select',
            options: [
                { label: '普通用户', value: 'user' },
                { label: '管理员', value: 'admin' },
                { label: '超级VIP', value: 'vip' }
            ],
            keyValue: { value: "value", label: "label" },
            props: {
                filterable: true,
                clearable: true
            }
        },
        {
            prop: 'gender',
            label: '性别',
            type: 'select',
            api: (model) => {
                if (model.role === 'vip') {
                    return '/api/Data/GetVipGender'
                }
                return '/api/Data/GetGender'
            },
            hidden: (model) => {
                return model.role === 'admin'
            },
            keyValue: { value: 'value', label: 'label' }
        },
        {
            prop: 'status',
            label: '账号状态',
            type: 'radio',
            props: {
                activeType: 'button'
            },
            options: [
                { label: '激活', value: 'active' },
                { label: '禁用', value: 'disabled' },
                { label: '待审核', value: 'pending' }
            ],
        },
        // 动态联动：只有角色为 vip 时才显示等级选择
        {
            prop: 'vipLevel',
            label: 'VIP 等级',
            type: 'select',
            props: {
                clearable: true
            },
            options: [
                { label: '黄金', value: 'gold' },
                { label: '铂金', value: 'platinum' },
                { label: '钻石', value: 'diamond' }
            ],
            keyValue: { value: "value", label: "label" },
            hidden: (model) => {
                return model.role !== 'vip'
            },
        },
        // 插槽测试
        {
            prop: 'customSlot',
            label: '我是插槽内容',
            isSlot: true,
            required: (model) => model.role === 'admin'
        },
        {
            prop: 'remarks',
            label: (model) => model.role === 'vip' ? '核心VIP建议' : '详细备注',
            type: 'input',
            span: (model) => model.role === 'vip' ? 3 : 1,
            props: (model) => ({
                type: 'textarea',
                disabled: model.gender === 'unknown',
                placeholder: model.role === 'vip' ? '请留下您的宝贵建议' : '普通备注不可编辑'
            })
        },
        {
            prop: "materialList",
            type: "materialFile",
            label: "",
            labelWidth: '0px',
            span: 1,
            props: {
                iconWidth: '36px',
                iconHeight: '36px',
                layout: "vertical",
                fileData: [
                    {
                        "Id": "k25c3g2805rh1142c53082p",
                        "Name": null,
                        "AnncParticipantId": null,
                        "MaterialId": "SubjectQualificationCertificate",
                        "Files": ["1774922137787-687640378"],
                        "AnncAttachId": null,
                        "AttachType": null,
                        "Context": null,
                        "MaterialName": "主体资格证明",
                        "OrderIndex": 2,
                        "MaxCount": 6,
                        readOnly: true,
                        "IsRequired": true,
                        "MaxStep": null,
                        "UploadType": 2,
                        "ExcelTempId": null,
                        "ExcelSignTempId": "",
                        "isUpload": true,
                        "UploadStep": null,
                        "IsTerm": null,
                        "Extension": null,
                        "MaxSize": null,
                        "IsAllowAnonymous": null
                    },
                    {
                        "Id": "k25c3g2805rh1142c53082q",
                        "Name": null,
                        "AnncParticipantId": null,
                        "MaterialId": "OtherCertificate",
                        "Files": [],
                        "AnncAttachId": null,
                        "AttachType": null,
                        "Context": null,
                        "MaterialName": "其他证明材料",
                        "OrderIndex": 3,
                        "MaxCount": 10,
                        "IsRequired": true,
                        "MaxStep": null,
                        "UploadType": 1,
                        "ExcelTempId": null,
                        "ExcelSignTempId": "",
                        "isUpload": true,
                        "UploadStep": null,
                        "IsTerm": null,
                        "Extension": null,
                        "MaxSize": null,
                        "IsAllowAnonymous": null
                    }
                ]
            }
        },
    ]
)

const handleClear = () => {
    formRef.value?.clearValidate()
}

const handleSubmit = async () => {
    if (!formRef.value) return
    try {
        await formRef.value.validate()
        YoMessage.success('验证通过，提交成功！')
        console.log('Form Data:', formData)
    } catch (error) {
        YoMessage.error('表单验证失败，请检查输入')
        console.error('Validation Error:', error)
    }
}

const handleReset = () => {
    formRef.value?.resetFields()
    formData.role = 'user'
}

const getVisibleValues = () => {
    console.log('Visible Values:', formRef.value.getVisibleValues())
}
</script>

```

---

## 核心特性

### 栅格布局控制

组件默认采用 `display: grid` 布局，通过 `cols` 设置总列数，单个字段可以通过 `span` 设置占用列数。

- **`cols`**: 表单整体分列数（默认 3）。
- **`span`**: 该字段占用的栅格数（支持固定数值或函数动态计算）。

### 动态属性 (Function API)

`label`, `required`, `hidden`, `span` 等关键属性均支持传入函数。函数接收当前 `model` 作为参数，从而实现复杂的表单联动。

```javascript
{
  label: (model) => model.type === '1' ? '个人姓名' : '公司名称',
  hidden: (model) => model.status === 'disabled',
  required: (model) => !!model.name
}
```

### 联动与数据恢复

当一个字段通过 `hidden` 逻辑被隐藏时，`YoForm` 会自动暂存其当前值并将其在 `model` 中重置。当字段重新显示时，会自动恢复之前的值。

### 过滤提交数据

通过 `getVisibleValues()` 方法可以获取仅包含「当前可见字段」的数据对象，这在处理包含大量联动隐藏字段的表单提交时非常有用。

---

## API

### Form Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 表单绑定数据对象 | `Object` | — |
| `config` | 核心字段配置数组 | `Array` | `[]` |
| `cols` | 栅格布局总列数 | `Number` | `3` |
| `labelWidth` | 标签宽度 | `String`/`Number`| `'auto'` |
| `labelGap` | 标签与控件的间距 | `String`/`Number`| `'12px'` |
| `xGap` | 栅格水平间距 | `String`/`Number`| `'41px'` |
| `yGap` | 栅格垂直间距 | `String`/`Number`| `'26px'` |
| `loading` | 是否处于加载/编辑模式（用于暂存/恢复数据基准） | `Boolean` | `false` |

### Config Item 配置项

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| `prop` | 绑定的数据字段名 | `String` |
| `label` | 标签文本（支持 `String` 或 `(model) => String`） | `String`/`Function` |
| `type` | 组件类型（见下文类型列表） | `String` |
| `span` | 占用栅格数（支持 `Number` 或 `(model) => Number`） | `Number`/`Function` |
| `isSlot` | 是否使用具名插槽渲染 | `Boolean` |
| `required` | 是否必填（支持 `Boolean` 或 `(model) => Boolean`） | `Boolean`/`Function` |
| `hidden` | 是否隐藏（支持 `Boolean` 或 `(model) => Boolean`） | `Boolean`/`Function` |
| `render` | 自定义渲染函数 `(model, item) => VNode` | `Function` |
| `rules` | 字段校验规则（优先级高于 `required`） | `Array`/`Object` |
| `props` | 传递给内部组件的属性（支持对象或 `(model) => Object`） | `Object`/`Function` |
| `events` | 传递给内部组件的事件 | `Object` |
| `options`| 选项数据（针对 `select`, `radio`） | `Array`/`Function` |
| `api` | 自动请求数据的 API 地址（针对业务组件） | `String`/`Function` |

### 支持的组件类型 (`type`)

- `input`: 输入框
- `select`: 下拉选择
- `date`: 日期选择器
- `number`: 数字输入框
- `switch`: 开关
- `radio`: 单选组
- `file`: 附件上传 (`YoFile`)
- `image`: 图片展示 (`YoImg`)
- `unitInput`: 带单位输入框 (`YoUnitInput`)
- `groupTitle`: 组标题 (`YoTitle`)
- `group`: 组容器 (`YoContent`)

---

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `validate()` | 触发全表单校验 | — |
| `resetFields()` | 重置表单 | — |
| `getVisibleValues()`| **核心方法**：只获取当前可见字段的值 | — |
| `clearValidate()`| 清除校验信息 | — |
| `scrollToField()`| 滚动至指定字段 | `(prop: String)` |
