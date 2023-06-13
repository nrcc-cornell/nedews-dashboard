import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

export default class EddiMaps extends Component {
  constructor () {
    super()
    this.mapnames = ['eddi01wk','eddi02wk','eddi03wk','eddi01mn','eddi02mn','eddi03mn']
    this.mapurl = 'EDDI_maps/'
    this.maptitles = {
      eddi01wk: 'EDDI_01wk',
      eddi02wk: 'EDDI_02wk',
      eddi03wk: 'EDDI_03wk',
      eddi01mn: 'EDDI_01mn',
      eddi02mn: 'EDDI_02mn',
      eddi03mn: 'EDDI_03mn'
    }
  }

  render() {
    const mapHeader = "Evaporative Demand Drought Index Maps"
    let pcpnMaps = []
    this.mapnames.forEach((t) => {
      const mapname = this.mapurl + this.maptitles[t] + ".png"
      pcpnMaps.push({
        original: mapname,
        thumbnail: mapname,
        thumbnailTitle: this.maptitles[t] || "",
        thumbnailLabel: this.maptitles[t] || ""
      })
    })
    return (
      <Collapsible trigger={mapHeader} triggerTagName="h4" open={false} transitionTime={200}>
        <div style={{border:"1pt solid #555d2f", margin:"0.5em", padding:"6px", backgroundColor:"pink", color:"#darkgreen", fontSize:"80%", textAlign:"center"}}>
          <span>Please read <a href="https://psl.noaa.gov/eddi/warn.html" target="_blank">this</a> for an issue 
          with potentially incorrect input data to EDDI causing excessive dry conditions being indicated over 
          the Northeast during periods last winter with snow cover. Currently, any EDDI data that are of a long 
          enough timescale to have included data from the snow-covered period will be biased hot and therefore dry.
          </span>
        </div>
        <ImageGallery 
          items={pcpnMaps} 
          thumbnailPosition="top"
          showFullscreenButton={false}
          showPlayButton={false}
          slideDuration={200}
          slideInterval={9999}
        />
        <div style={{textAlign:"right", margin:"0 1em 1em 0"}}>
          <a href="https://wwa.colorado.edu/publications/reports/EDDI_2-pager.pdf" target="_blank">About EDDI</a>
        </div>
      </Collapsible>
    )
  }
}