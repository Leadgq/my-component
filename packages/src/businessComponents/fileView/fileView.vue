<template>
    <ElDrawer v-model="drawer" title="文件预览" size="100%" :z-index="999">
        <component :is="componentSelect" :src="src" style="height: 85vh" @rendered="renderedHandler"
            @error="handleRenderError" :options="options"
            v-if="getFileSuffix === 'docx' || getFileSuffix === 'doc' || getFileSuffix === 'pdf' || getFileSuffix === 'xlsx' || getFileSuffix === 'xls'">
        </component>
    </ElDrawer>
</template>

<script setup>
import { ElDrawer } from "element-plus"
import { computed, ref, defineAsyncComponent } from 'vue'
import '@vue-office/docx/lib/v3/index.css';
import '@vue-office/excel/lib/v3/index.css';

const VueOfficeDocx = defineAsyncComponent(() => import('@vue-office/docx/lib/v3/vue-office-docx.mjs'));
const vueOfficeXlsx = defineAsyncComponent(() => import('@vue-office/excel/lib/v3/vue-office-excel.mjs'));
const vueOfficePdf = defineAsyncComponent(() => import('@vue-office/pdf/lib/v3/vue-office-pdf.mjs'));

const componentSelect = computed(() => {
    if (getFileSuffix.value === 'pdf') {
        return vueOfficePdf
    }
    if (getFileSuffix.value === 'xlsx' || getFileSuffix.value === 'xls') {
        return vueOfficeXlsx
    }
    return VueOfficeDocx
})

const options = ref({
    xls: false, // 预览xlsx文件设为false；预览xls文件设为true
    minColLength: 0, // excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
    minRowLength: 0, // excel最少渲染多少行，如果想实现根据xlsx实际函数渲染，可以将此值设置为0.
    widthOffset: 10, // 如果渲染出来的结果感觉单元格宽度不够，可以在默认渲染的列表宽度上再加 Npx宽
    heightOffset: 10, // 在默认渲染的列表高度上再加 Npx高
    beforeTransformData: (workbookData) => {
        return workbookData;
    }, // 底层通过exceljs获取excel文件内容，通过该钩子函数，可以对获取的excel文件内容进行修改，比如某个单元格的数据显示不正确，可以在此自行修改每个单元格的value值。
    transformData: (workbookData) => {
        return workbookData;
    } // 将获取到的exce
})

const emit = defineEmits(['finish-render', 'error'])

function handleRenderError(e) {
    console.error('vue-office渲染出错:', e)
    emit('error', e)
}

function renderedHandler() {
    emit('finish-render')
}

const drawer = ref(false)

const src = ref()


const downLoadFille = async (url, fileName) => {
    const FileSaver = (await import('file-saver')).default;
    FileSaver.saveAs(url, fileName);
}

const getFileSuffix = computed(() => {
    if (typeof src.value === 'string') {
        return src.value.split('.').pop().toLowerCase()
    }
    return ''
})

const isFile = computed(() => {
    const fileList = [
        'docx',
        'xlsx',
        'pdf',
        'doc',
        'xls'
    ];
    return fileList.includes(getFileSuffix.value)
})


const previewFile = ({ src: source, fileName, down = false }) => {
    console.log('执行了');
    if (!source) {
        throw new Error("文件地址不能为空")
    }
    if (down) {
        downLoadFille(source, fileName)
        return;
    }
    src.value = source
    if (isFile.value) {
        options.value.xls = getFileSuffix.value === 'xls';
        drawer.value = true;
    } else {
        downLoadFille(source, fileName)
    }
}

defineExpose({
    previewFile,
    downLoadFille
})

</script>