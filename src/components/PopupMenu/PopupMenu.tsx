import React, { useCallback, useRef, useState } from 'react'

import { Popup } from 'components/Popup'

import styles from './PopupMenu.module.css'
import { PopupMenuItem, PopupMenuProps } from './types'

/**
 * A menu that shows on top of the UI. Ideal for overflow menus, dropdowns, etc
 */
export const PopupMenu = ({
  items,
  position,
  renderTrigger,
  title,
  zIndex
}: PopupMenuProps) => {
  const clickInsideRef = useRef<any>()
  const anchorRef = useRef<HTMLElement>()

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)

  const triggerPopup = useCallback(() => setIsPopupVisible(!isPopupVisible), [
    isPopupVisible,
    setIsPopupVisible
  ])

  const handleMenuItemClick = useCallback(
    (item: PopupMenuItem) => (e: React.MouseEvent) => {
      e.stopPropagation()
      item.onClick()
      setIsPopupVisible(false)
    },
    [setIsPopupVisible]
  )

  const handlePopupClose = useCallback(() => setIsPopupVisible(false), [
    setIsPopupVisible
  ])

  return (
    <div ref={clickInsideRef}>
      {renderTrigger(anchorRef, triggerPopup)}
      <Popup
        anchorRef={anchorRef}
        checkIfClickInside={(target: EventTarget) => {
          if (target instanceof Element && clickInsideRef) {
            return clickInsideRef.current.contains(target)
          }
          return false
        }}
        isVisible={isPopupVisible}
        noHeader={!title}
        onClose={handlePopupClose}
        position={position}
        title={title || ''}
        zIndex={zIndex}
      >
        <div className={styles.menu}>
          {items.map((item, i) => (
            <div
              key={`${item.text}_${i}`}
              className={styles.item}
              onClick={handleMenuItemClick(item)}
            >
              {item.icon && <div className={styles.icon}>{item.icon}</div>}
              {item.text}
            </div>
          ))}
        </div>
        <></>
      </Popup>
    </div>
  )
}
