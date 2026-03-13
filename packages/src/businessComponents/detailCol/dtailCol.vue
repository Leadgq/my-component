<template>
    <div class="yo-detail-col">
        <template v-for="(li, ind) in rowData" :key="li.key || ind">
            <div :class="['row_container', props.layout === 'grid' ? 'grid-row' : 'flex-row']">
                <template v-for="(newLi, newIndex) in li" :key="newIndex">
                    <div :class="['col_content_box', (newLi.underLine || props.underLine) ? 'is-underline' : '']"
                        v-if="isShowItem(newLi)" :style="getItemStyle(newLi)">
                        <RenderBefore v-if="newLi.before" :before="newLi.before" :data="newLi" />
                        <span :class="['detail_label', 'align-' + (newLi.labelAlign || props.labelAlign)]"
                            v-show="newLi.title" :style="{
                                width: newLi.labelW ? newLi.labelW : props.label_width + 'px',
                                marginRight: newLi.space ? newLi.space : props.space + 'px'
                            }" v-html="newLi.title"></span>
                        <RenderMiddle v-if="newLi.middle" :middle="newLi.middle" :data="newLi" />
                        <div :class="['value_w', 'align-' + (newLi.valueAlign || props.valueAlign)]">
                            <RenderCell v-if="newLi.render" :render="newLi.render" :data="newLi" />
                            <template v-else>
                                <div v-html="newLi.value"></div>
                            </template>
                        </div>
                        <RenderAfter v-if="newLi.after" :after="newLi.after" :data="newLi" />
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    rowData: {
        type: Array,
        default: () => []
    },
    label_width: {
        type: Number,
        default: 70
    },
    layout: {
        type: String,
        default: 'grid', // 'grid' | 'flex'
        validator: (val) => ['grid', 'flex'].includes(val)
    },
    labelAlign: {
        type: String,
        default: 'start', // 'start' | 'center' | 'end'
        validator: (val) => ['start', 'center', 'end'].includes(val)
    },
    valueAlign: {
        type: String,
        default: 'start', // 'start' | 'center' | 'end'
        validator: (val) => ['start', 'center', 'end'].includes(val)
    },
    underLine: {
        type: Boolean,
        default: false
    },
    space: {
        type: [Number, String],
        default: 12
    }
})

const getItemStyle = (li) => {
    const span = li.span || 8
    if (props.layout === 'grid') {
        return {
            gridColumn: `span ${span}`
        }
    } else {
        // For flex, we map 24-column span to percentage
        return {
            width: `${(span / 24) * 100}%`
        }
    }
}

const isShowItem = (li) => {
    return li?.isVisiable !== false
}


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
