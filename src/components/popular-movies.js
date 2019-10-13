import { useQuery } from '@apollo/react-hooks'
import MediaCard from 'components/media-card'
import Slider from 'components/slider'
import gql from 'graphql-tag'
import React from 'react'

const GET_POPULAR_MOVIES = gql`
  query getPopularMovies {
    popularMovies(region: "US", language: "en") {
      tmdbId
      title
      images {
        poster
        thumbnail
        logo
        backgrounds(limit: 1)
      }
    }
  }
`

const PopularMovies = () => {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES)

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <Slider items={data.popularMovies}>
      {item => <MediaCard media={item} />}
    </Slider>
  )
}

export default PopularMovies
