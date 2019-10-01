import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import Slider from 'components/slider'

const GET_POPULAR_MOVIES = gql`
  {
    popularMovies(region: "US", language: "en") {
      __typename
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

  return <Slider mediaItems={data.popularMovies} />
}

export default PopularMovies
