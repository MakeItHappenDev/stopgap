import App from "next/app";

import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'

import charts from '../states/index'

const overmind = createOvermind(charts)

class MyApp extends App {

  // TODO remove in dev mode
  componentDidMount() {
    if ("serviceWorker" in navigator && process.env.NODE_ENV !== "development") {
      navigator.serviceWorker
        .register("/sw.js")
        .then(registration => {
          console.log("service worker registration successful: ", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

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