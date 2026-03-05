<template>
  <div>
    <YoRadioGroup v-model="radio1"  @change="handleChange">
      <YoRadio value="1" size="large">Option 1</YoRadio>
      <YoRadio value="2" size="large">Option 2</YoRadio>
      <YoRadioButton label="New York" value="New York" />
      <YoRadioButton label="Washington" value="Washington" />
      <YoRadioButton label="Los Angeles" value="Los Angeles" />
      <YoRadioButton label="Chicago" value="Chicago" />
    </YoRadioGroup>
  </div>
</template>


<script setup>
import { YoRadioGroup, YoRadio, YoRadioButton } from '../../../packages/src/components/radio'
import { ref, watch } from 'vue'

const radio1 = ref('1')
watch(()=>radio1.value, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
const handleChange = (val) => {
  console.log(val)
}
</script>
