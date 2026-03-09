<template>
    <div>
        <yo-button type="primary" @click="openPicturePreview">打开图片预览</yo-button>
        <yo-button type="primary" @click="openPicturePreview">打开图片预览</yo-button>
        <yo-button type="primary" @click="openPicturePreview">打开图片预览</yo-button>

        <yo-button type="primary" @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button>
        <yo-button type="primary" @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button> <yo-button type="primary"
            @click="openPicturePreview">打开图片预览</yo-button>
        <yo-table></yo-table>
    </div>
</template>
<script setup>
import { ref } from "vue";

import { usePictureView } from "../../../../component/packages/src/index";
const testRef = ref(null);

const openPicturePreview = () => {
    const { showPicture, showPictures, destroyViewJs } = usePictureView(testRef.value);
    destroyViewJs()
    showPictures([
        {
            src: "https://img0.baidu.com/it/u=3591665277,2616537962&fm=253&app=138&f=JPEG?w=800&h=1333",
        },
        {
            src: "https://img0.baidu.com/it/u=3591665277,2616537962&fm=253&app=138&f=JPEG?w=800&h=1333",
        },
    ], 1);
}
</script>

<style></style>