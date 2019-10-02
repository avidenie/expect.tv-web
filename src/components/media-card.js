/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import { useState } from 'react'
import qs from 'querystringify'

const Container = styled.div`
  position: relative;
  background: #222 linear-gradient(rgba(0, 0, 0, 0), #000);
  padding-top: 56.25%;
  height: 0;
  overflow: hidden;
`

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LoadingTitle = styled.div`
  position: absolute;
  right: 8%;
  bottom: 12%;
  left: 8%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
`

const FallbackLogo = styled.img`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
`

const FallbackTitle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
  padding: 5%;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`

const getImageUrl = (
  imageUrl,
  imageParams = { w: 480, h: 270, fit: 'cover' }
) => {
  const params = {
    url: imageUrl,
    ...imageParams
  }
  return `https://images.weserv.nl/${qs.stringify(params, true)}`
}

const renderLogo = media => {
  if (media.images.logo) {
    return <FallbackLogo src={getImageUrl(media.images.logo, { h: 120 })} />
  } else {
    return <FallbackTitle>{media.title}</FallbackTitle>
  }
}

const MediaCard = ({ media }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  let shouldRenderLogo = false
  let thumbnail
  if (media.images.thumbnail) {
    thumbnail = getImageUrl(media.images.thumbnail)
  } else if (media.images.backgrounds.length > 0) {
    thumbnail = getImageUrl(media.images.backgrounds[0])
    shouldRenderLogo = true
  } else if (media.images.poster) {
    thumbnail = getImageUrl(media.images.poster, {
      w: 480,
      h: 270,
      fit: 'contain',
      cbg: 'black'
    })
  }

  return (
    <Container>
      <Layer>
        {!isLoaded && <LoadingTitle>{media.title}</LoadingTitle>}
        {thumbnail && (
          <Thumbnail src={thumbnail} onLoad={() => setIsLoaded(true)} />
        )}
        {isLoaded && shouldRenderLogo && renderLogo(media)}
      </Layer>
    </Container>
  )
}

export default MediaCard
