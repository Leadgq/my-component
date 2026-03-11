<template>
    <div style="padding: 20px; background: #f0f2f5; min-height: 100vh;">
        <h2>YoDetailCol 全新 1D 数组 & Render 函版测试</h2>

        <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>基础用法 (默认 3 列, span 8)</h3>
            <YoDetailCol :rowData="baseData" :label_width="150" />
        </div>

        <!-- <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>基础用法 (默认 3 列, span 8)</h3>
            <YoDetailCol :rowData="baseData">
            </YoDetailCol>
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h3>跨越排版与长文本处理 (Span 控制)</h3>
            <YoDetailCol :rowData="spanData" :label_width="100" />
        </div>

        <div style="background: #fff; padding: 20px; border-radius: 4px;">
            <h3>高级用法：自定义 Render(h) 函数</h3>
            <YoDetailCol :rowData="renderData" :label_width="120" />
        </div> -->
    </div>
</template>

<script setup lang="jsx">
import { ref, h } from 'vue';
import { ElTag, ElButton, ElRate } from 'element-plus';
import { YoDetailCol } from "../../../packages/src"

const baseData = ref([
    {
        title: '订单编号', value: 'ORD-20231025-001', key: 'no', span: 8, space: '40px', labelW: '170px',
        before: (props) => {
            return (
                <div>前面</div>
            )
        },
        middle: (props) => {
            return (
                <div>中间</div>
            )
        },
        after: (props) => {
            return (
                <div>后面</div>
            )
        },
    },
    { title: '下单人', value: '张三疯', span: 8, key: 'name' },
    { title: '状态', value: '已付款', span: 8, key: 'stauts' },
    { title: '联系电话', value: '13800138000', span: 8, key: 'phone' },
    { title: '创建时间', value: '2023-10-25 14:30:00', span: 8, key: 'create_time' }
]);


const spanData = ref([
    { title: '商品名称', value: 'Apple MacBook Pro 14英寸', span: 12 },
    { title: '商品毛重', value: '2.5kg', span: 6 },
    { title: '商品产地', value: '中国大陆', span: 6 },
    { title: '收货地址', value: '广东省深圳市南山区粤海街道科技园中区科苑路15号科苑大厦A座15层 (这是一个非常长非常长非常长的地址用来测试强行打断和换行能力，绝对不能破坏左侧Label的宽度！！！)', span: 24 }, // 占据整行 (24列)
    { title: '备注留言', value: '请在周末派送，谢谢！', span: 24 },
]);

const renderData = ref([
    { title: '账户余额', value: '23456.78', type: 'money' },
    {
        title: '账号状态',
        value: 1,
        key: 'status',
        render: (cellData) => {
            const val = cellData.value;
            const types = { 1: 'success', 0: 'danger', 2: 'warning' };
            const labels = { 1: '正常', 0: '停用', 2: '异常' };
            return h(ElTag, { type: types[val] || 'info', effect: 'dark' }, () => labels[val]);
        }
    },
    {
        title: '信用评级',
        value: 4.5,
        isSlot: "middle",
        render: (cellData) => (
            <ElRate
                modelValue={cellData.value}
                disabled
                showScore
                textColor="#ff9900"
            />
        )
    },
    {
        title: '操作',
        value: 'btn',
        render: (cellData) => {
            return h('div', [
                h(ElButton, { type: 'primary', size: 'small', onClick: () => alert('编辑') }, () => '编辑用户'),
                h(ElButton, { type: 'danger', size: 'small', plain: true, onClick: () => alert('删除') }, () => '删除')
            ]);
        }
    }
]);

setTimeout(() => {
    renderData.value[1].value = 2
}, 2000);
// 给我一个二维数组的例子
const baseData2 = ref([
    [
        { title: '订单编号订单编号订单编号订单编号', value: 'ORD-20231025-001', span: 8, space: '40px', labelW: '170px' },
        { title: '下单人', value: '张三疯', span: 8 },
        { title: '状态', value: '已付款', span: 8 },
        { title: '联系电话', value: '13800138000', span: 8 },
        { title: '创建时间', value: '2023-10-25 14:30:00', span: 8 }
    ],
    [
        { title: '订单编号', value: 'ORD-20231025-001', span: 8, space: '40px', labelW: '120px' },
        { title: '下单人', value: '张三疯', span: 8 },
        { title: '状态', value: '已付款', span: 8 },
        { title: '联系电话', value: '13800138000', span: 8 },
        { title: '创建时间', value: '2023-10-25 14:30:00', span: 8 }
    ]
]);

</script>
