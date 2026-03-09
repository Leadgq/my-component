<template>
  <div class="smart-table-container">
    <div class="search-wrap">
      <el-form :inline="true" :model="searchQuery">
        <template v-for="(item, index) in searchOptions" :key="item.prop">
          
          <!-- 显隐逻辑：处于展开状态，或者索引小于常驻显示数量时，才会渲染 -->
          <el-form-item 
            v-show="currentExpanded || index < defaultVisibleCount"
            :label="item.label"
          >
            <!-- 逃生舱插槽 -->
            <slot 
              v-if="item.slot" 
              :name="item.slot" 
              :prop="item.prop" 
              :query="searchQuery"
            />
            
            <!-- 动态组件 -->
            <component 
              v-else
              :is="getComponentType(item.type)"     
              v-model="searchQuery[item.prop]"
              v-bind="item.props || {}"                    
              :placeholder="(item.props && item.props.placeholder) ? item.props.placeholder : `请输入${item.label}`"
              style="width: 200px"
            >
              <template v-if="item.type === 'select' && item.options">
                <el-option
                  v-for="opt in item.options"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </template>
            </component>
          </el-form-item>
        </template>

        <!-- 操作区 -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
          
          <el-button 
            v-if="searchOptions.length > defaultVisibleCount" 
            type="primary" 
            link
            @click="toggleExpand"
          >
            {{ currentExpanded ? '收起 ∧' : '展开 ∨' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-wrap">
      <el-table :data="tableData" v-loading="loading" border>
        <slot name="columns"></slot>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ElInput, ElSelect, ElDatePicker } from 'element-plus';
import { useStorage } from '@vueuse/core';

// --- 1. 定义 Props ---
// 在 JS 中，直接使用对象声明的默认值方式
const props = defineProps({
  api: {
    type: Function,
    required: true
  },
  searchOptions: {
    type: Array,
    required: true
  },
  // v-model:expanded 双向绑定
  expanded: {
    type: Boolean,
    default: undefined 
  },
  defaultVisibleCount: {
    type: Number,
    default: 3
  },
  // 缓存配置
  cacheKey: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:expanded']);

// --- 2. 完美的“双态支持”(受控 vs 非受控) ---
const internalExpanded = ref(false); // 内部兜底状态

const currentExpanded = computed({
  get() {
    // 如果外部传了 expanded (不是 undefined)，完全听外部的；否则听内部的
    return props.expanded !== undefined ? props.expanded : internalExpanded.value;
  },
  set(val) {
    internalExpanded.value = val;
    emit('update:expanded', val); // 通知外部状态变更
  }
});

const toggleExpand = () => {
  currentExpanded.value = !currentExpanded.value;
};

// --- 3. 组件映射字典 ---
const componentMap = { 
  'input': ElInput, 
  'select': ElSelect, 
  'date': ElDatePicker 
};

const getComponentType = (type = 'input') => componentMap[type] || componentMap['input'];

// --- 4. 状态与数据的缓存架构 ---
const loading = ref(false);    
const tableData = ref([]);     
const searchQuery = ref({}); 

// 获取 VueUse 的存储实例包装器（提取供内部使用）
const getStorageStore = () => {
    return props.cacheKey ? useStorage(props.cacheKey, {}) : null;
};

// 初始化数据中心
const initContext = () => {
  const defaultQuery = {};
  const cacheIgnoreKeys = [];

  // 获取默认值与不需要缓存的键
  props.searchOptions.forEach(item => {
    if (item.defaultValue !== undefined) {
      defaultQuery[item.prop] = item.defaultValue;
    }
    if (item.ignoreCache) {
      cacheIgnoreKeys.push(item.prop);
    }
  });

  // 第一步：先应用默认值
  searchQuery.value = { ...defaultQuery };

  // 第二步：如果你配置了 cacheKey，就去读取 VueUse 的 Storage，并覆盖默认值
  const cachedStore = getStorageStore();
  if (cachedStore) {
    // 把缓存中的数据合并到 searchQuery 中
    if (Object.keys(cachedStore.value).length > 0) {
      for (const key in cachedStore.value) {
        if (!cacheIgnoreKeys.includes(key)) {
          searchQuery.value[key] = cachedStore.value[key];
        }
      }
    }

    // 第三步：监听表单值变化，写入缓存（剔除需要忽略的键）
    // 注意：用 deep 监听对象变化
    watch(searchQuery, (newVal) => {
      const toCache = { ...newVal };
      cacheIgnoreKeys.forEach(k => delete toCache[k]);
      cachedStore.value = toCache;
    }, { deep: true });
  }
};


// --- 5. 请求逻辑与对外暴露的 API ---
const loadData = async () => {
  if (!props.api) return;
  loading.value = true;
  try {
    const res = await props.api(searchQuery.value);
    tableData.value = res.list || [];
  } catch (e) {
    console.error('SmartTable request error:', e);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  loadData();
};

const handleReset = () => {
  // 1. 如果有缓存，清空该缓存！
  const cachedStore = getStorageStore();
  if (cachedStore) {
    cachedStore.value = {}; 
  }
  
  // 2. 重新初始化为配置中的 defaultValue 并重新请求
  initContext();
  loadData();
};

/**
 * 暴露给外部使用的方法（取消某个键的缓存，或者清空全部缓存）
 */
const clearCache = (key) => {
  const cachedStore = getStorageStore();
  if (!cachedStore) return;
  
  if (key) {
    // 当我们想要修改 ref.value 内部对象的键时，最好做一个浅拷贝触发响应式
    const temp = { ...cachedStore.value };
    delete temp[key];
    cachedStore.value = temp;
  } else {
    cachedStore.value = {}; // 清空全部缓存
  }
};

onMounted(() => {
  initContext();
  loadData();
});

// 对外暴露方法，父组件可以通过 ref 调用
defineExpose({
  clearCache,
  refresh: loadData
});
</script>

<style scoped>
.smart-table-container { padding: 20px; background: #fff; border-radius: 4px; }
.search-wrap { padding: 18px; margin-bottom: 20px; background: #f8f9fa; border-radius: 6px; }
</style>
