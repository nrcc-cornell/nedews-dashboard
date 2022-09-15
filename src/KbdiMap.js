import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'

export default class UsDroughtMap extends Component { 
  constructor() {
    super()
    this.mapUrl = "https://nedews.nrcc.cornell.edu/NRCC_maps/kbdi_"
  }

  render() {
    const mapImage = this.mapUrl + this.props.selectedState + "_current.png"
    return (
      <Collapsible trigger="NRCC Gridded KBDI" triggerTagName="h4" open={false} transitionTime={200}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={6}>
            <div style={{width:"100%", maxWidth:"500px", textAlign:"center"}}>
                <a href={mapImage} target="_blank">
                    <img src={mapImage} alt="kbdi map" style={{width:"100%"}} />
                    Click to view image in a new window
                </a>
            </div>
          </Grid>
        </Grid>
      </Collapsible>
    )
  }
}