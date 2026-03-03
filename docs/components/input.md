# Input 输入框

基于 Element Plus 的自定义输入框组件

## 基础用法

<script setup>
import { ref } from 'vue'
import { MyInput, MyButton } from '../../packages/dist/index.es.js'
import '../../packages/dist/style.css'
const inputValue = ref('')

const inputValue2 = ref('')
const inputValue3 = ref('')

const  inputRef = ref(null)

function clearInput2() {
    inputValue2.value = ''
}
</script>

<div class="demo">
    <MyInput v-model="inputValue"  style="width: 240px" ></MyInput>
</div>

```vue
<template>
  <MyInput v-model="inputValue" @input="handleChange" ref="inputRef"></MyInput>
</template>
<script setup>
import { MyInput } from "@will-component";
</script>
```

## 占位符

<div class="demo">
    <MyInput v-model="inputValue" placeholder="请输入" style="width: 240px" ></MyInput>
</div>

```vue
<template>
  <MyInput v-model="inputValue" placeholder="请输入" ref="inputRef"></MyInput>
</template>
```

## 清空

<div class="demo">
    <MyInput v-model="inputValue2" placeholder="请输入" style="width: 240px" clearable></MyInput>
    <MyButton type="primary" @click="clearInput2">清空</MyButton>
</div>

```vue
<template>
  <MyInput v-model="inputValue" placeholder="请输入" ref="inputRef"></MyInput>
  <MyButton type="primary" @click="clearInput2">清空</MyButton>
</template>
<script setup>
import { MyInput, MyButton } from "@will-component";
</script>
```

## 密码

<div class="demo">
    <MyInput v-model="inputValue3" placeholder="请输入" style="width: 240px" show-password></MyInput>
</div>

```vue
<template>
  <MyInput
    v-model="inputValue"
    placeholder="请输入"
    style="width: 240px"
    show-password
  ></MyInput>
</template>
<script setup>
import { MyInput } from "@will-component";
</script>
```
## 禁用

<div class="demo">
    <MyInput v-model="inputValue" placeholder="请输入" style="width: 240px" disabled></MyInput>
</div>

```vue
<template>
  <MyInput
    v-model="inputValue"
    placeholder="请输入"
    style="width: 240px"
    disabled
  ></MyInput>
</template>
<script setup>
import { MyInput } from "@will-component";
</script>
```