<template>
    <el-radio-group v-bind="$attrs">
        <slot></slot>
    </el-radio-group>
</template>


<script setup >
import { ElRadioGroup } from  "element-plus"
</script>