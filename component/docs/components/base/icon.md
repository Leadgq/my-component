# Icon 图标

## 图标展示

### 基础用法

下面展示了所有可用的图标：

```html
<template>
  <div class="icon-container">
    <div v-for="icon in icons" :key="icon" class="icon-item">
      <i :class="`iconfont ${icon}`"></i>
      <span>{{ icon }}</span>
    </div>
  </div>
</template>

<style scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  transition: all 0.3s;
}

.icon-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.icon-item i {
  font-size: 24px;
  color: #409eff;
}

.icon-item span {
  font-size: 12px;
  color: #606266;
  word-break: break-all;
  text-align: center;
}
</style>
```

## 安装使用

### 1. 引入图标字体

在 HTML 文件中引入图标字体：

```html
<link rel="stylesheet" href="/icon/iconfont.css">
```

### 2. 使用图标

```html
<i class="iconfont icon-name"></i>
```

### 3. 图标列表

将您的图标文件放入 `docs/public/icon` 目录中，然后在上面的模板中添加对应的图标类名。
