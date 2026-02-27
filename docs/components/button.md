# Button 按钮

基于 Element Plus 的自定义按钮组件

## 基础用法

<script setup>
import { ref } from 'vue'
import { MyButton } from '../../packages/components'
</script>

<div class="demo">
  <MyButton type="primary">主要按钮</MyButton>
  <MyButton type="success">成功按钮</MyButton>
  <MyButton type="danger">危险按钮</MyButton>
</div>

## 不同尺寸

<div class="demo">
  <MyButton size="small">小按钮</MyButton>
  <MyButton size="default">默认按钮</MyButton>
  <MyButton size="large">大按钮</MyButton>
</div>

## 禁用状态

<div class="demo">
  <MyButton disabled>禁用按钮</MyButton>
</div>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `type` | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | `'default'` |
| `size` | 按钮大小 | `'large' \| 'default' \| 'small'` | `'default'` |
| `disabled` | 禁用状态 | `boolean` | `false` |
| `loading` | 加载状态 | `boolean` | `false` |
| `round` | 圆角按钮 | `boolean` | `false` |
| `circle` | 圆形按钮 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|---------|
| `click` | 点击事件 | `(event: MouseEvent)` |
