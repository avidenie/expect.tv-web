/** @jsx jsx */
import { jsx } from '@emotion/core'
import css from '@emotion/css/macro'
import ThumbnailCard from 'components/thumbnail-card'

const item = {
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

export default {
  title: 'Thumbnail Card',
  decorators: [maxWidthDecorator]
}

export const thumbnail = () => <ThumbnailCard item={item} />

export const logoFallback = () => (
  <ThumbnailCard
    item={{
      ...item,
      images: {
        ...item.images,
        thumbnail: null
      }
    }}
  />
)

export const textFallback = () => (
  <ThumbnailCard
    item={{
      ...item,
      images: {
        ...item.images,
        thumbnail: null,
        logo: null
      }
    }}
  />
)

export const posterFallback = () => (
  <ThumbnailCard
    item={{
      ...item,
      images: {
        ...item.images,
        thumbnail: null,
        backgrounds: []
      }
    }}
  />
)

export const noImages = () => (
  <ThumbnailCard
    item={{
      ...item,
      images: {
        poster: null,
        thumbnail: null,
        logo: null,
        backgrounds: []
      }
    }}
  />
)
