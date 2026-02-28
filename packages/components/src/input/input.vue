<script setup lang="ts">
import { useAttrs, useSlots, ref } from 'vue'
import type { InputInstance } from 'element-plus'

const attrs = useAttrs()
const slots = useSlots()
const elInputRef = ref<InputInstance>()

interface MyInputExpose {
  clear: () => void
  select: () => void
  focus: () => void
  blur: () => void
}

const expose: MyInputExpose = {
  clear: () => elInputRef.value?.clear(),
  select: () => elInputRef.value?.select(),
  focus: () => elInputRef.value?.focus(),
  blur: () => elInputRef.value?.blur(),
}

defineExpose(expose)
</script>

<template>
    <el-input v-bind="attrs" ref="elInputRef">
        <template v-for="(_, name) in slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
        </template>
    </el-input>
</template>