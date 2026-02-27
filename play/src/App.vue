<template>
  <div class="container">
    <h1>组件库测试</h1>
    <my-button type="success" @click="clickme" >主要按钮</my-button>
    <my-button type="success">成功按钮</my-button>
    <my-button type="danger">危险按钮</my-button>

    <my-button size="small">小按钮</my-button>
    <my-button size="large">大按钮</my-button>
  </div>
</template>

<script lang="ts" setup>
import { MyButton } from '../../packages/components'

function clickme() {
  console.log('ok')
}
</script>
<style scoped>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
