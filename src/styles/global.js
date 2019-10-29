import css from '@emotion/css/macro'
import { darken } from 'polished'
import { fluidRange } from 'styles/helpers'

export default theme => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    line-height: 1.15;
    font-family: sans-serif;
    font-size: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body {
    margin: 0;
    background-color: ${theme.colors.background};
    text-align: left;
    line-height: 1.5;
    color: ${theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    ${fluidRange(
      {
        prop: 'fontSize',
        fromSize: '0.9375em',
        toSize: '1.1875em'
      },
      theme.breakpoints.xs,
      theme.breakpoints.xl
    )}
    font-weight: 400;
  }
  [tabindex='-1']:focus {
    outline: 0 !important;
  }
  a {
    background-color: transparent;
    text-decoration: none;
    color: ${theme.colors.primary};
  }
  a:hover {
    text-decoration: underline;
    color: ${darken(0.15, theme.colors.primary)};
  }
`
