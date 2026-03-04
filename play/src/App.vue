<template>
  <div class="container">
    <h1>组件库测试</h1>
    <div class="container">


      <MyButton type="default">朴素默认</MyButton>
      <MyButton type="default" disabled>朴素禁用</MyButton>
      <MyButton type="default" disableTheme="success">朴素禁止成功</MyButton>
      <MyButton type="default" disableTheme="danger">朴素禁止危险</MyButton>
      <MyButton type="default" disableTheme="warning">朴素禁止警告</MyButton>

    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { MyInput } from '../../packages/src/components/input'
import { MyButton } from '../../packages/src/components/button'

const value = ref('')
</script>
