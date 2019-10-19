/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import usePageSize from 'hooks/page-size'
import usePrevious from 'hooks/previous'
import { useLayoutEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { animated, useSpring } from 'react-spring'

const Container = styled.div`
  overflow: hidden;
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

const Slider = ({ items, children: renderItem, getPageSize, start = 0 }) => {
  const [active, setActive] = useState(false)
  const [pageSize, ref] = usePageSize(getPageSize)
  const previousPageSize = usePrevious(pageSize)
  const [currentIdx, setCurrentIdx] = useState(start)
  const previousIdx = usePrevious(currentIdx)
  const [props, set] = useSpring(() => ({
    reset: true
  }))

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
    <Container>
      <Wrapper
        ref={ref}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}>
        {pageSize > 0 && (
          <Page style={props}>
            {getPageItems(items, currentIdx, pageSize).map(item => (
              <Item key={item.tmdbId} style={{ width: `${100 / pageSize}%` }}>
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
