import type { MyButton } from './button/button'
import type { MyInput } from './input/input'

declare module 'vue' {
  export interface GlobalComponents {
    MyButton: typeof MyButton
    MyInput: typeof MyInput
  }
}

export {}