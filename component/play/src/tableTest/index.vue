<template>
    <div style="height: 100vh; background: #fff; padding: 20px; box-sizing: border-box;">
        <el-button type="primary" style="margin-bottom: 12px" @click="getSelected">获取选中行</el-button>
        <YoTable ref="tableRef" showCheckbox api="https://jsonplaceholder.typicode.com/users" :columns="columns"
            v-bind="tableOption">
            <template #expandRow="{ data }">
                <div style="padding: 20px; background: #fafafa; border-radius: 4px;">
                    <h3 style="margin-top: 0;">详细信息</h3>
                    <p><strong>ID:</strong> {{ data.id }}</p>
                    <p><strong>姓名:</strong> {{ data.name }}</p>
                    <p><strong>部门:</strong> {{ data.dept }}</p>
                    <p><strong>邮箱:</strong> {{ data.email }}</p>
                    <p><strong>手机号:</strong> {{ data.phone }}</p>
                </div>
            </template>
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
    height: 700,
    defaultSort: { prop: 'id', order: 'descending' }
}

// 测试代码：原本的 `names = ['', '']` 这种静态 mock 可以移除了，
// 不过为了 columns 有意义，我们仍然使用原先的 column，但是这里因为从接口返回
// 实际返回的数据字段名不一样，我们临时改一下字段映射（或者留着，展示空白，用 console 观察接口是否发出了即可）

const columns = ref([
    { type: 'expand', prop: 'expandRow', isSlot: true, width: 50 },
    { prop: 'id', label: 'ID', width: 80, align: 'center' },
    { prop: 'name', label: '姓名', width: 150, isSlot: true },
    {
        label: '联系方式',
        children: [
            {
                prop: 'email',
                label: '邮箱地址',
                width: 300,
                showOverflowTooltip: true,
                filters: [
                    {
                        text: '启用',
                        value: '启用'
                    },
                    {
                        text: '禁用',
                        value: '禁用'
                    },
                    {
                        text: '待审核',
                        value: '待审核'
                    }
                ],
                render(data) {
                    return <span style="color:red">{data.email}</span>
                }
            },
            { prop: 'phone', label: '手机号', width: 200 },
        ]
    },
    {
        label: '财务信息',
        children: [
            {
                prop: 'dept',
                label: '所属部门',
                width: 400,
                sortable: true, formatter: (v) => {
                    return v.status
                }
            },
            { prop: 'amount', label: '金额（元）', width: 400, align: 'right' },
        ]
    },
    {
        label: '多字段 (multKey)',
        type: 'multKey',
        keys: ['name', 'email'],
        separateSymbol: ' / ',
        width: 250
    },
    {
        label: '金额+单位 (moneymultKey)',
        type: 'moneymultKey',
        keys: ['amount', { fix: true, key: '元' }],
        width: 200,
        align: 'right'
    },
    {
        label: '多日期 (date)',
        type: 'date',
        keys: ['date', 'date'],
        format: 'YYYY-MM-DD',
        separateSymbol: ' - ',
        width: 250
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
</script>