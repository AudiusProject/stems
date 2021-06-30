import React, { useCallback, useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import ReactDOM from 'react-dom'
import { useTransition, animated } from 'react-spring'

import { IconRemove } from 'components/Icons'
import { useClickOutside } from 'hooks/useClickOutside'
import { getScrollParent } from 'utils/scrollParent'

import styles from './Popup.module.css'
import { PopupProps, Position, popupDefaultProps } from './types'

/**
 * Gets the css transform origin prop from the display position
 * @param {Position} position
 * @returns {string} transform origin
 */
const getTransformOrigin = (position: Position) =>
  ({
    [Position.TOP_LEFT]: 'bottom right',
    [Position.TOP_CENTER]: 'bottom center',
    [Position.TOP_RIGHT]: 'bottom left',
    [Position.BOTTOM_LEFT]: 'top right',
    [Position.BOTTOM_CENTER]: 'top center',
    [Position.BOTTOM_RIGHT]: 'top left'
  }[position] ?? 'top center')

/**
 * Figures out whether the specified position would overflow the window
 * and picks a better position accordingly
 * @param {Position} position
 * @param {ClientRect} rect the content
 * @param {ClientRect} wrapper the wrapper of the content
 * @return {string | null} null if it would not overflow
 */
const getComputedPosition = (
  position: Position,
  rect: DOMRect,
  wrapperRect: DOMRect
) => {
  if (!rect || !wrapperRect) return position
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const overflowRight = rect.x + wrapperRect.width > windowWidth
  const overflowLeft = rect.x - wrapperRect.width < 0
  const overflowBottom = rect.y + wrapperRect.height > windowHeight
  const overflowTop = rect.y - wrapperRect.height < 0

  return () => {
    if (overflowRight) {
      return position.replace('Right', 'Left')
    }
    if (overflowLeft) {
      return position.replace('Left', 'Right')
    }
    if (overflowTop) {
      return position.replace('top', 'bottom')
    }
    if (overflowBottom) {
      return position.replace('bottom', 'top')
    }
    return position
  }
}

/**
 * A popup is an in-place container that shows on top of the UI. A popup does
 * not impact the rest of the UI (e.g. graying it out). It differs
 * from modals, which do take over the whole UI and are usually
 * center-screened.
 */
export const Popup = ({
  anchorRef,
  className,
  wrapperClassName,
  ignoreClickOutsideRef,
  isVisible,
  animationDuration,
  onClose,
  onAfterClose,
  title,
  noHeader,
  position = Position.BOTTOM_CENTER,
  children,
  zIndex
}: PopupProps) => {
  const wrapper = useRef<HTMLDivElement>()
  const placeholder = useRef<HTMLDivElement>()
  const originalTopPosition = useRef<number>(0)
  const [computedPosition, setComputedPosition] = useState(position)

  useEffect(() => {
    if (isVisible) {
      const rect = placeholder.current.getBoundingClientRect()
      const wrapperRect = wrapper.current.getBoundingClientRect()
      const computed = getComputedPosition(position, rect, wrapperRect)
      setComputedPosition(computed)
    }
  }, [isVisible, setComputedPosition, position, placeholder, wrapper])

  // On visible, set the position
  useEffect(() => {
    if (isVisible) {
      // When the popup becomes visible, set the position based on the placeholder
      const rect = placeholder.current.getBoundingClientRect()
      const wrapperRect = wrapper.current.getBoundingClientRect()

      let left
      let top
      if (!anchorRef) {
        left = rect.x - wrapperRect.width / 2 + rect.width / 2
        top = rect.y
      } else {
        const anchorRect = anchorRef.current.getBoundingClientRect()
        switch (computedPosition) {
          case 'topCenter':
            top = rect.y - wrapperRect.height - anchorRect.height
            left = rect.x - wrapperRect.width / 2 + anchorRect.width / 2
            break
          case 'topRight':
            top = rect.y - wrapperRect.height - anchorRect.height
            left = rect.x
            break
          case 'topLeft':
            top = rect.y - wrapperRect.height - anchorRect.height
            left = rect.x - wrapperRect.width + anchorRect.width
            break
          case 'bottomRight':
            top = rect.y
            left = rect.x + anchorRect.width
            break
          case 'bottomLeft':
            top = rect.y
            left = rect.x - wrapperRect.width + anchorRect.width
            break
          case 'bottomCenter':
          default:
            top = rect.y
            left = rect.x - wrapperRect.width / 2 + anchorRect.width / 2
        }
      }
      wrapper.current.style.top = `${top}px`
      wrapper.current.style.left = `${left}px`

      originalTopPosition.current = top
    }
  }, [
    isVisible,
    wrapper,
    placeholder,
    anchorRef,
    computedPosition,
    originalTopPosition
  ])

  // Callback invoked on each scroll. Uses original top position to scroll with content.
  // Takes scrollParent to get the current scroll position as well as the intitial scroll position
  // when the popup became visible.
  const watchScroll = useCallback(
    (scrollParent, initialScrollPosition) => {
      const scrollTop = scrollParent.scrollTop
      wrapper.current.style.top = `${
        originalTopPosition.current - scrollTop + initialScrollPosition
      }px`
    },
    [wrapper, originalTopPosition]
  )

  // Set up scroll listeners
  useEffect(() => {
    if (isVisible && placeholder.current) {
      const scrollParent = getScrollParent(placeholder.current)
      const initialScrollPosition = scrollParent.scrollTop
      const listener = () => watchScroll(scrollParent, initialScrollPosition)
      scrollParent.addEventListener('scroll', listener)
      return () => {
        scrollParent.removeEventListener('scroll', listener)
      }
    }

    return () => {}
  }, [isVisible, watchScroll, placeholder])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      onAfterClose()
    }, animationDuration)
  }, [onClose, onAfterClose, animationDuration])

  const clickOutsideRef = useClickOutside(handleClose, target => {
    if (target instanceof Element && ignoreClickOutsideRef) {
      return ignoreClickOutsideRef.current.contains(target)
    }
    return false
  })

  const transitions = useTransition(isVisible, null, {
    from: {
      transform: `scale(0)`,
      opacity: 0
    },
    enter: {
      transform: `scale(1)`,
      opacity: 1
    },
    leave: {
      transform: `scale(0)`,
      opacity: 0
    },
    config: { duration: 180 },
    unique: true
  })

  const wrapperStyle = zIndex ? { zIndex } : {}

  return (
    <>
      <div ref={placeholder} className={cn(styles.placeholder, className)} />
      {/* Portal the popup out of the dom structure so that it has a separate stacking context */}
      {ReactDOM.createPortal(
        <div
          ref={wrapper}
          className={cn(styles.wrapper, wrapperClassName)}
          style={wrapperStyle}
        >
          {transitions.map(({ item, key, props }) =>
            item ? (
              <animated.div
                className={cn(styles.popup, className)}
                ref={clickOutsideRef}
                key={key}
                style={{
                  ...props,
                  transformOrigin: getTransformOrigin(computedPosition)
                }}
              >
                {!noHeader && (
                  <div className={styles.header}>
                    <IconRemove
                      className={styles.iconRemove}
                      onClick={handleClose}
                    />
                    <div className={styles.title}>{title}</div>
                  </div>
                )}
                {children}
              </animated.div>
            ) : null
          )}
        </div>,
        document.body
      )}
    </>
  )
}

Popup.defaultProps = popupDefaultProps
