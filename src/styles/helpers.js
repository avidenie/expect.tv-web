import { stripUnit } from 'polished'

function between(fromSize, toSize, minScreen, maxScreen) {
  const unitlessFromSize = stripUnit(fromSize)
  const unitlessToSize = stripUnit(toSize)
  const unitlessMinScreen = stripUnit(minScreen)
  const unitlessMaxScreen = stripUnit(maxScreen)

  return `calc(${fromSize} + ${unitlessToSize -
    unitlessFromSize} * ((100vw - ${minScreen}) / ${unitlessMaxScreen -
    unitlessMinScreen}))`
}

export function fluidRange(cssProp, minScreen, maxScreen) {
  if (Array.isArray(cssProp)) {
    const mediaQueries = {}
    const fallbacks = {}
    for (const obj of cssProp) {
      fallbacks[obj.prop] = obj.fromSize
      mediaQueries[`@media (min-width: ${minScreen})`] = {
        ...mediaQueries[`@media (min-width: ${minScreen})`],
        [obj.prop]: between(obj.fromSize, obj.toSize, minScreen, maxScreen)
      }
      mediaQueries[`@media (min-width: ${maxScreen})`] = {
        ...mediaQueries[`@media (min-width: ${maxScreen})`],
        [obj.prop]: obj.toSize
      }
    }

    return {
      ...fallbacks,
      ...mediaQueries
    }
  } else {
    return {
      [cssProp.prop]: cssProp.fromSize,
      [`@media (min-width: ${minScreen})`]: {
        [cssProp.prop]: between(
          cssProp.fromSize,
          cssProp.toSize,
          minScreen,
          maxScreen
        )
      },
      [`@media (min-width: ${maxScreen})`]: {
        [cssProp.prop]: cssProp.toSize
      }
    }
  }
}
