export type ProgressBarProps = {
  className?: string
  sliderClassName?: string
  sliderBarClassName?: string
  min?: number
  max?: number
  value: number
  showLabels?: boolean
  minWrapper?: React.ComponentType<{ value: number }>
  maxWrapper?: React.ComponentType<{ value: number }>
}
