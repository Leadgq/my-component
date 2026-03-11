<template>
    <div style="height: 100vh; background: #fff; padding: 20px; box-sizing: border-box;">
        <el-button type="primary" style="margin-bottom: 12px" @click="getSelected">获取选中行</el-button>
        <YoTable ref="tableRef" showCheckbox :getTableFunction="getTableFunction" :columns="columns"
            v-bind="tableOption">
            <template #name="{ data }">
                <YoInput v-model="data.name"></YoInput>
            </template>
        </YoTable>
    </div>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
import { YoTable, YoInput } from '../../../packages/src';

const tableRef = ref(null)

const getSelected = () => {
    const rows = tableRef.value?.getSelection() ?? []
    alert(`已选择 ${rows.length} 行\n${rows.map(r => r.name).join('、')}`)
}

const tableOption = {
    stripe: true,
    border: false,
    height: 700
}

const names = ['张三', '李四', '王五', '赵六', '陈七', '周八', '吴九', '郑十', '冯十一', '褚十二']
const statuses = ['启用', '禁用', '待审核']
const depts = ['技术部', '产品部', '运营部', '市场部', '财务部']

const tableData = ref(
    Array.from({ length: 36 }, (_, i) => ({
        id: i + 1,
        name: names[i % names.length],
        dept: depts[i % depts.length],
        email: `user${i + 1}@example.com`,
        phone: `1380013${String(i).padStart(4, '0')}`,
        amount: (Math.random() * 10000).toFixed(2),
        status: statuses[i % statuses.length],
        date: `2024-${String(Math.floor(i / 3) % 12 + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }))
)

const columns = ref([
    { prop: 'id', label: 'ID', width: 80, align: 'center' },
    { prop: 'name', label: '姓名', width: 150 },
    {
        label: '联系方式',
        children: [
            {
                prop: 'email',
                label: '邮箱地址',
                width: 300,
                showOverflowTooltip: true, render(data) {
                    return <span style="color:red">{data.email}</span>
                }
            },
            { prop: 'phone', label: '手机号', width: 200 },
        ]
    },
    {
        label: '财务信息',
        children: [
            { prop: 'dept', label: '所属部门', width: 400 },
            { prop: 'amount', label: '金额（元）', width: 400, align: 'right' },
        ]
    },
    {
        prop: 'status',
        label: '状态',
        width: 90,
        align: 'center',
        render(row) {
            const colorMap = { '启用': '#42ba5b', '禁用': '#e85050', '待审核': '#ed892f' }
            return (
                <span style={{ color: colorMap[row.status], fontWeight: 600 }}>
                    {row.status}
                </span>
            )
        }
    },
    { prop: 'date', label: '日期', width: 120 },
    {
        prop: 'action',
        label: '操作',
        width: 140,
        fixed: 'right',
        align: 'center',
        render(row) {
            return (
                <div>
                    <el-button type="primary" link size="small" onClick={() => alert(`编辑：${row.name}`)}>编辑</el-button>
                    <el-button type="danger" link size="small" onClick={() => alert(`删除：${row.name}`)}>删除</el-button>
                </div>
            )
        }
    },
])

const getTableFunction = ({ pageNum = 1, pageSize = 10 } = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const total = tableData.value.length
            const start = (pageNum - 1) * pageSize
            const list = tableData.value.slice(start, start + pageSize)
            resolve({ list, total })
        }, 500)
    })
}
</script>