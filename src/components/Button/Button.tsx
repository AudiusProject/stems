import React, { forwardRef } from 'react'

import cn from 'classnames'

import styles from './Button.module.css'
import { useCollapsibleText } from './hooks'
import { ButtonProps, Type, Size, defaultButtonProps } from './types'

const SIZE_STYLE_MAP = {
  [Size.TINY]: styles.tiny,
  [Size.SMALL]: styles.small,
  [Size.MEDIUM]: styles.medium
}

const TYPE_STYLE_MAP = {
  [Type.PRIMARY]: styles.primary,
  [Type.PRIMARY_ALT]: styles.primaryAlt,
  [Type.SECONDARY]: styles.secondary,
  [Type.COMMON]: styles.common,
  [Type.COMMON_ALT]: styles.commonAlt,
  [Type.DISABLED]: styles.disabled,
  [Type.GLASS]: styles.glass,
  [Type.WHITE]: styles.white
}

/**
 * A common Button component. Includes a few variants and options to
 * include and position icons.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      text,
      type,
      size,
      leftIcon,
      rightIcon,
      isDisabled,
      includeHoverAnimations,
      widthToHideText,
      minWidth,
      className,
      iconClassName,
      textClassName,
      name,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      onMouseDown
    },
    ref
  ) {
    const { textIsHidden } = useCollapsibleText(widthToHideText)

    const renderLeftIcon = () =>
      leftIcon && (
        <span
          className={cn(iconClassName, styles.icon, styles.left, {
            [styles.noText]: !text || textIsHidden
          })}
        >
          {leftIcon}
        </span>
      )

    const renderRightIcon = () =>
      rightIcon && (
        <span
          className={cn(iconClassName, styles.icon, styles.right, {
            [styles.noText]: !text || textIsHidden
          })}
        >
          {rightIcon}
        </span>
      )

    const renderText = () =>
      !!text &&
      !textIsHidden && (
        <span className={cn(styles.textLabel, textClassName)}>{text}</span>
      )

    return (
      <button
        className={cn(
          styles.button,
          SIZE_STYLE_MAP[size],
          TYPE_STYLE_MAP[type],
          {
            [styles.noIcon]: !leftIcon && !rightIcon,
            [styles.disabled]: isDisabled,
            [styles.includeHoverAnimations]: includeHoverAnimations
          },
          className
        )}
        name={name}
        onClick={isDisabled ? () => {} : onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        ref={ref}
        style={{
          minWidth:
            minWidth && !!text && !textIsHidden ? `${minWidth}px` : 'unset'
        }}
      >
        {renderLeftIcon()}
        {renderText()}
        {renderRightIcon()}
      </button>
    )
  }
)

Button.defaultProps = defaultButtonProps
