import App from "next/app";

import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'

import charts from '../states/index'

const overmind = createOvermind(charts)

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
        <Provider value={overmind}>
          <Component {...pageProps} />
        </Provider>
    );
  }
}
export default MyApp;