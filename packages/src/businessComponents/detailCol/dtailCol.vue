<template>
    <div class="yo-detail-col">
        <div class="detail-grid-layout">
            <template v-for="(li, ind) in normalizedRowData" :key="li.key || ind">
                <div class="col_content_box" v-if="isShowItem(li)"
                    :style="{ gridColumn: 'span ' + (!li.span ? 8 : li.span) }">
                    <RenderBefore v-if="li.before" :before="li.before" :data="li" />
                    <span class="detail_label" v-show="li.title" :style="{
                        width: li.labelW ? li.labelW : props.label_width + 'px',
                        marginRight: li.space ? li.space : props.space + 'px'
                    }" v-html="li.title"></span>
                    <RenderMiddle v-if="li.middle" :middle="li.middle" :data="li" />
                    <div class="value_w">
                        <RenderCell v-if="li.render" :render="li.render" :data="li" />
                        <template v-else>
                            <el-input :model-value="li.value" readonly disabled />
                        </template>
                    </div>
                    <RenderAfter v-if="li.after" :after="li.after" :data="li" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElInput } from 'element-plus'
const props = defineProps({
    // 此时外界传入的是一维数组
    rowData: {
        type: Array,
        default: () => []
    },
    label_width: {
        type: Number,
        default: 70
    }
})

const isShowItem = (li) => {
    return li?.isVisiable !== false
}

const normalizedRowData = computed(() => {
    return props.rowData.flat()
})

const RenderBefore = (props) => {
    return props.before(props.data)
}

const RenderMiddle = (props) => {
    return props.middle(props.data)
}

const RenderAfter = (props) => {
    return props.after(props.data)
}

const RenderCell = (props) => {
    return props.render(props.data)
}
</script>
