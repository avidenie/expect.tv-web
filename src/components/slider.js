/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import MediaCard from 'components/media-card'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.div`
  flex: 1 1 auto;
  padding: 0.125rem;
  min-width: 20rem;
`

const Slider = ({ mediaItems }) => {
  return (
    <Container>
      {mediaItems.map(media => (
        <Item key={media.tmdbId}>
          <MediaCard media={media} />
        </Item>
      ))}
    </Container>
  )
}

export default Slider
