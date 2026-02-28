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
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import type { ButtonProps, ButtonEmits } from './button.ts'


withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'default',
})

const emit = defineEmits<ButtonEmits>()


const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.my-button {
  // 自定义样式覆盖
  &:hover {
    // 您的样式
  }
}
</style>