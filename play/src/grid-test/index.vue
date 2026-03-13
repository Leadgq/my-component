<template>
    <div style="padding: 20px;">
        <YoGrid :is-cache="true"
         :query-config="queryConfig"
          :query-model="searchForm" 
          :table-columns="tableColumns"
           :get-table-function="fetchData" 
            query-title="转让申请审核"
             cache-key="grid-test-cache"
            :showSetting="true"
            :queryShowSetting="true"
             query-quick-search-key="quickSearch"
            :tableOption="{ height: 400, showCheckbox: true, stripe: false }">
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

const showSuperSearch = ref(true)
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
        ],
        // formItemProps: {
        //     required: true
        // }
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
    { label: "姓名", prop: "names", },
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
        children: [
            {
                prop: 'dept',
                label: '所属部门',
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

const fetchData = async (params) => {
    console.log("Grid Fetch Params:", params)

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    // 模拟数据生成
    const total = 55
    const items = []
    const start = (params.PageIndex - 1) * params.PageSize

    for (let i = 0; i < params.PageSize; i++) {
        const id = start + i + 1
        if (id > total) break

        items.push({
            id,
            name: `${params.name || '测试用户'}_${id}`,
            status: id % 2 === 0 ? "active" : "disabled",
            email: `user${id}@example.com`,
            createdAt: new Date().toLocaleDateString(),
            dept: '技术部',
            amount: 1000 * id,
            address: '北京市海淀区'
        })
    }

    return {
        Data: {
            Items: items,
            TotalCount: total
        }
    }
}
</script>