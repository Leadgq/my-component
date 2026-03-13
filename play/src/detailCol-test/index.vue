<template>
    <div style="padding: 20px; background: #f0f2f5; min-height: 100vh;">
        <h2>YoDetailCol Layout 测试</h2>

        <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>文本对齐测试 (labelAlign="end", valueAlign="start")</h3>
            <YoDetailCol :rowData="baseData2" :label_width="150" labelAlign="end" valueAlign="start" />
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>文本对齐测试 (居中 Center)</h3>
            <YoDetailCol :rowData="flexData" :label_width="120" layout="flex" labelAlign="center" valueAlign="center" />
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>下划线模式 (underLine=true)</h3>
            <YoDetailCol :rowData="baseData2" :label_width="150" underLine />
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>局部对齐覆盖 (Item Alignment)</h3>
            <YoDetailCol :rowData="alignData" :label_width="100" />
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 4px;">
            <h3>高级用法：自定义 Render</h3>
            <YoDetailCol :rowData="renderData" :label_width="120" />
        </div>
    </div>
</template>

<script setup lang="jsx">
import { ref, h } from 'vue';
import { ElTag, ElButton, ElRate } from 'element-plus';
import { YoDetailCol } from "../../../packages/src"

const baseData2 = ref([
    [
        { title: '订单编号订单编号订单编号订单编号订单编号订单编号订单编号', value: 'ORD-20231025-001ORD-20231025-001ORD-20231025-001ORD-20231025-001ORD-20231025-001', span: 6, space: '40px', },
        { title: '下单人', value: '张三疯', span: 6 },
        { title: '状态', value: '已付款', span: 6 },
        { title: '状态', value: '已付款', span: 6 },

    ],
    [
        { title: '联系电话', value: '13800138000', span: 6 },
        { title: '创建时间', value: '2023-10-25 14:30:00', span: 6 }
    ]
]);

const flexData = ref([
    [
        { title: '商品名称', value: 'Apple MacBook Pro', span: 12 },
        { title: '型号', value: 'M3 Max', span: 12 },
    ],
    [
        { title: '核心数', value: '14核', span: 8 },
        { title: '内存', value: '36GB', span: 8 },
        { title: '固态硬盘', value: '1TB', span: 8 },
    ]
]);

const alignData = ref([
    [
        { title: '左对齐', value: 'Left Align Content', span: 12, labelAlign: 'start', valueAlign: 'start' },
        { title: '右对齐', value: 'Right Align Content', span: 12, labelAlign: 'end', valueAlign: 'end' },
    ],
    [
        { title: '居中对齐', value: 'Center Align Content', span: 24, labelAlign: 'center', valueAlign: 'center' },
    ]
]);

const spanData = ref([
    [
        { title: '完整地址', value: '广东省深圳市南山区粤海街道科技园中区科苑路15号科苑大厦A座15层', span: 24 },
    ],
    [
        { title: '备注', value: '请在周末派送，谢谢！', span: 24 },
    ],
    [
        { title: '邮编', value: '518000', span: 6 },
        { title: '关键词', value: '电子产品, 电脑', span: 18 },
    ]
]);

const renderData = ref([
    [
        { title: '账户余额', value: '23456.78', type: 'money', span: 12 },
        {
            title: '账号状态',
            value: 1,
            key: 'status',
            span: 12,
            render: (cellData) => {
                const val = cellData.value;
                const types = { 1: 'success', 0: 'danger', 2: 'warning' };
                const labels = { 1: '正常', 0: '停用', 2: '异常' };
                return h(ElTag, { type: types[val] || 'info', effect: 'dark' }, () => labels[val]);
            }
        },
    ],
    [
        {
            title: '信用评级',
            value: 4.5,
            span: 24,
            render: (cellData) => (
                <ElRate
                    modelValue={cellData.value}
                    disabled
                    showScore
                    textColor="#ff9900"
                />
            )
        }
    ]
]);

setTimeout(() => {
    if (renderData.value[0][1]) {
        renderData.value[0][1].value = 2
    }
}, 2000);

</script>
