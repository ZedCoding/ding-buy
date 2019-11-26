const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: config => { 
    config.resolve.alias
      .set("@", resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  devServer: {
    open: true,
  }
}