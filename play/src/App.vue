<template>
  <div class="container">
    <h1>组件库测试</h1>
    <my-button type="primary" @click="clickme">主要按钮</my-button>
    <my-button type="success" @click="clickme">成功按钮</my-button>
    <my-button type="danger" @click="clickme">危险按钮</my-button>
    <my-button size="small" @click="clickme">小按钮</my-button>
    <my-button size="large" @click="clickme">大按钮</my-button>
  </div>
  <div class="container">
    <my-input v-model="inputValue"  @input="handleChange" ref="inputRef">
      <template #prepend>
        <el-select v-model="inputValue" placeholder="请选择">
          <el-option label="选项1" value="1" />
          <el-option label="选项2" value="2" />
          <el-option label="选项3" value="3" />
        </el-select>
      </template>
      <template #append>
        <el-button type="success" @click="clear">追加按钮</el-button>
      </template>
    </my-input>
  </div>
</template>

<script lang="ts" setup>
import { MyButton } from '../../packages/components'
import { MyInput } from '../../packages/components'
import { ref } from 'vue'

// 显式指定类型
const inputRef = ref<InstanceType<typeof MyInput>>()

const inputValue = ref()

function handleChange(newValue: string) {
  console.log('inputValue 变化了:', newValue)
}

function clear() {
  console.log(inputRef.value?.clear());
}

function clickme() {
  console.log('ok')
}
</script>
<style scoped>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
