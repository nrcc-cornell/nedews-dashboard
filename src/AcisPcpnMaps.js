import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

export default class AcisPcpnMaps extends Component {
  constructor () {
    super()
    this.mapurl = 'NRCC_maps/'
    this.maptitles = {
      d7ptot: '7 Day Total',
      d30ppct: '30 Day Pct Normal',
      d60ppct: '60 Day Pct Normal',
      d90ppct: '90 Day Pct Normal',
      mn6ppct: '6 Month Pct Normal',
      y1ppct: '1 Year Pct Normal',
      dmwkptot: 'USDM Current Wk'
    }
  }

  formatDMend = () => {
    // Tuesday before last Thursday
    var d = new Date(), dmonth, ddate, dmonthstr, ddatestr
    while (true) {
      if (d.getDay() === 4) {
        d.setDate(d.getDate() - 2)
        dmonth = d.getMonth() + 1
        ddate = d.getDate()
        dmonthstr = dmonth < 10 ? ("0" + dmonth) : dmonth
        ddatestr = ddate < 10 ? ("0" + ddate) : ddate
        return d.getFullYear() + "-" + dmonthstr + "-" + ddatestr
      }
      d.setDate(d.getDate() - 1)
    }
  }
    
  render() {
    const mapend = this.props.maptype === "current" ? "current" : this.formatDMend()
    const mapHeader = (this.props.maptype === "current"
      ? "Current" : "Last USDM Week (ending " + mapend + ")")
      + " ACIS Precipitation Maps"
    let pcpnMaps = []
    this.props.mapnames.forEach((t) => {
      const mapname = this.mapurl + t + '_' + this.props.selectedState + '_' + mapend + '.png'
      pcpnMaps.push({
        original: mapname,
        originalAlt: this.maptitles[t] + " Precipitation map",
        thumbnail: mapname,
        thumbnailTitle: this.maptitles[t] || "",
        thumbnailLabel: this.maptitles[t] || "",
        thumbnailAlt: this.maptitles[t] + " Precipitation map",
      })
    })
    return (
      <Collapsible trigger={mapHeader} triggerTagName="h4" open={this.props.open} transitionTime={200}>
        <ImageGallery 
          items={pcpnMaps} 
          thumbnailPosition="top"
          showFullscreenButton={false}
          showPlayButton={false}
          slideDuration={200}
          slideInterval={9999}
        />
      </Collapsible>
    )
  }
}