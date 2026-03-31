<template>
  <div class="form-test">
    <h2>YoForm 测试案例 (含验证)</h2>
    <el-card>
      <YoForm ref="formRef" :model="formData" :config="formConfig" :rules="rules" label-width="120px" :cols="4">
        <template #customSlot="{ model }">
          <el-input v-model="model.customSlot" placeholder="请输入备注说明" />
        </template>

        <div class="form-footer">
          <el-button type="primary" @click="handleSubmit">提交验证</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button @click="handleClear">清除校验</el-button>
          <el-button @click="getVisibleValues">获取可见值</el-button>
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

<script setup>
import { reactive, ref } from 'vue'
import { ElCard, ElButton, ElAlert, ElMessage } from 'element-plus'



const formRef = ref(null)
const formData = reactive({
  name: '',
  role: 'user',
  vipLevel: '',
  minPrice: null,
  maxPrice: null,
  remarks: '这是备注',
  customSlot: "sss",
  gender: '',
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

const formConfig = [
  {
    prop: 'name',
    label: '用户姓名',
    type: 'input',
    placeholder: '请输入姓名',
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
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'radio',
    hidden: (model) => {

      return model.role === 'admin'
    },
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '未知', value: 'unknown' }
    ],
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
    options: [
      { label: '黄金', value: 'gold' },
      { label: '铂金', value: 'platinum' },
      { label: '钻石', value: 'diamond' }
    ],
    hidden: (model) => {
      console.log(model)
      return model.role !== 'vip'
    },
  },
  // 插槽测试
  {
    prop: 'customSlot',
    label: '备注说明',
    isSlot: true,
  },
  {
    prop: 'remarks',
    label: '详细备注',
    type: 'input',
    props: {
      type: 'textarea',
      disabled: true
    },
  }
]

const handleClear = () => {
  formRef.value?.clearValidate()
}

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    ElMessage.success('验证通过，提交成功！')
    console.log('Form Data:', formData)
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入')
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

<style scoped>
.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
