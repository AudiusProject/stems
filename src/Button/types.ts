import { ReactNode } from 'react'

export enum Type {
  PRIMARY = 'primary',
  PRIMARY_ALT = 'primaryAlt',
  SECONDARY = 'secondary',
  COMMON = 'common',
  COMMON_ALT = 'commonAlt',
  DISABLED = 'disabled',
  GLASS = 'glass',
  WHITE = 'white'
}

export enum Size {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium'
}

type ButtonProps = {
  /**
   * The text of the button
   */
  text: string | ReactNode

  /**
   * The type of the button
   */
  type?: Type

  /**
   * The button size
   */
  size?: Size

  /**
   * Optional icon element to include on the left side of the button
   */
  leftIcon?: ReactNode | any

  /**
   * Optional icon element to include on the right side of the button
   */
  rightIcon?: ReactNode

  /**
   * Whether or not the button is clickable
   */
  isDisabled?: boolean

  /**
   * Whether or not to hide the text
   */
  hideText?: boolean

  /**
   * Whether or not to include animations on hover
   * Consider turning off animations in mobile-first experiences
   */
  includeHoverAnimations?: boolean

  /**
   * Class name to apply to the outermost <button> element
   */
  className?: string

  /**
   * Class name to apply to the icon
   */
  iconClassName?: string

  /**
   * Class name to apply to the text label
   */
  textClassname?: string

  /**
   * What happens when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onMouseUp?: () => void
  onMouseDown?: () => void
}

export const defaultButtonProps = {
  type: Type.PRIMARY,
  size: Size.MEDIUM,
  includeHoverAnimations: true,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseUp: () => {},
  onMouseDown: () => {}
}

export default ButtonProps
