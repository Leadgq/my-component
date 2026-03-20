// 导入核心组件
import "./core";
// 导入业务组件
import "./businessComponents";
// 导入基础组件
import componentLibrary from "./components/index";
// 导出核心方法
export * from "./core";
// 导出业务组件
export * from "./businessComponents";
// 导出基础组件
export * from "./components/index";
// 导出默认值
export default componentLibrary;


// 组件库 src/index.js

// let _libAppKey = ''  // 模块级变量，供所有组件读取

// export const getLibAppKey = () => _libAppKey  // 导出给内部组件用

// const install = (app) => {
//     // 1. 取应用标识（乾坤注入 > 当前域名）
//     const appIdentifier = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
//                        ?? window.location.origin

//     // 2. 以应用标识为维度，localStorage 各存各的（互不干扰）
//     const storageKey = `__lib_app_key__${appIdentifier}`

//     let appKey = localStorage.getItem(storageKey)
//     if (!appKey) {
//         appKey = crypto.randomUUID()  // 只在第一次生成
//         localStorage.setItem(storageKey, appKey)
//     }

//     _libAppKey = appKey   // 存到模块变量，全局可读
// }

// export default { install }
