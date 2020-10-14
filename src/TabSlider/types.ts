export type Option = {
  key: string
  text: string
}

export type TabSliderProps = {
  // The options to display for the tab slider
  options: Array<Option>

  // References the key of an available option that is selected
  selected: string

  // Called on select option
  onSelectOption: (key: string) => void

  fullWidth?: boolean

  isMobile?: boolean

  /**
   * Escape hatch for styles.
   */
  className?: string
}

export default TabSliderProps