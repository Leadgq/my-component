<template>
    <div>
        <YoGrid :is-cache="true" cache-key="grid-test-cache" v-model:isShowSuperSearchArea="showSuperSearch" :query="{
            config: queryConfig,
            model: searchForm,
            quickSearchKey: 'quickSearch',
            showSetting: true,
        }" :table="{
            columns: tableColumns,
            showCheckbox: true,
            height: 400,
            stripe: false,
            border: true,
            showSetting: true,
            api: 'https://jsonplaceholder.typicode.com/users',
            method: 'get'
        }">
            <!-- Expand Slot -->
            <template #expand="{ data }">
                <div style="padding: 20px; background: #fafafa; border-radius: 4px;">
                    <p><strong>ID:</strong> {{ data.id }}</p>
                    <p><strong>邮箱:</strong> {{ data.email }}</p>
                    <p><strong>城市:</strong> {{ data.address?.city }}</p>
                </div>
            </template>
            <!-- Query Slot -->
            <template #customField="{ model }">
                <el-input v-model="model.customField" placeholder="插槽输入" />
            </template>

            <template #email="{ data }">
                <el-input v-model="data.email" placeholder="邮箱" />
            </template>

            <!-- Table Slot -->
            <template #status="{ data }">
                <el-tag :type="data.status === 'active' ? 'success' : 'info'">
                    {{ data.status === 'active' ? '激活' : '禁用' }}
                </el-tag>
            </template>
        </YoGrid>

        <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 4px;">
            <p><strong>isShowSuperSearchArea:</strong> {{ showSuperSearch }}</p>
            <p><strong>当前表单数据：</strong></p>
            <pre>{{ searchForm }}</pre>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { reactive, ref } from "vue"
import { YoGrid } from "../../../packages/src/businessComponents"
import { ElTag, ElInput } from "element-plus"

const showSuperSearch = ref(false)
const searchForm = reactive({
    name: "",
    status: "",
    customField: "",
    date: ""
})

const queryConfig = [
    { type: "input", label: "姓名", prop: "name", placeholder: "请输入姓名" },
    {
        type: "select",
        label: "状态",
        prop: "status",
        isCache: false,
        options: [
            { label: "全部", value: "" },
            { label: "激活", value: "active" },
            { label: "禁用", value: "disabled" }
        ]
    },
    { label: "自定义", prop: "customField", isSlot: true },
    {
        type: "select", label: "日期", prop: "date",
        render(data) {
            return (
                <el-select v-model={data.date} placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="激活" value="active"></el-option>
                    <el-option label="禁用" value="disabled"></el-option>
                </el-select>
            )
        }
    }
]

const tableColumns = [
    { type: 'expand', isSlot: true, width: 50 },
    { label: "姓名", prop: "name", },
    { label: "状态", prop: "status", isSlot: true, },
    { label: "邮箱", prop: "email", isSlot: true, align: 'center', },
    {
        label: "创建时间",
        prop: "createdAt",
        render(data) {
            return (
                <el-tag type="success">{data.createdAt}</el-tag>
            )
        }
    },
    {
        label: '财务信息',
        align: 'center',
        children: [
            {
                prop: 'dept',
                label: '所属部门',
                align: 'center',
                sortable: true, formatter: (v) => {
                    return v.status
                }
            },
            { prop: 'amount', label: '金额（元）', align: 'right' },
            { label: '备注（无prop）', width: 150, render: (row) => <span>{row.name}的备注信息</span> }
        ]
    },
    {
        label: '操作',
        width: 200,
        fixed: 'right',
        align: "center",
        render() {
            return (
                <div class="flex gap-2">
                    <el-button type="primary" size="small">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </div>
            )
        }
    }
]
</script>