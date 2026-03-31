<template>
    <div style="width: 500px; padding: 20px;">
        <yo-select v-model="value" :options="options" clearable></yo-select>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { YoSelect } from '../../../packages/src';
const value = ref("")
const options = ref([
    { label: "Option1", value: "1" },
    { label: "Option2", value: "2" },
    { label: "Option3", value: "3" },
])
</script>