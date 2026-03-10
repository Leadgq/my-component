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
        我是内容是属是
      </div>
    </template>
    <div>
      主要内容水水水水
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
</style>