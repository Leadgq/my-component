<template>
    <YoInput v-model="searchValue" class="search-input" :style="{ width: width }
        " :placeholder="placeholder" v-bind="attrs">
        <template #prefix>
            <el-icon>
                <Search />
            </el-icon>
        </template>
        <template #suffix>
            <YoButton type="primary" @click="handleSearch" v-bind="attrs">搜索</YoButton>
        </template>
    </YoInput>
</template>


<script setup lang="ts">
const attrs = useAttrs()
import { YoInput } from "../input"
import { YoButton } from "../button"
import { ref, useAttrs } from "vue"
import { Search } from "@element-plus/icons-vue"
const searchValue = ref("")
const emit = defineEmits(["search"])
const props = defineProps({
    width: {
        type: String,
        default: "240px"
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: "请输入"
    }
})
const handleSearch = () => {
    emit("search", searchValue.value)
}
</script>