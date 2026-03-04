<template>
  <div>
    <YoSearch :width="'300px'" @search="handleSearch" placeholder="请输入222"></YoSearch>
    <hr>
    <YoSearch :width="'300px'" @search="handleSearch" placeholder="请输入222" plain></YoSearch>
    <hr>
    <YoSearch :width="'300px'" @search="handleSearch" placeholder="测试" :type="'danger'"></YoSearch>
    <hr>
    <YoSearch :width="'300px'" @search="handleSearch" placeholder="测试" type="number" :buttonType="'danger'"></YoSearch>
    <hr>
    <YoSearch :width="'300px'" @search="handleSearch" placeholder="测试" type="number" :buttonType="'danger'" disabled>
    </YoSearch>
    <hr>
    <YoSearch :isSearchModel="false" @advanced-search="handleAdvancedSearch"></YoSearch>
    <YoSearch :isSearchModel="false" @advanced-search="handleAdvancedSearch" :buttonType="'danger'"></YoSearch>
    <YoSearch :isSearchModel="false" @advanced-search="handleAdvancedSearch" :buttonType="'danger'" plain></YoSearch>

  </div>
</template>


<script setup>
import { YoSearch } from '../../../packages/src/components'

function handleSearch(val) {
  console.log(val)
}
function handleAdvancedSearch() {
  console.log("高级搜索")
}
</script>
