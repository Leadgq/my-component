<template>
  <div>
    <YoRadio v-model="radio1" >
        <el-radio value="1" size="large">Option 1</el-radio>
        <el-radio value="2" size="large">Option 2</el-radio>
    </YoRadio>
  </div>
</template>


<script setup>
import { YoRadio } from '../../../packages/src/components/radio'
import { ref } from 'vue'

const radio1 = ref('1')
</script>

