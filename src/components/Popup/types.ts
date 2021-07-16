import React from 'react'

export enum Position {
  TOP_LEFT = 'topLeft',
  TOP_CENTER = 'topCenter',
  TOP_RIGHT = 'topRight',
  BOTTOM_LEFT = 'bottomLeft',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_RIGHT = 'bottomRight'
}

export type PopupProps = {
  /**
   * A ref to the element whose position will be used to anchor the Popup
   */
  anchorRef: React.MutableRefObject<HTMLElement>
  /**
   * Duration of the animations in ms
   */
  animationDuration?: number
  /**
   * A function used to check if a click falls inside any div
   * that should not close the popup. Clicks inside the menu itself
   * are automatically considered inside
   */
  checkIfClickInside?: (target: EventTarget) => boolean
  children: React.ReactChild
  className?: string
  /**
   * Boolean representing whether the Popup is visible
   */
  isVisible: boolean
  /**
   * Show the header
   */
  showHeader?: boolean
  /**
   * Fired when a close event is dispatched, but the animation is not necessarily finished
   */
  onClose: () => void
  /**
   * Fired after the popup finishes closing
   */
  onAfterClose?: () => void
  /**
   * The position of the Popup relative to the trigger
   */
  position?: Position
  /**
   * A title displayed at the top of the Popup (only visible when the header is enabled)
   */
  title?: string
  wrapperClassName?: string
  /**
   * An optional z-index to override the default of 10000
   */
  zIndex?: number
}

export const popupDefaultProps = {
  animationDuration: 90,
  onAfterClose: () => {}
}