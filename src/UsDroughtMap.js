import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'

export default class UsDroughtMap extends Component { 
  constructor() {
    super()
    this.droughtMapUrl = "https://droughtmonitor.unl.edu/data/png/current/current_"
    this.droughtMapLink = "https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?Northeast"
    this.changeMapUrl = "https://droughtmonitor.unl.edu/data/chng/png/current/current_"
    this.changeMapLink = "https://droughtmonitor.unl.edu/Maps/ChangeMaps.aspx"
  }

  render() {
    const selectedState = this.props.selectedState === "nedews" ? "rdews_northeast" : (this.props.selectedState === "northeast" ? "northeast" : this.props.selectedState);
    const droughtImage = this.droughtMapUrl + selectedState + "_text.png"
    const chngImage = this.changeMapUrl + selectedState + "_chng_1W.png"
    return (
      <Collapsible trigger="US Drought Monitor (updated weekly)" triggerTagName="h4" open={true} transitionTime={200}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={6}>
            <a href={this.droughtMapLink} target="_blank">
              <img src={droughtImage} className="dmmap-bigimage-border" alt="drought map" />
            </a>
          </Grid>
          <Grid item xs={12} sm={6}>
            <a href={this.changeMapLink} target="blank"> 
              <img src={chngImage} className="dmmap-bigimage" alt="drought change map" />
            </a>
          </Grid>
        </Grid>
      </Collapsible>
    )
  }
}