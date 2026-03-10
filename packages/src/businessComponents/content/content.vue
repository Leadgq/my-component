<template>
    <div class="my-content" :class="{ 'with-side': slots.side }">
        <YoTitle v-if="title != ''" :content="title" titleLevel="1"></YoTitle>
        <div class="my-content__side" v-if="slots.side" v-bind:style="sideStyle">
            <slot name="side"></slot>
        </div>
        <div id="contentMain" class="my-content__main">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { YoTitle } from '../title';
import { useSlots } from 'vue'

const slots = useSlots();
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    sideStyle: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style>
.my-content {
    margin-top: 10px;
    position: relative;
    background-color: #fff;
}

.my-content .my-content__side {
    background-color: #ffffff;
    width: 130px;
    padding: 20px;

    position: absolute;
    bottom: 50px;
    top: 56px;
    left: 50px;
}

.my-content .title {
    background-color: #ffffff;
    margin-top: 10px;
    height: 45px;
    line-height: 45px;
}

.my-content .title h2 {
    font-size: 14px;
    font-weight: bold;
    display: inline;
    color: #365FA4;
    border-left: 2px solid #365FA4;
    padding-left: 20px;
}

.my-content .my-content__main {
    background-color: #ffffff;
    padding: 20px;
}

.my-content .title+.my-content__main {
    padding-top: 0px;
}

.my-content.with-side .my-content__main {
    overflow-x: hidden;
    overflow-y: visible;
    position: absolute;
    bottom: 50px;
    top: 56px;
    right: 50px;
    left: 230px;
}

.my-content.with-side .my-content__main::-webkit-scrollbar {
    display: none;
}
</style>