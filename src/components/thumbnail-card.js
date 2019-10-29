/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import { modularScale } from 'polished'
import qs from 'querystringify'
import { useState } from 'react'
import { fluidRange } from 'styles/helpers'

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
  line-height: 1;
  white-space: nowrap;
  color: #fff;
  font-weight: bold;
  ${props =>
    fluidRange(
      {
        prop: 'fontSize',
        fromSize: modularScale(2, '1em', 'minorSecond'),
        toSize: modularScale(3, '1em', 'minorSecond')
      },
      props.theme.breakpoints.xs,
      props.theme.breakpoints.xl
    )}
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

const renderLogo = item => {
  if (item.images.logo) {
    return <FallbackLogo src={getImageUrl(item.images.logo, { h: 120 })} />
  } else {
    return <FallbackTitle>{item.title}</FallbackTitle>
  }
}

const ThumbnailCard = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  let shouldRenderLogo = false
  let thumbnail
  if (item.images.thumbnail) {
    thumbnail = getImageUrl(item.images.thumbnail)
  } else if (item.images.backgrounds.length > 0) {
    thumbnail = getImageUrl(item.images.backgrounds[0])
    shouldRenderLogo = true
  } else if (item.images.poster) {
    thumbnail = getImageUrl(item.images.poster, {
      w: 480,
      h: 270,
      fit: 'contain',
      cbg: 'black'
    })
  }

  return (
    <Container>
      <Layer>
        {!isLoaded && <LoadingTitle>{item.title}</LoadingTitle>}
        {thumbnail && (
          <Thumbnail src={thumbnail} onLoad={() => setIsLoaded(true)} />
        )}
        {isLoaded && shouldRenderLogo && renderLogo(item)}
      </Layer>
    </Container>
  )
}

export default ThumbnailCard
