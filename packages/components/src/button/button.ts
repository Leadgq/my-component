export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  loading?: boolean
  round?: boolean
  circle?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}