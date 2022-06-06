import React, { Component } from 'react'

export default class Banner extends Component {
  constructor () {
    super()
    this.nidisLogo = "img/nidisLogoT.png"
    this.nrccLogo = "img/nrccLogoStackedT.png"
  }

  render() {
    return (
      <div className="banner-container">
        <a href="https://drought.gov" target="_blank"><img src={this.nidisLogo} alt="NIDIS" /></a>
        <h2>Northeast DEWS Dashboard</h2>
         <a href="http://www.nrcc.cornell.edu" target="_blank"><img src={this.nrccLogo} alt="NRCC" /></a>
      </div>
    )
  }
}
