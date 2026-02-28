import type { InputProps, InputEmits, InputInstance } from "element-plus"

// 导出 Expose 类型
export interface MyInputExpose {
  clear: () => void
  select: () => void
  focus: () => void
  blur: () => void
}

export type { InputProps, InputEmits, InputInstance }