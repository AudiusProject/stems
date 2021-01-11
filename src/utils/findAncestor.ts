/**
 * Legacy browser support for `Element.closest`
 * @param el
 * @param selector query selector
 */
const findAncestor = (el: Element, selector: string) => {
  if (el.closest) {
    return el.closest(selector)
  }
  // Fall back to just looping back through parents
  while (
    (el = el.parentElement) &&
    // @ts-ignore
    !(el.matches || el.matchesSelector).call(el, selector)
  );
  return el
}

export default findAncestor