import type { YoButton } from './button/button'
import type { YoInput } from './input/input'
import type { YoSearch } from './search/search'

declare module 'vue' {
  export interface GlobalComponents {
    YoButton: typeof YoButton
    YoInput: typeof YoInput
    YoSearch: typeof YoSearch
  }
}

export {}