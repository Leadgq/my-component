<template>
    <div class="yo-detail-col">
        <div class="detail-grid-layout">
            <template v-for="(li, ind) in normalizedRowData" :key="li.key || ind">
                <div class="col_content_box" v-if="isShowItem(li)"
                    :style="{ gridColumn: 'span ' + (!li.span ? 8 : li.span) }">
                    <slot v-if="li.isSlot && li.isSlot === 'before'" name="before"></slot>
                    <span class="detail_label" v-show="li.title" :style="{
                        width: li.labelW ? li.labelW : props.label_width + 'px',
                        marginRight: li.space
                    }" v-html="li.title"></span>
                    <slot v-if="li.isSlot && li.isSlot === 'middle'" name="middle"></slot>
                    <div class="value_w">
                        <RenderCell v-if="li.render" :render="li.render" :data="li" />
                        <template v-else>
                            <el-input :model-value="li.value" readonly disabled />
                        </template>
                    </div>
                    <slot v-if="li.isSlot && li.isSlot === 'after'" name="after"></slot>
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

const RenderCell = (props) => {
    return props.render(props.data)
}
</script>
