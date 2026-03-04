<template>
    <div class="input-test-container">
        <h1>Input 组件测试</h1>

        <!-- 基本输入测试 -->
        <div class="test-section">
            <h2>1. 基本输入</h2>
            <YoInput v-model="basicInput" placeholder="请输入内容" />
            <p>输入值: {{ basicInput }}</p>
        </div>

        <!-- 禁用状态测试 -->
        <div class="test-section">
            <h2>2. 禁用状态</h2>
            <YoInput v-model="disabledInput" placeholder="禁用输入框" :disabled="true" />
            <p>输入值: {{ disabledInput }}</p>
        </div>

        <!-- 只读状态测试 -->
        <div class="test-section">
            <h2>3. 只读状态</h2>
            <YoInput v-model="readonlyInput" placeholder="只读输入框" :readonly="true" />
            <p>输入值: {{ readonlyInput }}</p>
        </div>

        <!-- 占位符测试 -->
        <div class="test-section">
            <h2>4. 占位符</h2>
            <YoInput v-model="placeholderInput" placeholder="请输入您的姓名" />
        </div>

        <!-- 长度限制测试 -->
        <div class="test-section">
            <h2>5. 长度限制</h2>
            <YoInput v-model="lengthInput" placeholder="最多输入10个字符" :maxlength="10" show-word-limit />
            <p>输入值: {{ lengthInput }}</p>
        </div>

        <!-- 密码模式测试 -->
        <div class="test-section">
            <h2>6. 密码模式</h2>
            <YoInput v-model="passwordInput" type="password" placeholder="请输入密码" show-password />
            <p>输入值: {{ passwordInput }}</p>
        </div>

        <!-- 清除按钮测试 -->
        <div class="test-section">
            <h2>7. 清除按钮</h2>
            <YoInput v-model="clearableInput" placeholder="可清除输入框" clearable />
            <p>输入值: {{ clearableInput }}</p>
        </div>

        <!-- 事件处理测试 -->
        <div class="test-section">
            <h2>8. 事件处理</h2>
            <YoInput v-model="eventInput" placeholder="测试事件" @input="handleInput" @focus="handleFocus"
                @blur="handleBlur" />
            <p>输入值: {{ eventInput }}</p>
            <p>事件日志: {{ eventLog }}</p>
        </div>

        <!-- 方法调用测试 -->
        <div class="test-section">
            <h2>9. 方法调用</h2>
            <YoInput ref="inputRef" v-model="methodInput" placeholder="测试方法调用" />
            <div class="button-group">
                <button @click="handleClear">清除</button>
                <button @click="handleSelect">全选</button>
                <button @click="handleFocusMethod">聚焦</button>
                <button @click="handleBlurMethod">失焦</button>
            </div>
            <p>输入值: {{ methodInput }}</p>
        </div>

        <!-- 带前缀和后缀的输入框 -->
        <div class="test-section">
            <h2>10. 带前缀和后缀</h2>
            <YoInput v-model="prefixSuffixInput" placeholder="带前缀和后缀">
                <template #prefix>
                    <span>@</span>
                </template>
                <template #suffix>
                    <span>.com</span>
                </template>
            </YoInput>
            <p>输入值: {{ prefixSuffixInput }}</p>
        </div>
        <!-- 大小测试 -->
        <div class="test-section">
            <h2>11. 大小</h2>
            <YoInput size="small" placeholder="Please Input" />
            <YoInput size="medium" placeholder="Please Input" />
            <YoInput size="large" placeholder="Please Input" />

        </div>
        <!-- 文本域测试 -->
        <div class="test-section">
            <h2>12. 文本域</h2>
            <YoInput v-model="textarea" maxlength="30" style="width: 240px" placeholder="Please input" show-word-limit
                type="textarea" />
            <p>输入值: {{ textarea }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { YoInput } from '../../../packages/src/components/input'
// 基本输入
const basicInput = ref('')

// 文本域
const textarea = ref('')



// 禁用状态
const disabledInput = ref('禁用状态')

// 只读状态
const readonlyInput = ref('只读状态')

// 占位符
const placeholderInput = ref('')

// 长度限制
const lengthInput = ref('')

// 密码模式
const passwordInput = ref('')

// 清除按钮
const clearableInput = ref('可清除')

// 事件处理
const eventInput = ref('')
const eventLog = ref('')

const handleInput = (value: string) => {
    eventLog.value = `Input事件: ${value}`
}

const handleFocus = () => {
    eventLog.value = 'Focus事件'
}

const handleBlur = () => {
    eventLog.value = 'Blur事件'
}

// 方法调用
const inputRef = ref()
const methodInput = ref('测试方法')

const handleClear = () => {
    inputRef.value?.clear()
}

const handleSelect = () => {
    inputRef.value?.select()
}

const handleFocusMethod = () => {
    inputRef.value?.focus()
}

const handleBlurMethod = () => {
    inputRef.value?.blur()
}

const prefixSuffixInput = ref('')
</script>

<style scoped>
.input-test-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.test-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
}

.test-section h2 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
    color: #303133;
}

.button-group {
    margin-top: 10px;
}

.button-group button {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
}

.button-group button:hover {
    border-color: #409eff;
    color: #409eff;
}

p {
    margin-top: 10px;
    color: #606266;
}
</style>
