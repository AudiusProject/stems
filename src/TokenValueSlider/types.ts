import BN from 'bn.js'

export type ValueSliderProps = {
  className?: string
  sliderClassName?: string
  min?: BN
  max?: BN
  value: BN
  minSliderWidth?: number
  initialValue?: BN
  isIncrease?: boolean
  valueWrapper?: React.ComponentType<{ value: BN }>
}

export default ValueSliderProps