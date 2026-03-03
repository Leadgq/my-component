<template>
  <template v-if="!isShowBadge">
    <el-button :type="type"
      v-bind="$attrs">
      <slot />
    </el-button>
  </template>
  <template v-else>
    <el-badge v-bind="$attrs">
      <el-button :type="buttonType">
        <slot />
      </el-button>
    </el-badge>
  </template>
</template>

<script setup>
import { ElButton, ElBadge } from 'element-plus'
import { useAttrs } from 'vue';
const props = defineProps({
  type:{
    type: String,
    default: 'default'
  },
  isShowBadge: {
    type: Boolean,
    default: false
  },
  buttonType: {
    type: String,
    default: 'primary'
  }
})
</script>
