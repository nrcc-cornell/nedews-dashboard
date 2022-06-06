import React, { Component } from 'react'

export default class Footer extends Component { 
  render() {
    const today = new Date()
    return (
      <footer>
        <p style={{margin:"0.25em 0 0.5em"}}>
          <span style={{float:"left"}}>&copy;{today.getFullYear()} Northeast Drought Early Warning System</span>
          <span style={{float:"right"}}><a href="mailto:nrcc@cornell.edu?subject=NEDEWS feedback">Contact us</a></span>
        </p>
      </footer>
    )
  }
}