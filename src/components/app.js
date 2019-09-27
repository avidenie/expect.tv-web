/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import { Fragment } from 'react'
import global from 'styles/global'

function App() {
  return (
    <Fragment>
      <Global styles={global} />
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
