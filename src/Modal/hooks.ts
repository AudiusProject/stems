import { useCallback, useEffect, useState } from 'react'

export const setOverflowHidden = () => {
  document.body.setAttribute('style', 'overflow:hidden;')
}

export const removeOverflowHidden = () => {
  document.body.setAttribute('style', '')
}

export const setModalRootTop = () => {
  const root = document.getElementById('modalRootContainer')
  if (root) {
    root.setAttribute('style', `top: ${window.scrollY}px`)
  }
}

export const useModalScrollCount = () => {
  const [count, setCount] = useState(0)
  const [isOverflowHidden, setIsOverflowHidden] = useState(false)
  useEffect(() => {
    if (!isOverflowHidden && count > 0) {
      setIsOverflowHidden(true)
      setOverflowHidden()
      setModalRootTop()
    } else if (isOverflowHidden && count === 0) {
      setIsOverflowHidden(false)
      removeOverflowHidden()
    }
  }, [count, isOverflowHidden])

  const incrementScrollCount = useCallback(() => setCount(count => count + 1), [
    setCount
  ])
  const decrementScrollCount = useCallback(() => setCount(count => count - 1), [
    setCount
  ])

  return {
    incrementScrollCount,
    decrementScrollCount
  }
}
