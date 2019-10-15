/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import usePageSize from 'hooks/page-size'
import usePrevious from 'hooks/previous'
import { Fragment, useLayoutEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { animated, useSpring } from 'react-spring'

const Container = styled.div`
  position: relative;
  padding: 0 4% 0 calc(4% + 0.125rem);
  overflow: hidden;
`
const Wrapper = styled(animated.div)`
  white-space: nowrap;
`
const Item = styled.div`
  display: inline-block;
  padding-right: 0.125rem;
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
  > * {
    opacity: 0.85;
  }
  &:hover {
    background: rgba(20, 20, 20, 0.7);
    cursor: pointer;
  }
  &:hover > * {
    transform: scale(1.2);
    opacity: 1;
  }
`
const HandlePrevious = styled(Handle)`
  left: 0;
`
const HandleNext = styled(Handle)`
  right: 0;
`

function getStartIdx(currentIdx, pageSize) {
  return Math.max(currentIdx - pageSize, 0)
}

function getPageItems(items, currentIdx, pageSize) {
  const startIdx = getStartIdx(currentIdx, pageSize)
  const endIdx = Math.min(currentIdx + pageSize * 2, items.length)
  return items.slice(startIdx, endIdx)
}

const Slider = ({ items, children: renderFrame, getPageSize, start = 0 }) => {
  const [active, setActive] = useState(false)
  const [pageSize, ref] = usePageSize(getPageSize)
  const previousPageSize = usePrevious(pageSize)
  const [currentIdx, setCurrentIdx] = useState(start)
  const previousIdx = usePrevious(currentIdx)
  const [props, set] = useSpring(() => ({
    reset: true
  }))

  useLayoutEffect(() => {
    const startIdx = getStartIdx(currentIdx, pageSize)
    const from = pageSize > 0 ? (startIdx - previousIdx) * (100 / pageSize) : 0
    const to = pageSize > 0 ? (startIdx - currentIdx) * (100 / pageSize) : 0
    set({
      from: {
        transform: `translateX(${from}%)`
      },
      to: {
        transform: `translateX(${to}%)`
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
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}>
      {pageSize > 0 && (
        <Fragment>
          <Wrapper style={props}>
            {getPageItems(items, currentIdx, pageSize).map(item => (
              <Item
                key={item.tmdbId}
                style={{ width: `${pageSize > 0 ? 100 / pageSize : 0}%` }}>
                {renderFrame(item)}
              </Item>
            ))}
          </Wrapper>
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
        </Fragment>
      )}
    </Container>
  )
}

export default Slider
