<template>
    <div class="yo-title flex align-center" :class="`yo-title-level-${level}`">
        <span class="title-flag" v-if="level === 1"></span>
        {{ content }}
    </div>
</template>
<script setup lang="ts">
import { YoTitleProps } from './title'
import { computed } from 'vue'
const props = withDefaults(defineProps<YoTitleProps>(), {
    content: '',
    titleLevel: 1
})
const level = computed(() => Number(props.titleLevel))
</script>
