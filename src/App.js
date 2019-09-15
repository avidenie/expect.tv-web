/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'
import logo from './logo.svg'

const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

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
        <img
          src={logo}
          css={css`
            animation: ${appLogoSpin} infinite 20s linear;
            height: 40vmin;
            pointer-events: none;
          `}
          alt="logo"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          css={{ color: '#61dafb' }}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
