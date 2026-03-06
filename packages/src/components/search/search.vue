<template>
    <YoInput v-model="searchValue" class="search-input" :style="{ width: width }
        " :placeholder="placeholder" v-bind="attrs" v-if="isSearchModel" :type="type">
        <template #prefix>
            <el-icon>
                <Search />
            </el-icon>
        </template>
        <template #suffix>
            <YoButton :type="buttonType" @click="handleSearch" v-bind="attrs">
                <template v-if="slots.default">
                    <slot name="default" />
                </template>
                <template v-else>
                    搜索
                </template>
            </YoButton>
        </template>
    </YoInput>
    <template v-else>
        <YoButton :type="buttonType" v-bind="attrs" @click="handleAdvancedSearch">
            <template v-if="slots.default">
                <slot name="default" />
            </template>
            <template v-else>
                高级搜索
            </template>
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </YoButton>
    </template>
</template>

<script setup>
import { ref, useAttrs, useSlots } from "vue"
import { Search, ArrowDown } from "@element-plus/icons-vue"
import { ElIcon } from "element-plus"
import { YoInput } from "../input"
import { YoButton } from "../button"
const attrs = useAttrs()
const slots = useSlots()
const searchValue = ref("")
defineProps({
    width: {
        type: String,
        default: "240px"
    },
    placeholder: {
        type: String,
        default: "请输入"
    },
    isSearchModel: {
        type: Boolean,
        default: true
    },
    buttonType: {
        type: String,
        default: "primary"
    },
    type: {
        type: String,
        default: "text"
    },
})

const handleSearch = () => emit("search", searchValue.value)

const handleAdvancedSearch = () => emit("advancedSearch")
</script>