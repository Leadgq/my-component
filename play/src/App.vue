<template>
  <div class="container">
    <h1>组件库测试</h1>

    <div class="button-row">
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>

    <div class="button-row">
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>

    <div class="button-row">
      <el-button type="primary" disabled>Primary</el-button>
      <el-button type="success" disabled>Success</el-button>
      <el-button type="warning" disabled>Warning</el-button>
      <el-button type="danger" disabled>Danger</el-button>
    </div>




    <div class="button-row">
      <el-button type="primary" plain disabled>Primary</el-button>
      <el-button type="success" plain disabled>Success</el-button>
      <el-button type="warning" plain disabled>Warning</el-button>
      <el-button type="danger" plain disabled>Danger</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { MyInput } from '../../packages/src/components/input'
import { MyButton } from '../../packages/src/components/button'

const disabledTheme = ref('default')
</script>
