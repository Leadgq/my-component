<template>
  <el-button
    :type="type"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :round="round"
    :circle="circle"
    class="my-button"
    v-bind="$attrs"
    @click="handleClick"
    ref="myButtonRef"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import type { ButtonProps, ButtonEmits } from './button.ts'
import {  onMounted, useTemplateRef,getCurrentInstance } from 'vue';

const myButtonRef = useTemplateRef<typeof ElButton>("myButtonRef")

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'default',
})

const emit = defineEmits<ButtonEmits>()

const instance = getCurrentInstance();

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
onMounted(()=>{
  const entires = Object.entries(myButtonRef.value!)
  for (const [key,value] of entires) {
    console.log(key,value)
  }
})
</script>

<style lang="scss" scoped>
.my-button {
  // 自定义样式覆盖
  &:hover {
    // 您的样式
  }
}
</style>