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

## 测试案例

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

                <template #footer>
                    <YoButton type="primary" @click="handleSubmit">提交验证</YoButton>
                    <YoButton @click="handleReset">重置</YoButton>
                    <YoButton @click="handleClear">清除校验</YoButton>
                    <YoButton @click="getVisibleValues">获取可见值</YoButton>
                    <YoButton @click="setValues">设置值</YoButton>
                </template>

                <YoTable></YoTable>
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
import { YoMessage, YoButton, YoTable } from "yo-pc-ui"



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
                        "Files": [],
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
