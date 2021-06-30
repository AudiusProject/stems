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
   * Duration of the animations in ms
   */
  animationDuration?: number
  children: React.ReactChildren | string
  className?: string
  /**
   * An optional ref to a container that, when a click happens inside
   * will ignore the clickOutside logic
   */
  ignoreClickOutsideRef?: React.MutableRefObject<any>
  /**
   * Boolean representing whether the Popup is visible
   */
  isVisible: boolean
  /**
   * Hide the header
   */
  noHeader?: boolean
  /**
   * Fired when a close event is dispatched, but the animation is not necessarily finished
   */
  onClose?: () => void
  /**
   * Fired after the popup finishes closing
   */
  onAfterClose?: () => void
  /**
   * The position of the Popup relative to the trigger
   */
  position?: Position
  /**
   * A title displayed at the top of the Popup
   */
  title?: string
  /**
   * A ref to the element whose position will be used to anchor the Popup
   */
  anchorRef: React.MutableRefObject<HTMLElement>
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
