import { useEffect, useRef, useState } from 'react'

export default function useGraphScroll(sectionCount) {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const offset = 200

    function reposition() {
      const container = containerRef.current
      const sectionEls = sectionsRef.current
      if (!container || !sectionEls.length) return

      const containerTop = container.getBoundingClientRect().top + window.pageYOffset
      const containerBottom = container.getBoundingClientRect().bottom + window.pageYOffset
      const graphHeight = container.querySelector('.gs-graph')?.getBoundingClientRect().height ?? 0
      const belowStart = containerBottom - graphHeight

      let i1 = 0
      sectionEls.forEach((el, i) => {
        if (!el) return
        const pos = el.getBoundingClientRect().top + window.pageYOffset - containerTop
        if (pos < window.pageYOffset - containerTop + offset) i1 = i
      })
      i1 = Math.min(sectionCount - 1, i1)

      if (window.pageYOffset > belowStart) i1 = sectionCount - 1

      setActiveIndex(i1)
    }

    window.addEventListener('scroll', reposition)
    window.addEventListener('resize', reposition)
    reposition()

    return () => {
      window.removeEventListener('scroll', reposition)
      window.removeEventListener('resize', reposition)
    }
  }, [sectionCount])

  return { containerRef, sectionsRef, activeIndex }
}
