<template>
  <div class="container">
    <h1>组件库测试</h1>
    <div class="container">
     <MyInput v-model="value" placeholder="请输入" style="width: 240px" clearable/>
     <MyButton type="primary" disabled>主要按钮</MyButton>
     <MyButton type="default" disabled>默认按钮</MyButton>
     <MyButton type="success" disabled>成功按钮</MyButton>
     <MyButton type="danger" disabled>危险按钮</MyButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { MyInput } from '../../packages/src/components/input'
import { MyButton } from '../../packages/src/components/button'

const value = ref('')
</script>
