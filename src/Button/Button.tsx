import React, { useEffect, useState, useCallback, memo } from 'react'
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
}: ButtonProps) => {
  // Stores whether text should be hidden
  const [textIsHidden, setTextIsHidden] = useState(false)

  // Hides the text based on the matching of a `matchMedia` call
  const hideText = useCallback(
    matcher => {
      if (matcher.matches) {
        setTextIsHidden(true)
      } else {
        setTextIsHidden(false)
      }
    },
    [setTextIsHidden]
  )

  // If `widthToHideText` is set, set up a media query listener
  useEffect(() => {
    if (widthToHideText) {
      const match = window.matchMedia(`(max-width: ${widthToHideText}px)`)
      hideText(match)
      match.addListener(hideText)
      return () => match.removeListener(hideText)
    }
    return () => {}
  }, [widthToHideText, hideText])

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

  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.noIcon]: !leftIcon && !rightIcon,
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
        },
        className
      )}
      onClick={isDisabled ? () => {} : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      name={name}
      style={{
        minWidth:
          minWidth && !!text && !textIsHidden ? `${minWidth}px` : 'unset'
      }}
    >
      {renderLeftIcon()}
      {!!text && !textIsHidden && (
        <span className={cn(styles.textLabel, textClassName)}>{text}</span>
      )}
      {renderRightIcon()}
    </button>
  )
}

Button.defaultProps = defaultButtonProps

export default memo(Button)
