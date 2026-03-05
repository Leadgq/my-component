<template>
  <btnTest v-if="true"></btnTest>
  <inputTest v-if="false"></inputTest>
  <searchTest v-if="false"></searchTest>
  <titleTest v-if="false"></titleTest>
  <radioTest v-if="true"></radioTest>
</template>
<script setup>
import btnTest from "../src/button-test/index.vue"
import inputTest from "../src/input-test/index.vue"
import searchTest from "../src/search/index.vue"
import titleTest from "../src/title-test/index.vue"
import radioTest from "../src/radioTest/index.vue"
</script>