<template>
  <el-button
    :type="type"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :round="round"
    :circle="circle"
    v-bind="$attrs"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import type { ButtonProps } from './button.ts'

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'default'
})
</script>