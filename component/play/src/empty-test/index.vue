<template>
  <div style="padding: 20px;">
    <h3>默认形态 (使用 emty.png)</h3>
    <div class="demo-block">
      <YoEmpty />
    </div>

    <h3 style="margin-top: 40px;">自定义文字</h3>
    <div class="demo-block">
      <YoEmpty description="这里什么都没有哦" />
    </div>

    <h3 style="margin-top: 40px;">自定义图片大小</h3>
    <div class="demo-block">
      <YoEmpty :image-size="100" />
    </div>

    <h3 style="margin-top: 40px;">插槽用法</h3>
    <div class="demo-block">
      <YoEmpty>
        <el-button type="primary">去添加数据</el-button>
      </YoEmpty>
    </div>
  </div>
</template>

<script setup>
import { YoEmpty, YoButton } from "../../../packages/src/components"
</script>

<style scoped>
.demo-block {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}
</style>
