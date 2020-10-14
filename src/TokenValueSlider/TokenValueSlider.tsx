import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import styles from './TokenValueSlider.module.css'
import { getBNPercentage } from 'utils/bnHelpers'
import { ValueSliderProps } from './types'

const messages = {
  min: 'MIN',
  max: 'MAX',
  current: 'CURRENT'
}

const ValueSlider: React.FC<ValueSliderProps> = ({
  className,
  sliderClassName,
  min,
  max,
  minSliderWidth,
  value,
  initialValue,
  isIncrease,
  valueWrapper
}: ValueSliderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const maxValueRef = useRef<HTMLDivElement | null>(null)
  const minValueRef = useRef<HTMLDivElement | null>(null)

  const [initialSliderWidth, setInitialSliderWidth] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const ValueWrapper = valueWrapper
  useEffect(() => {
    if (containerRef.current) {
      const percentage = getBNPercentage(value.sub(min), max.sub(min))
      const totalWidth = containerRef.current.offsetWidth
      if (value.sub(min).isZero()) {
        setSliderWidth(0)
      } else {
        const newSliderWidth = Math.max(totalWidth * percentage, minSliderWidth)
        setSliderWidth(newSliderWidth)
      }
    }
  }, [value, containerRef, max, min, setSliderWidth, minSliderWidth])

  useEffect(() => {
    if (initialValue && !initialSliderWidth && containerRef.current) {
      const percentage = getBNPercentage(initialValue.sub(min), max.sub(min))
      const totalWidth = containerRef.current.offsetWidth
      const newSliderWidth = Math.max(totalWidth * percentage, minSliderWidth)
      setInitialSliderWidth(newSliderWidth)
    }
  }, [
    initialValue,
    containerRef,
    minSliderWidth,
    max,
    min,
    initialSliderWidth,
    setInitialSliderWidth
  ])

  return (
    <div
      className={cn(styles.container, { [className!]: !!className })}
      ref={containerRef}
    >
      <div
        className={cn(styles.slider, { [sliderClassName!]: !!sliderClassName })}
      >
        <div
          className={cn(styles.newValueSlider, {
            [styles.invalid]: value.gt(max) || value.lt(min),
            [styles.lighter]: isIncrease
          })}
          style={{ width: sliderWidth }}
        />
        <div
          className={cn(styles.initialValueSlider, {
            [styles.lighter]: !isIncrease
          })}
          style={{ width: initialSliderWidth }}
        />
      </div>
      <div className={styles.minMax}>
        {min && (
          <div ref={maxValueRef} className={styles.minValue}>
            <span className={styles.minLabel}>
              {isIncrease !== undefined
                ? isIncrease
                  ? messages.current
                  : messages.min
                : messages.min}
            </span>
            {ValueWrapper ? (
              <ValueWrapper value={min} />
            ) : (
              <span>{min.toString()}</span>
            )}
          </div>
        )}
        {max && (
          <div ref={minValueRef} className={styles.maxValues}>
            {ValueWrapper ? (
              <ValueWrapper value={max} />
            ) : (
              <span>{max.toString()}</span>
            )}
            <span className={styles.maxLabel}>
              {isIncrease !== undefined
                ? isIncrease
                  ? messages.max
                  : messages.current
                : messages.max}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ValueSlider