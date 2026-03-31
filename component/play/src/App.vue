<template>
  <tableTest v-if="false"></tableTest>
  <queryTest v-if="false"></queryTest>
  <detailColTest v-if="false"></detailColTest>
  <gridTest v-if="false"></gridTest>
  <selectTest v-if="false"></selectTest>
  <compositeTest v-if="false"></compositeTest>
  <querySpaceTest v-if="false"></querySpaceTest>
  <unitInputTest v-if="false"></unitInputTest>
  <emptyTest v-if="false"></emptyTest>
  <formTest v-if="false"></formTest>
  <mergeTest v-if="true"></mergeTest>
</template>
<script setup>
import btnTest from "../src/button-test/index.vue"
import inputTest from "../src/input-test/index.vue"
import searchTest from "../src/search/index.vue"
import titleTest from "../src/title-test/index.vue"
import radioTest from "../src/radioTest/index.vue"
import fileView from "../src/fileview/index.vue"
import pictureTest from "../src/picture/index.vue"
import tableTest from "../src/tableTest/index.vue"
import queryTest from "../src/query-test/index.vue"
import detailColTest from "../src/detailCol-test/index.vue"
import gridTest from "../src/grid-test/index.vue"
import selectTest from "../src/select-test/index.vue"
import compositeTest from "../src/composite-test/index.vue"
import querySpaceTest from "../src/query-space-test/index.vue"
import unitInputTest from "../src/unitInput-test/index.vue"
import emptyTest from "../src/empty-test/index.vue"
import formTest from "../src/form-test/formTest.vue"
import mergeTest from "../src/merge-test/index.vue"
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