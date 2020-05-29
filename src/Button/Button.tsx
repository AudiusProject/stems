import React from 'react'
import cn from 'classnames'

import ButtonProps, { Type, Size, defaultButtonProps } from './types'

import styles from './Button.module.css'

const Button = ({
  text,
  type,
  size,
  leftIcon,
  rightIcon,
  isDisabled,
  includeHoverAnimations,
  hideText,
  className,
  iconClassName,
  textClassname,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseUp,
  onMouseDown
}: ButtonProps) => {
  const leftIconElem = leftIcon && (
    <span className={cn(iconClassName, styles.icon, styles.left, {
      [styles.noText]: hideText
    })}>
      {leftIcon}
    </span>
  )

  const rightIconElem = rightIcon && (
    <span className={cn(iconClassName, styles.icon, styles.right, {
      [styles.noText]: hideText
    })}>
      {rightIcon}
    </span>
  )

  return (
    <button
      className={cn(styles.button, className, {
        [styles.noIcon]: !leftIconElem && !rightIconElem,
        [styles.isDisabled]: isDisabled,
        [styles.includeHoverAnimations]: includeHoverAnimations,
        [styles.medium]: size === Size.MEDIUM,
        [styles.small]: size === Size.SMALL,
        [styles.tiny]: size === Size.TINY,
        [styles.primary]: type === Type.PRIMARY,
        [styles.primaryAlt]: type === Type.PRIMARY_ALT,
        [styles.secondary]: type === Type.SECONDARY,
        [styles.common]: type === Type.COMMON,
        [styles.commonAlt]: type === Type.COMMON_ALT,
        [styles.disabled]: type === Type.DISABLED,
        [styles.glass]: type === Type.GLASS,
        [styles.white]: type === Type.WHITE
      })}
      onClick={isDisabled ? () => {} : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      name={name}
    >
      {leftIconElem}
      {!hideText && <span className={cn(textClassname, styles.textLabel)}>
        {text}
      </span>}
      {rightIconElem}
    </button>
  )
}

Button.defaultProps = defaultButtonProps

export default Button
