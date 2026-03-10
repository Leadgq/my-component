<template>
  <btnTest v-if="false"></btnTest>
  <inputTest v-if="false"></inputTest>
  <searchTest v-if="false"></searchTest>
  <titleTest v-if="false"></titleTest>
  <radioTest v-if="false"></radioTest>
  <pictureTest v-if="false"></pictureTest>
  <fileView v-if="false"></fileView>
  <YoContent title="内容标题">
    <template #side>
      <div>
        侧边栏内容
      </div>
    </template>
    <div>
      主要内容
    </div>
  </YoContent>
</template>
<script setup>
import btnTest from "../src/button-test/index.vue"
import inputTest from "../src/input-test/index.vue"
import searchTest from "../src/search/index.vue"
import titleTest from "../src/title-test/index.vue"
import radioTest from "../src/radioTest/index.vue"
import fileView from "../src/fileview/index.vue"
import pictureTest from "../src/picture/index.vue"

import { YoContent } from "../../../component/packages/src/index";
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: fixed;
}
.my-content {
  margin-top: 10px;
  position: relative;
  background-color: #fff;
}

.my-content .my-content__side {
  background-color: #ffffff;
  width: 130px;
  padding: 20px;

  position: absolute;
  bottom: 50px;
  top: 56px;
  left: 50px;
}

.my-content .title {
  background-color: #ffffff;
  margin-top: 10px;
  height: 45px;
  line-height: 45px;
}

.my-content .title h2 {
  font-size: 14px;
  font-weight: bold;
  display: inline;
  color: #365FA4;
  border-left: 2px solid #365FA4;
  padding-left: 20px;
}

.my-content .my-content__main {
  background-color: #ffffff;
  padding: 20px;
}

.my-content .title+.my-content__main {
  padding-top: 0px;
}

.my-content.with-side .my-content__main {
  overflow-x: hidden;
  overflow-y: visible;
  position: absolute;
  bottom: 50px;
  top: 56px;
  right: 50px;
  left: 230px;
}

.my-content.with-side .my-content__main::-webkit-scrollbar {
  display: none;
}
</style>