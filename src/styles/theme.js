import { math } from 'polished'

const colors = {
  text: '#212529',
  background: '#fff',
  primary: '#007bff'
}

const breakpoints = [
  /*  600px */ '37.5em',
  /*  900px */ '56.25em',
  /* 1200px */ '75em',
  /* 1500px */ '93.75em',
  /* 1800px */ '112.5em',
  /* 2100px */ '131.25em'
]

breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]
breakpoints.xxl = breakpoints[5]

const mediaQueries = {
  min: {
    xs: `@media (min-width: ${breakpoints.xs})`,
    sm: `@media (min-width: ${breakpoints.sm})`,
    md: `@media (min-width: ${breakpoints.md})`,
    lg: `@media (min-width: ${breakpoints.lg})`,
    xl: `@media (min-width: ${breakpoints.xl})`
  },

  max: {
    xs: `@media (max-width: ${math(`${breakpoints.sm} - 0.00125em`)})`,
    sm: `@media (max-width: ${math(`${breakpoints.md} - 0.00125em`)})`,
    md: `@media (max-width: ${math(`${breakpoints.lg} - 0.00125em`)})`,
    lg: `@media (max-width: ${math(`${breakpoints.xl} - 0.00125em`)})`,
    xl: `@media (max-width: ${math(`${breakpoints.xxl} - 0.00125em`)})`
  },

  only: {
    xxs: `@media (max-width: ${math(`${breakpoints.xs} - 0.00125em`)})`,
    xs: `@media (min-width: ${breakpoints.xs}) and (max-width: ${math(
      `${breakpoints.sm} - 0.00125em`
    )})`,
    sm: `@media (min-width: ${breakpoints.sm}) and (max-width: ${math(
      `${breakpoints.md} - 0.00125em`
    )})`,
    md: `@media (min-width: ${breakpoints.md}) and (max-width: ${math(
      `${breakpoints.lg} - 0.00125em`
    )})`,
    lg: `@media (min-width: ${breakpoints.lg}) and (max-width: ${math(
      `${breakpoints.xl} - 0.00125em`
    )})`,
    xl: `@media (min-width: ${breakpoints.xl}) and (max-width: ${math(
      `${breakpoints.xxl} - 0.00125em`
    )})`,
    xxl: `@media (min-width: ${breakpoints.xxl})`
  }
}

const theme = {
  colors,
  breakpoints,
  mediaQueries
}

export default theme
