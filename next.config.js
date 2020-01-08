const withCSS = require("@zeit/next-css");
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')

module.exports =  withOffline(withCSS(withSass({
  cssModules: true
})))