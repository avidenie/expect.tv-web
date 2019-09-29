import MediaCard from 'components/media-card'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import css from '@emotion/css/macro'
import { addDecorator } from '@storybook/react'

const media = {
  tmdbId: 299534,
  title: 'Avengers: Endgame',
  images: {
    poster:
      'https://assets.fanart.tv/fanart/movies/299534/movieposter/avengers-infinity-war---part-ii-5c8c28d2aae85.jpg',
    thumbnail:
      'https://assets.fanart.tv/fanart/movies/299534/moviethumb/avengers-infinity-war---part-ii-5c82d423b3655.jpg',
    logo:
      'https://assets.fanart.tv/fanart/movies/299534/hdmovielogo/avengers-infinity-war---part-ii-5c12c9cb63356.png',
    backgrounds: [
      'https://assets.fanart.tv/fanart/movies/299534/moviebackground/avengers-endgame-5c979f35948c7.jpg',
      'https://assets.fanart.tv/fanart/movies/299534/moviebackground/avengers-endgame-5ca4a8441f9ca.jpg',
      'https://assets.fanart.tv/fanart/movies/299534/moviebackground/avengers-endgame-5cb1c192459bc.jpg'
    ]
  }
}

const maxWidthDecorator = story => (
  <div
    css={css`
      width: 25rem;
    `}>
    {story()}
  </div>
)

addDecorator(maxWidthDecorator)

export default {
  title: 'Media Card'
}

export const thumbnail = () => <MediaCard media={media} />

export const logoFallback = () => (
  <MediaCard
    media={{
      ...media,
      images: {
        ...media.images,
        thumbnail: null
      }
    }}
  />
)

export const textFallback = () => (
  <MediaCard
    media={{
      ...media,
      images: {
        ...media.images,
        thumbnail: null,
        logo: null
      }
    }}
  />
)

export const posterFallback = () => (
  <MediaCard
    media={{
      ...media,
      images: {
        ...media.images,
        thumbnail: null,
        backgrounds: []
      }
    }}
  />
)

export const noImages = () => (
  <MediaCard
    media={{
      ...media,
      images: {
        poster: null,
        thumbnail: null,
        logo: null,
        backgrounds: []
      }
    }}
  />
)
