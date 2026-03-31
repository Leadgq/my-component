<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold mb-6">YoUnitInput 测试</h1>

    <div class="mb-8 p-6 border rounded shadow-sm bg-white">
      <h2 class="text-lg font-semibold mb-4">基础用法</h2>
      <div class="flex items-center gap-4 mb-4">
        <YoUnitInput v-model="amount1" v-model:unit="unit1" :options="unitOptions" placeholder="请输入金额"
          style="width: 300px" />
      </div>
      <p class="text-gray-600">
        输入值: <span class="font-mono text-blue-600">{{ amount1 }}</span>,
        单位: <span class="font-mono text-blue-600">{{ unit1 }}</span>
      </p>
    </div>

    <div class="mb-8 p-6 border rounded shadow-sm bg-white">
      <h2 class="text-lg font-semibold mb-4">禁用状态</h2>
      <YoUnitInput v-model="amount1" v-model:unit="unit1" :options="unitOptions" disabled style="width: 300px" />
    </div>

    <div class="mb-8 p-6 border rounded shadow-sm bg-white">
      <h2 class="text-lg font-semibold mb-4">自定义宽度与 Placeholder</h2>
      <YoUnitInput v-model="amount2" v-model:unit="unit2" :options="unitOptions" unit-width="120" unit-placeholder="单位"
        placeholder="请输入数值" style="width: 400px" />
    </div>

    <div class="mb-8 p-6 border rounded shadow-sm bg-white">
      <h2 class="text-lg font-semibold mb-4">插槽支持 (unit-prefix)</h2>
      <YoUnitInput v-model="amount3" v-model:unit="unit3" :options="unitOptions" style="width: 350px">
        <template #unit-prefix>
          <el-icon>
            <PriceTag />
          </el-icon>
        </template>
        <template #unit-empty>
          啥也没有

        </template>
      </YoUnitInput>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PriceTag } from '@element-plus/icons-vue'

const amount1 = ref('')
const unit1 = ref('WAN')

const amount2 = ref('1000')
const unit2 = ref('QWAN')

const amount3 = ref('')
const unit3 = ref('元')

const unitOptions = [
  { label: '元', value: '元' },
  { label: '万元', value: 'WAN' },
  { label: '千万', value: 'QWAN' }
]
</script>
