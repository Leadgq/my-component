import type { MyButton } from './button/button'

declare module 'vue' {
  export interface GlobalComponents {
    MyButton: typeof MyButton
  }
}

export {}