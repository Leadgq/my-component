<template>
    <el-radio-button v-bind="$attrs">
        <slot></slot>
    </el-radio-button>
</template>

<script setup lang="ts">
import { ElRadioButton } from 'element-plus';
</script>