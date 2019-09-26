/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }
        `}
      />
      <div css={{ textAlign: 'center' }}>
        <header
          css={css`
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          `}>
          <p>
            Edit <code>src/components/app.js</code> and save to reload.
          </p>
        </header>
      </div>
    </Fragment>
  )
}

export default App
