export type searchProps = {
 width?: string
 placeholder?: string
 isSearchModel?: boolean
 buttonType?: string
 type?: string
}

export type searchEmits = {
  (e: 'search', v: string): void
  (e: 'advancedSearch'): void
}