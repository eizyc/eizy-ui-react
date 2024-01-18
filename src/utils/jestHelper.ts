/**
 * @jest-environment node
 */
const sass = require('sass')
const sassRender = sass.renderSync

export const renderScss = (file:string) => {
  return sassRender({
    file,
    outputStyle: 'compressed',
  }).css.toString()
}