const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')
const withPlugins = require('next-compose-plugins');

module.exports =  withPlugins([
  [withSass,{
    cssModules: true,
  }],
  [withOffline],
]);

//withOffline(withCSS(withSass({
//  cssModules: true
//})))