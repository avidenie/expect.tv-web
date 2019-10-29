/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import usePrevious from 'hooks/previous'
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { animated, useSpring } from 'react-spring'
import useMeasure from 'use-measure'

const Container = styled.div`
  overflow: hidden;
  padding: ${props =>
    props.focusable && props.pageSize > 0
      ? `calc(((92vw - 0.125rem) / ${props.pageSize} - 0.125rem) * 0.5625 * 0.25) 0`
      : 0};
`
const Wrapper = styled.div`
  position: relative;
  padding: 0 calc(4% + 0.0625rem);
`
const Page = styled(animated.div)`
  white-space: nowrap;
`
const Item = styled.div`
  display: inline-block;
  transition: transform 350ms ease-out;
  padding: 0 0.0625rem;
  vertical-align: top;
`
const Handle = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 20, 0.5);
  width: 4%;
  height: 100%;
  color: #fff;
  &:hover {
    background: rgba(20, 20, 20, 0.7);
    cursor: pointer;
  }
  & > * {
    transition: all 100ms ease-out;
    opacity: 0.85;
  }
  &:hover > * {
    transform: scale(1.2);
    transition: all 250ms ease-in;
    opacity: 1;
  }
`
const HandlePrevious = styled(Handle)`
  left: 0;
`
const HandleNext = styled(Handle)`
  right: 0;
`

function getFromIdx(currentIdx, pageSize) {
  return Math.max(currentIdx - pageSize, 0)
}

function getPageItems(items, currentIdx, pageSize) {
  const fromIdx = getFromIdx(currentIdx, pageSize)
  const toIdx = Math.min(currentIdx + pageSize * 2, items.length)
  return items.slice(fromIdx, toIdx)
}

function getPageIndices(currentIdx, pageSize) {
  const fromIdx = getFromIdx(currentIdx, pageSize)
  return {
    firstIdx: currentIdx - fromIdx,
    lastIdx: currentIdx - fromIdx + pageSize - 1
  }
}

function getItemStyle(style = {}, itemIdx, focusedIdx, firstIdx, lastIdx) {
  if (firstIdx === itemIdx) {
    style.transformOrigin = 'center left'
  } else if (lastIdx === itemIdx) {
    style.transformOrigin = 'center right'
  }
  if (focusedIdx > -1) {
    style.transition = 'transform 500ms ease-in'
    if (focusedIdx === itemIdx) {
      style.transform = 'translateX(0%) scale(1.5)'
    } else if (focusedIdx === firstIdx) {
      if (itemIdx > focusedIdx) {
        style.transform = 'translateX(50%)'
      } else if (itemIdx < focusedIdx) {
        style.transform = 'translateX(0%)'
      }
    } else if (focusedIdx === lastIdx) {
      if (itemIdx < focusedIdx) {
        style.transform = 'translateX(-50%)'
      } else if (itemIdx > focusedIdx) {
        style.transform = 'translateX(0%)'
      }
    } else {
      if (itemIdx < focusedIdx) {
        style.transform = 'translateX(-25%)'
      } else if (itemIdx > focusedIdx) {
        style.transform = 'translateX(25%)'
      }
    }
  }
  return style
}

let focusedTimer = null
function clearFocusedTimer() {
  if (focusedTimer !== null) {
    clearTimeout(focusedTimer)
    focusedTimer = null
  }
}

const Slider = ({
  items,
  children: renderItem,
  getPageSize = width => {
    if (width === 0) {
      return 0
    } else {
      const pageSize = 2 + Math.ceil((width - 600) / 300)
      return Math.max(2, Math.min(pageSize, 8))
    }
  },
  start = 0,
  focusable = true
}) => {
  const nodeRef = useRef()
  const measurement = useMeasure(nodeRef)
  const pageSizeCallback = useCallback(getPageSize, [measurement.width])
  const pageSize = useMemo(() => pageSizeCallback(measurement.width), [
    pageSizeCallback,
    measurement.width
  ])
  const previousPageSize = usePrevious(pageSize)
  const [active, setActive] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(start)
  const previousIdx = usePrevious(currentIdx)
  const [props, set] = useSpring(() => ({
    reset: true
  }))
  const { firstIdx, lastIdx } = getPageIndices(currentIdx, pageSize)
  const [focusedIdx, setFocusedIdx] = useState(-1)

  useLayoutEffect(() => {
    const fromIdx = getFromIdx(currentIdx, pageSize)
    const translateFrom =
      pageSize > 0 ? (fromIdx - previousIdx) * (100 / pageSize) : 0
    const translateTo =
      pageSize > 0 ? (fromIdx - currentIdx) * (100 / pageSize) : 0
    set({
      from: {
        transform: `translateX(${translateFrom}%)`
      },
      to: {
        transform: `translateX(${translateTo}%)`
      },
      immediate: pageSize !== previousPageSize
    })
  }, [currentIdx, pageSize, previousIdx, previousPageSize, set])

  function previous(howMany) {
    setCurrentIdx(Math.max(currentIdx - howMany, 0))
  }

  function previousPage() {
    previous(pageSize)
  }

  function next(howMany) {
    setCurrentIdx(Math.min(currentIdx + howMany, items.length - pageSize))
  }

  function nextPage() {
    next(pageSize)
  }

  return (
    <Container
      ref={nodeRef}
      style={{
        padding:
          focusable && measurement.height > 0
            ? `${measurement.height * 0.25}px 0`
            : 0
      }}
      focusable={focusable}
      pageSize={pageSize}>
      <Wrapper
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}>
        {pageSize > 0 && (
          <Page style={props}>
            {getPageItems(items, currentIdx, pageSize).map((item, i) => (
              <Item
                key={item.tmdbId}
                style={getItemStyle(
                  { width: `${100 / pageSize}%` },
                  i,
                  focusedIdx,
                  firstIdx,
                  lastIdx
                )}
                onMouseEnter={() => {
                  if (focusable) {
                    clearFocusedTimer()
                    focusedTimer = setTimeout(
                      () => {
                        firstIdx <= i <= lastIdx && setFocusedIdx(i)
                      },
                      focusedIdx === -1 ? 500 : 0
                    )
                  }
                }}
                onMouseLeave={() => {
                  if (focusable) {
                    clearFocusedTimer()
                    firstIdx <= i <= lastIdx && setFocusedIdx(-1)
                  }
                }}>
                {renderItem(item)}
              </Item>
            ))}
          </Page>
        )}
        {active && currentIdx > 0 && (
          <HandlePrevious onClick={previousPage}>
            <FaChevronLeft />
          </HandlePrevious>
        )}
        {active && currentIdx < items.length - pageSize && (
          <HandleNext onClick={nextPage}>
            <FaChevronRight />
          </HandleNext>
        )}
      </Wrapper>
    </Container>
  )
}

export default Slider
