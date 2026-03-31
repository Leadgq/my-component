<template>
    <div style="padding: 100px; width: 600px;">
        <h3 style="margin-bottom: 20px;">输入框带单位选择 (Composite)</h3>
        <YoInput v-model="inputVal" placeholder="请输入保证金金额">
            <template #append>
                <YoSelect v-model="selectVal" :options="unitOptions" style="width: 100px;" />
            </template>
        </YoInput>

        <div style="margin-top: 40px;">
            <p>Input Value: {{ inputVal }}</p>
            <p>Select Value: {{ selectVal }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { YoInput, YoSelect } from '../../../packages/src'

const inputVal = ref('')
const selectVal = ref('wan')

const unitOptions = [
    { label: '元', value: 'yuan' },
    { label: '万元', value: 'wan' },
    { label: '千万', value: 'qianwan' }
]
</script>
