<template>
  <YoSearch :width="'300px'" @search="handleSearch" placeholder="请输入222" :type="'default'" plain></YoSearch>
</template>


<script setup>
import { YoSearch } from '../../../packages/src/components'

function handleSearch(val) {
  console.log(val)
}
</script>