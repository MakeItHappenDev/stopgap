const withSass = require('@zeit/next-sass')
const withWorkbox = require('next-workbox');
const withPlugins = require('next-compose-plugins');
//const withCSS = require('@zeit/next-css')

const WB = {
  generateBuildId: async () => {
    // You must have own custom build id
    return 'stopgap.1.0.1';
  }
}


module.exports =  withPlugins([
  [withSass,{
    cssModules: true,
  }],
  [withWorkbox,WB]
]);
