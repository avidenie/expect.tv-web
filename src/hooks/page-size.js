import { useCallback, useLayoutEffect, useState } from 'react'

export default function usePageSize(
  getPageSize = width => {
    if (width <= 500) {
      return 2
    } else if (width > 2000) {
      return 8
    } else {
      return 2 + Math.ceil((width - 500) / 300)
    }
  }
) {
  const [pageSize, setPageSize] = useState(0)
  const [node, setNode] = useState(null)
  const ref = useCallback(node => {
    if (node !== null) {
      setNode(node)
    }
  }, [])
  useLayoutEffect(() => {
    if (node) {
      function measure() {
        window.requestAnimationFrame(() =>
          setPageSize(getPageSize(node.getBoundingClientRect().width))
        )
      }
      measure()
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
  }, [getPageSize, node])
  return [pageSize, ref]
}
