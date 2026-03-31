<template>
    <div style="padding: 20px;">
        <YoTitle content="YoQuery 搜索组件测试" />

        <YoQuery v-model:isShowSuperSearchArea="showSuperSearch" :config="queryConfig" :model="searchForm" :cols="3"
            :title="'申请信息'" label-width="auto" label-gap="30px" cache-key="test" :rules="formRules">

            <!-- 自定义插槽测试 -->
            <template #customField="{ model }">
                <el-tag type="warning">这是插槽内容</el-tag>
                <el-input v-model="model.customField" placeholder="插槽内的输入框" style="width: 150px; margin-left: 8px;" />
            </template>

        </YoQuery>

        <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 4px;">
            <h4>当前表单数据：</h4>
            <pre>{{ searchForm }}</pre>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { h, ref, reactive, onMounted } from 'vue'
import { YoQuery, YoTitle } from '../../../packages/src/businessComponents'
import { ElTag, ElInput, ElSelect, ElOption } from 'element-plus'
import { YoInput } from '../../../packages/src/components/input'

const searchForm = ref({
    keyword: '',
    status: '',
    dateRange: [],
    customField: '这是插槽的默认内容',
    customRender: '',
    asyncValue: '',
    key: false,
    t1: '',
    t2: '',
    t3: '',
    t4: '',
    deptId: null,
    gender: ''
})

const asyncOptions = ref([])
const treeOptions = ref([])
const showSuperSearch = ref(false)
const formRules = {
    keyword: [
        { required: true, message: '请输入代理人姓名', trigger: 'blur' }
    ]
}

const simulateFetch = () => {
    // 模拟网络请求
    setTimeout(() => {
        asyncOptions.value = [
            { label: '服务A (异步)', value: 'a' },
            { label: '服务B (异步)', value: 'b' },
            { label: '服务C (异步)', value: 'c' }
        ]
        console.log('异步数据加载完成')
    }, 1500)

    // 模拟异步部门树数据
    setTimeout(() => {
        treeOptions.value = [
            {
                label: '总公司',
                value: '1',
                children: [
                    { label: '技术部', value: '1-1' },
                    { label: '人事部', value: '1-2' }
                ]
            }
        ]
        console.log('部门树加载完成')
    }, 2000)
}

onMounted(() => {
    simulateFetch()
})


const queryConfig = ref([
    {
        type: 'input',
        label: '代理人姓名',
        prop: 'keyword',
        placeholder: '请输入代理人姓名',
        props: { size: "default" }
    },
    {
        type: 'switch',
        label: '开关',
        prop: 'key',
    },
    {
        type: 'select',
        label: '证件类型',
        prop: 'status',
        options: [
            { label: '全部', value: '' },
            { label: '身份证', value: 'id' },
            { label: '护照', value: 'passport' }
        ]
    },
    {
        type: 'input',
        label: '证件号码',
        prop: 'idCard',
        placeholder: '请输入证件号码',
        formItemProps: {
            required: true,
            rules: [
                { required: true, message: '证件号码不能为空', trigger: 'blur' },
                { pattern: /^[0-9]{5,20}$/, message: '请输入5-20位数字', trigger: 'blur' }
            ]
        },
        props: {
            type: "text",
            disabled: false, // 改为可编辑以演示校验
        }
    },
    {
        type: 'select',
        label: '性别',
        prop: 'gender',
        options: [
            { label: '男', values: 'male' },
            { label: '女', values: 'female' }
        ],
        valueKey: 'values'
    },
    {
        type: 'input',
        label: '手机号',
        prop: 'phone',
        placeholder: '请输入手机号'
    },
    {
        type: 'input',
        label: '邮箱',
        prop: 'email',
        placeholder: '请输入邮箱'
    },
    {
        type: 'date',
        label: '日期范围',
        prop: 'dateRange',
        props: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
        }
    },
    {
        label: '标的类型',
        prop: 'targetType',
        span: 2,
        children: [
            {
                type: 'select',
                prop: 't1',
                placeholder: '请选择省',
                options: [{ label: '浙江省', value: '1' }],
                style: {
                    width: '150px'
                },
                props: {
                    size: "default"
                }
            },
            {
                type: 'select',
                prop: 't2',
                placeholder: '请选择市',
                options: [{ label: '杭州市', valuess: '1-1' }],
                style: {
                    width: '200px'
                },
                valueKey: 'valuess',
                props: {
                    size: "default"
                }
            },
            {
                type: 'input',
                prop: 't4',
                placeholder: '请输入详细地址',
                style: {
                    width: '200px'
                },
                props: {
                    size: "small",
                    disabled: true,
                }
            },
            {
                label: '自定义内容',
                prop: 't3',
                render: (model) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ElTag type="success">JSX</ElTag>
                        <YoInput
                            v-model={model.t3}
                            placeholder="JSX渲染的输入"
                            style={{ width: '150px' }}
                            size="default"
                        />
                    </div>
                )
            }
        ]
    },
    {
        label: '自定义插槽',
        prop: 'customField',
        isSlot: true
    },

    {
        label: '异步加载 (Render)',
        prop: 'asyncValue',
        render: (model) => {
            return (
                <ElSelect
                    v-model={model.asyncValue}
                    placeholder={asyncOptions.value.length ? '请选择' : '数据加载中...'}
                    style={{ width: '100%' }}>
                    {asyncOptions.value.map(opt => (
                        <ElOption
                            label={opt.label}
                            value={opt.value}
                            key={opt.value}
                        />
                    ))}
                </ElSelect>
            )
        }
    },
    {
        label: '部门 (Async Tree)',
        prop: 'deptId',
        render: (model) => (
            <el-tree-select
                onChange={(val) => {
                    console.log('选择值：', val)
                }}
                v-model={model.deptId}
                data={treeOptions.value}
                placeholder={treeOptions.value.length ? '请选择部门' : '树数据加载中...'}
                check-strictly
                style={{ width: '100%' }}
            />
        )
    }
])



const handleSearch = () => {
    console.log('搜索参数：', searchForm)
    alert('搜索参数已打印到控制台')
}

const handleReset = () => {
    searchForm.keyword = ''
    searchForm.status = ''
    searchForm.dateRange = []
    searchForm.customField = ''
    searchForm.customRender = ''
}
</script>
