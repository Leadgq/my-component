<template>
  <div class="container">
    <h1>组件库测试</h1>
    <my-button :value="11" :isShowBadge="true" :max="99" :buttonType="'default'">主要按钮</my-button>
    <my-button :loading="true">加载中按钮</my-button>
    <my-button :loading-icon="Share" :loading="true">加载中按钮</my-button>
    <my-button :loading="true">
      <template #loading-icon>
        <el-icon>
          <Share />
        </el-icon>
      </template>
    </my-button>
  </div>
  <div class="container">
    <my-input v-model="inputValue" @input="handleChange" ref="inputRef">
      <template #prepend>
        <el-select v-model="inputValue" placeholder="请选择">
          <el-option label="选项1" value="1" />
          <el-option label="选项2" value="2" />
          <el-option label="选项3" value="3" />
        </el-select>
      </template>
    </my-input>
  </div>
</template>

<script lang="ts" setup>
import { MyButton } from '../../packages/src/components/button'
import { MyInput } from '../../packages/src/components/input'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'


// 显式指定类型
const inputRef = ref<InstanceType<typeof MyInput>>()

const inputValue = ref()

function handleChange(newValue: string) {
  console.log('inputValue 变化了:', newValue)
}

function focus() {
  inputRef.value?.focus()
}

function clickme() {
  console.log('ok')
}
</script>
