import React from 'react'
import { Global } from '@emotion/core'
import PopularMovies from 'components/popular-movies'
import { Fragment } from 'react'
import global from 'styles/global'

function App() {
  return (
    <Fragment>
      <Global key="global-css" styles={global} />
      <PopularMovies key="popular-movies" />
    </Fragment>
  )
}

export default App
