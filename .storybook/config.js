/** @jsx jsx */
import { Global, jsx } from '@emotion/core'
import { addDecorator, configure } from '@storybook/react'
import { Fragment } from 'react'
import global from 'styles/global'

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module)

// load global CSS
const globalCssDecorator = story => (
  <Fragment>
    <Global key="global-css" styles={global} />
    {story()}
  </Fragment>
)
addDecorator(globalCssDecorator)
