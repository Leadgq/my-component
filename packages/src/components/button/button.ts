import type { ButtonProps as ElButtonProps, ButtonEmits as ElButtonEmits } from 'element-plus'

export interface ButtonProps extends ElButtonProps {
  /**
   * 按钮标记
   */
  badge?: string | number
  /**
   * 标记类型
   */
  badgeType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /**
   * 标记位置
   */
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /**
   * 标记是否为点
   */
  badgeIsDot?: boolean

  /**
   * 是否显示标记
   */
  isShowBadge?: boolean
}

export type ButtonEmits = ElButtonEmits
