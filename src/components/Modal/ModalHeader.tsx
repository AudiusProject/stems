import React, { forwardRef } from 'react'

import cn from 'classnames'

import { IconRemove } from 'components/Icons'

import styles from './ModalHeader.module.css'
import { ModalHeaderProps, ModalTitleProps } from './types'

/**
 * Header component to be used inside modals
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(
    { className, onClose, showDismissButton = true, children, ...props },
    ref
  ) {
    return (
      <div
        className={cn(styles.headerContainer, className)}
        ref={ref}
        {...props}
      >
        {showDismissButton && (
          <div className={styles.dismissButton} onClick={onClose}>
            <IconRemove />
          </div>
        )}
        {children}
      </div>
    )
  }
)

/**
 * Title component to be used inside modal headers
 */
export const ModalTitle = forwardRef<HTMLDivElement, ModalTitleProps>(
  function ModalHeader(
    { subtitleClassName, icon, iconClassName, title, subtitle, ...props },
    ref
  ) {
    return (
      <>
        <div className={styles.title} {...props} ref={ref}>
          {icon == null ? null : (
            <div className={cn(styles.icon, iconClassName)}>{icon}</div>
          )}
          {title}
        </div>
        {subtitle == null ? null : (
          <div className={cn(styles.subtitle, subtitleClassName)}>
            {subtitle}
          </div>
        )}
      </>
    )
  }
)
