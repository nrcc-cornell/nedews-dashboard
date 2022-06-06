import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Banner from './Banner.js'
import Monitor from './Monitor.js'
import Links from './Links.js'
import Footer from './Footer.js'

export default class App extends Component {

  render() {
    ReactGA.initialize('UA-123759749-1')
    ReactGA.pageview('DEWS-pageview')
    return (
      <div className="app">
        <Banner />
        <Monitor />
        <Links />
        <Footer />
      </div>
    )
  }
}