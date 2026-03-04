<template>
    <YoInput v-model="searchValue" class="search-input" :style="{ width: width }
        " :placeholder="placeholder" v-bind="attrs" v-if="isSearchModel" :type="type">
        <template #prefix>
            <el-icon>
                <Search />
            </el-icon>
        </template>
        <template #suffix>
            <YoButton :type="buttonType" @click="handleSearch" v-bind="attrs">搜索</YoButton>
        </template>
    </YoInput>
    <template v-else>
        <YoButton :type="buttonType" v-bind="attrs" @click="handleAdvancedSearch">
            高级搜索
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </YoButton>
    </template>
</template>

<script setup lang="ts">
import { ref, useAttrs } from "vue"
import { Search, ArrowDown } from "@element-plus/icons-vue"
import { YoInput } from "../input"
import { YoButton } from "../button"
import type { searchProps } from "./search.ts"

const attrs = useAttrs()
const searchValue = ref("")

const emit = defineEmits<{
    (e: 'search', v: string): void
    (e: 'advancedSearch'): void
}>()

const props = withDefaults(defineProps<searchProps>(), {
    width: "240px",
    placeholder: "请输入",
    isSearchModel: true,
    buttonType: "primary",
    type: "text"
})

const handleSearch = () => emit("search", searchValue.value)

const handleAdvancedSearch = () => emit("advancedSearch")
</script>