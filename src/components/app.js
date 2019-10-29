import { Global } from '@emotion/core'
import PopularMovies from 'components/popular-movies'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import global from 'styles/global'
import theme from 'styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global key="global-css" styles={global} />
      <PopularMovies />
    </ThemeProvider>
  )
}

export default App
