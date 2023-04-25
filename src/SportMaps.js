import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

export default class SportMaps extends Component {
  constructor () {
    super()
    this.mapnames = ['vsm0-10','vsm0-40','vsm0-100','vsm0-200']
    this.mapurl = 'https://weather.msfc.nasa.gov/sport/dynamic/lis_NEUS//'
    this.maptitles = {
        'vsm0-10': 'VSM 0-10cm',
        'vsm0-40': 'VSM 0-40cm',
        'vsm0-100': 'VSM 0-100cm',
        'vsm0-200': 'VSM 0-200cm',
    }
  }

  render() {
    const mapHeader = "SPoRT Volumetric Soil Moisture Maps"

    let today = new Date()
    let month = '' + (today.getMonth() + 1)
    let day = '' + today.getDate()
    let year = today.getFullYear()
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    const datePart = [year, month, day].join('')

    let sportMaps = []
    this.mapnames.forEach((t) => {
      const mapname = this.mapurl + t + "percent_" + datePart + "_00z_neus.gif"
      sportMaps.push({
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
          with potentially incorrect input data to SPoRT causing excessive dry conditions being indicated over 
          the Northeast and North Central US.</span>
        </div>
        <ImageGallery 
          items={sportMaps} 
          thumbnailPosition="top"
          showFullscreenButton={false}
          showPlayButton={false}
          slideDuration={200}
          slideInterval={9999}
        />
        <div style={{textAlign:"right", margin:"0 1em 1em 0"}}>
          <a href="https://weather.msfc.nasa.gov/sport/case_studies/lis_NEUS.html" target="_blank">More SPoRT maps</a>
        </div>
      </Collapsible>
    )
  }
}