/** @jsx jsx */
import { jsx } from '@emotion/core'
import css from '@emotion/css/macro'
import { useState } from 'react'

const MediaCard = ({ media }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  let shouldRenderLogo = false
  let thumbnail
  if (media.images.thumbnail) {
    thumbnail = `//images.weserv.nl/?url=${media.images.thumbnail}&w=480&h=270`
  } else if (media.images.backgrounds.length > 0) {
    thumbnail = `//images.weserv.nl/?url=${
      media.images.backgrounds[0]
    }&w=320&h=180`
    shouldRenderLogo = true
  } else if (media.images.poster) {
    thumbnail = `//images.weserv.nl/?url=${media.images.poster}&w=480&h=270&fit=contain&cbg=black`
  }

  const renderLogo = () => {
    if (media.images.logo) {
      const logo = `//images.weserv.nl/?url=${media.images.logo}&h=120`
      return (
        <div>
          <img
            src={logo}
            css={css`
              position: absolute;
              bottom: 5%;
              left: 50%;
              transform: translateX(-50%);
              width: 40%;
            `}
            alt=""
          />
        </div>
      )
    } else {
      return (
        <div>
          <p
            css={css`
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              margin: 0;
              background: linear-gradient(
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0.75)
              );
              padding: 5%;
              overflow: hidden;
              text-align: center;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #fff;
              font-size: 1.5rem;
              font-weight: bold;
            `}>
            {media.title}
          </p>
        </div>
      )
    }
  }

  return (
    <div
      css={css`
        position: relative;
        background: #222 linear-gradient(rgba(0, 0, 0, 0), #000);
        padding-top: 56.25%;
        height: 0;
        overflow: hidden;

        & > * {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}>
      {!isLoaded && (
        <div>
          <p
            css={css`
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
            `}>
            {media.title}
          </p>
        </div>
      )}
      {thumbnail && (
        <div>
          <img
            src={thumbnail}
            onLoad={() => setIsLoaded(true)}
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
            alt=""
          />
        </div>
      )}
      {isLoaded && shouldRenderLogo && renderLogo()}
    </div>
  )
}

export default MediaCard
