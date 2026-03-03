<script setup>
import { ElSelect } from 'element-plus'
import { useAttrs, useSlots } from 'vue'
const attrs = useAttrs()
const slots = useSlots()
</script>

<template>
    <el-select v-bind="attrs">
        <template v-for="(_, name) in slots" #[name]="slotData">
            <template v-if="name === 'default'">
                <slot :name="name" />
            </template>
            <template v-else>
                <slot :name="name" v-bind="slotData" />
            </template>
        </template>
    </el-select>
</template>