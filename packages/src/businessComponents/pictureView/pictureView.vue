<template>
    <div ref="viewer">
        <img :src="viewSrc" v-if="showSingle" style="display: none;" />
        <img v-else v-for="(item, index) in viewItems" :key="index" :src="item.src" :data-viewer-id="item.id"
            :alt="`Image ${index + 1}`" style="display: none;" />
    </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

let singleImgViewer = null;
const viewer = ref(null);
const viewItems = ref([]);
const viewSrc = ref('');
let container = null;
const showSingle = ref(true);

const initViewJs = async (option = {}, prevIndex = 0) => {
    const { container: customContainer } = option || {};
    await nextTick();
    container = viewer.value;
    singleImgViewer = new Viewer(container, {
        container: customContainer || container,
        initialViewIndex: prevIndex,
        navbar: true,
        transition: true,
        zIndex: 3000,
        hidden: () => singleImgViewer.destroy(),
        ...option
    });
};

const destroyViewJs = () => {
    singleImgViewer && singleImgViewer.destroy();
    singleImgViewer = null;
};

const prevImage = (item) => {
    viewSrc.value = item;
    nextTick(() => {
        singleImgViewer && singleImgViewer.update();
        singleImgViewer && singleImgViewer.show();
    });
};

const showPictures = (items, prevIndex = 0) => {
    showSingle.value = false;
    viewItems.value = items.map((item, index) => ({
        id: `img-${Date.now()}-${index}`,
        src: item.src
    }));
    initViewJs({}, prevIndex);
    nextTick(() => {
        singleImgViewer && singleImgViewer.update();
        singleImgViewer && singleImgViewer.show();
    });
};

const showPicture = (item) => {
    if (!item.src) {
        throw new Error('you should pass in a object that contain src');
    }
    destroyViewJs();
    showSingle.value = true;
    const { src, option } = item;
    initViewJs(option);
    prevImage(src);
};

onBeforeUnmount(() => {
    destroyViewJs();
});

// 导出方法
defineExpose({
    showPictures,
    showPicture,
    destroyViewJs
});
</script>