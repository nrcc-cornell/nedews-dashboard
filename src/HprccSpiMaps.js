import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'
import Collapsible from 'react-collapsible'
import "react-image-gallery/styles/css/image-gallery.css";

export default class HprccSpiMaps extends Component {
  static mapurl = 'https://hprcc.unl.edu/products/maps/acis/'
  static mapnames = ['30d','60d','90d','6m','12m']
  static maptitles = {
    '30d': '30-Day',
    '60d': '60-Day',
    '90d': '90-Day',
    '120d': '120-Day',
    '6m': '6-Month',
    '12m': '1-Year',
  }

  render() {
    let maps = []
    var stateName
    if (this.props.selectedState === 'nedews' || this.props.selectedState === 'northeast') {
      stateName = ['nrcc/', 'NRCC']
    } else {
      stateName = ['subrgn/'+this.props.selectedState.toUpperCase()+'/', this.props.selectedState.toUpperCase()]
    }
    HprccSpiMaps.mapnames.forEach((t) => {
      maps.push({
        original: HprccSpiMaps.mapurl + stateName[0] + t + this.props.maptype + 'Data' + stateName[1] + '.png',
        thumbnail: HprccSpiMaps.mapurl + stateName[0] + t + this.props.maptype + 'Data' + stateName[1] + '.png',
        thumbnailTitle: HprccSpiMaps.maptitles[t] || "",
        thumbnailLabel: HprccSpiMaps.maptitles[t] || ""
      })
    })
    return (
      <div>
        <Collapsible trigger={"Current ACIS Maps - "+this.props.maptype} triggerTagName="h4" open={false} transitionTime={200}>
        <ImageGallery 
            items={maps} 
            thumbnailPosition="top"
            showFullscreenButton={false}
            showPlayButton={false}
            slideDuration={200}
            slideInterval={9999}
        />
        </Collapsible>
      </div>
    )
  }
}