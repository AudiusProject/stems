import { useEffect, useRef } from 'react'

/**
 * Custom hook that fires an onClick callback when the user clicks
 * outside of the element referenced by the returned ref.
 *
 * @param onClick the callback fired when a click is performed "outside"
 * @param isException optional check to be run on the element that receives
 * the "click." If isException returns true, the click is not considered outside
 * even if it was outside the element referenced.
  
 * @returns a ref that should be used to mark the "inside" element
 */
const useClickOutside = (
  onClick: () => void,
  isException: (target: EventTarget) => boolean = () => false
) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !ref.current ||
        (ref.current && ref.current.contains(e.target)) ||
        isException(e.target)
      ) {
        return
      }
      onClick()
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClick, isException])

  return ref
}

export default useClickOutside
