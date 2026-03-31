<template>
  <div style="padding: 20px;">
    <YoTitle content="YoQuery Space 属性测试" />

    <div style="margin-bottom: 20px;">
      <p>全局 labelGap: 50px</p>
      <p>姓名: 默认 (50px)</p>
      <p>状态: 自定义 space (10px)</p>
      <p>邮箱: 自定义 space ('100px')</p>
    </div>

    <YoQuery :config="config" :model="form" label-gap="50px" title="测试表单" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { YoQuery, YoTitle } from '../../../packages/src/businessComponents'

const form = reactive({
  name: '',
  status: '',
  email: ''
})

const config = [
  { type: 'input', label: '姓名', prop: 'name' },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    options: [
      { label: '在线', value: '1' },
      { label: '离线', value: '0' }
    ]
  },
  {
    type: 'input',
    label: '邮箱',
    prop: 'email',
    labelWidth: '150px'
  }
]
</script>
