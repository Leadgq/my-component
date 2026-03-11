<template>
  <!-- <btnTest v-if="false"></btnTest>
  <inputTest v-if="false"></inputTest>
  <searchTest v-if="false"></searchTest>
  <titleTest v-if="false"></titleTest>
  <radioTest v-if="false"></radioTest>
  <pictureTest v-if="false"></pictureTest>
  <fileView v-if="false"></fileView>
  <YoContent title="内容区域" style="margin-bottom: 20px;">
    <template #second>
      <div>第二区域</div>
    </template>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
<div>第一区域</div>
</YoContent> -->
<!-- <YoContent :title="'这是标题'">
    <YoTitle :content="'委托代理人信息'" :title-level="2"></YoTitle>
    <YoTitle :content="'委托代理人信息'" :title-level="2"></YoTitle>
  </YoContent> -->
  <detailColTest v-if="true"></detailColTest>
  <!-- <tableTest v-if="false">
  </tableTest> -->
</template>
<script setup>
import btnTest from "../src/button-test/index.vue"
import inputTest from "../src/input-test/index.vue"
import searchTest from "../src/search/index.vue"
import titleTest from "../src/title-test/index.vue"
import radioTest from "../src/radioTest/index.vue"
import fileView from "../src/fileview/index.vue"
// import pictureTest from "../src/picture/index.vue"
import tableTest from "../src/tableTest/index.vue"
import detailColTest from "../src/detailCol-test/index.vue"
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #ccc;
  position: fixed;
  overflow: auto;
}
</style>