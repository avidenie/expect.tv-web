/** @jsx jsx */
import { css, jsx } from '@emotion/core'

function App() {
  return (
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
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  )
}

export default App
