<template>
    <div style="padding: 24px; background: #fff; min-height: 100vh;">

        <!-- ① 自动合并：mergeBy -->
        <h3 style="margin-bottom: 12px;">① 自动合并（mergeBy）：id 相同则合并 name / dept 列</h3>
        <YoTable :table-data="mockData" :columns="columns" :merge-by="['name', 'dept']" row-key="id"
            :is-show-pagination="false" border />

        <el-divider />

        <!-- ② 手动合并：spanMethod -->
        <h3 style="margin-bottom: 12px;">② 手动合并（spanMethod）：自定义函数，合并 amount 第1~2行</h3>
        <YoTable :table-data="mockData" :columns="columns2" :span-method="customSpan" row-key="id"
            :is-show-pagination="false" border />

    </div>
</template>

<script setup>
import { YoTable } from '../../../packages/src'

// ── Mock 数据：id 相同的行会被 mergeBy 合并 ──
const mockData = [
    { id: 1, name: '张三', dept: '技术部', role: '前端', amount: 8000, email: 'zhangsan@tech.com', date: '2024-01-01' },
    { id: 1, name: '张三', dept: '技术部', role: '后端', amount: 9000, email: 'zhangsan@tech.com', date: '2024-01-05' },
    { id: 1, name: '张三', dept: '技术部', role: '测试', amount: 7000, email: 'zhangsan@tech.com', date: '2024-01-10' },
    { id: 2, name: '李四', dept: '产品部', role: '产品经理', amount: 12000, email: 'lisi@prod.com', date: '2024-02-01' },
    { id: 2, name: '李四', dept: '产品部', role: 'UI设计', amount: 10000, email: 'lisi@prod.com', date: '2024-02-15' },
    { id: 3, name: '王五', dept: '运营部', role: '运营', amount: 6000, email: 'wangwu@ops.com', date: '2024-03-01' },
]

// ① 自动合并用的列
const columns = [
    { prop: 'id', label: 'ID', width: 80, align: 'center' },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'dept', label: '部门', width: 150 },
    { prop: 'role', label: '职位', width: 150 },
    {
        label: '金额+单位 (moneymultKey)',
        type: 'moneymultKey',
        keys: ['amount', { fix: true, key: '元' }],
        width: 180,
        align: 'right'
    },
    {
        label: '多字段 (multKey)',
        prop: 'email',
        type: 'multKey',
        keys: ['name', 'email'],
        separateSymbol: ' / ',
        width: 250
    },
    {
        label: '日期 (date)',
        type: 'date',
        keys: ['date'],
        format: 'YYYY-MM-DD',
        width: 130
    },
]

// ② 手动合并用的列（同上，演示 spanMethod 自定义）
const columns2 = [
    { prop: 'id', label: 'ID', width: 80, align: 'center' },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'dept', label: '部门', width: 150 },
    { prop: 'role', label: '职位', width: 150 },
    { prop: 'amount', label: '薪资（手动合并前两行）', width: 200, align: 'right' },
]

// ② 手动 span-method：把 amount 列第 0、1 行合并为一个单元格
const customSpan = ({ column, rowIndex }) => {
    if (column.property === 'amount') {
        if (rowIndex === 0) return [2, 1]   // 占 2 行
        if (rowIndex === 1) return [0, 0]   // 被合并，隐藏
    }
    return [1, 1]
}
</script>
