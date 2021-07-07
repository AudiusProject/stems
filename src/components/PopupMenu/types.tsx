import { PopupProps } from '../Popup'

export type PopupMenuProps = {
  /**
   * The items to display in the menu
   */
  items: PopupMenuItem[]

  /**
   * A callback triggered when the menu is closed
   */
  onClose?: () => void
  /**
   * A render function that will be provided:
   * - An anchorRef for positioning the menu
   * - A triggerPopup function that will show/hide the popup
   */
  renderTrigger: (
    anchorRef: React.MutableRefObject<any>,
    triggerPopup: () => void
  ) => React.ReactNode | Element
} & Pick<PopupProps, 'position' | 'title' | 'zIndex'>

export type PopupMenuItem = {
  /**
   * An optional icon to display with the menu item
   */
  icon?: object
  /**
   * An optional className to apply to the icon
   */
  iconClassName?: string
  /**
   * A function triggered when the menu item is clicked
   */
  onClick: () => void
  /**
   * The text of the menu item
   */
  text: string
}
