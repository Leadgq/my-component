<template>
  <div class="container">
    <h1>组件库测试</h1>
    <div class="container">
     <MyInput v-model="value" placeholder="请输入" style="width: 240px" clearable/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { MyInput } from '../../packages/src/components/input'

const value = ref('')
</script>
