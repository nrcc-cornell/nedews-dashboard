import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import Modal from '@material-ui/core/Modal'
import Cancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

export default class NwmMaps extends Component {
  constructor () {
    super()
    this.state = {
      showModal: false
    }
    this.mapurl = 'NWM_maps/'
    this.maptitles = {
      "lev0": '0-10cm',
      "lev1": '10-40cm',
      "lev2": '40-100cm',
      "lev3": '100-200cm',
      "1day": '1 day',
      "7day": '7 day',
      "14day": '14 day',
      "28day": '28 day'
    }
    this.mapopts = {
      sm: {
        mapstart: "SOIL_M-1day",
        collapsibleHeader: "Experimental NWM Soil Moisture Maps",
        modalinfo: {
          title: "National Water Model (NWM) Soil Moisture Drought Index (Experimental)",
          intro: "These drought indices are created daily for the Northeast U.S., and derived from NWM model output for four soil moisture levels: 0-10 cm, 10-40 cm, 40-100 cm, and 100-200 cm.",
          methodology: "For each model grid, current soil moisture analyses are obtained from NWM real-time model runs. To provide climatological context for these current conditions, the soil moisture is also obtained for this date from each of the available years in the NWM retrospective model output (1993-2018). The percentiles of current soil moisture conditions are determined through ranking relative to the historical data, using the empirical Weibull plotting position. Percentiles are then binned and color-coded consistent with existing US Drought Monitor definitions. Due to the NWM’s short period of record (26 years), the classification of dry or wet events into the most extreme percentile categories may occur more frequently than expected.",
          moreinfo: "For more information about the National Water Model, please visit: ",
          moreinfolink: "https://water.noaa.gov/about/nwm"
        }
      },
      sf: {
        mapstart: "streamflow",
        collapsibleHeader: "Experimental NWM Streamflow Maps",
        modalinfo: { 
          title: "National Water Model (NWM) Streamflow Drought Index (Experimental)",
          intro: "These drought indices are created daily for the Northeast U.S., and derived from NWM model output using average streamflow from the past 1, 7, 14 and 28 days.",
          methodology: "For each stream reach, streamflow averages are calculated for the past 1, 7, 14 and 28 days from NWM real-time model runs. To provide climatological context for these averages, identical calculations are performed for this date in each of the available years from the NWM retrospective model output (1993-2018). The percentile of the current 1-, 7-, 14- and 28-day streamflow is determined through ranking relative to the historical data using the empirical Weibull plotting position. Percentiles are then binned and color-coded consistent with existing US Drought Monitor definitions. Due to the NWM’s short period of record (26 years), the classification of dry or wet events into the most extreme percentile categories may occur more frequently than expected.",
          moreinfo: "For more information about the National Water Model, please visit: ",
          moreinfolink: "https://water.noaa.gov/about/nwm"
        }
      }
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    let pcpnMaps = []
    this.props.mapnames.forEach((t) => {
      const rest = this.props.selectedState === 'northeast' ? "" : ("-"+this.props.selectedState)
      const mapname = this.mapurl + this.mapopts[this.props.maptype].mapstart + "-" + t + rest + ".png"

      pcpnMaps.push({
        original: mapname,
        thumbnail: mapname,
        thumbnailTitle: this.maptitles[t] || "",
        thumbnailLabel: this.maptitles[t] || ""
      })
    })
    return (
      <div>
        <Collapsible trigger={this.mapopts[this.props.maptype].collapsibleHeader} triggerTagName="h4" open={false} transitionTime={200}>
          <ImageGallery 
            items={pcpnMaps} 
            thumbnailPosition="top"
            showFullscreenButton={false}
            showPlayButton={false}
            slideDuration={200}
            slideInterval={9999}
          />
          <div style={{textAlign:"right", margin:"0 1em 1em 0"}}>
          <button type="button" onClick={this.handleOpenModal}>About these maps</button>
          </div>
        </Collapsible>

        <Modal 
          open={this.state.showModal}
          onClose={this.handleCloseModal} 
          style={{display:'flex', alignItems:'center', textAlign:'right', margin:'auto 10%'}}
        >
          <div className="modal-container">
            <Tooltip title="Close">
              <Cancel onClick={this.handleCloseModal} />
            </Tooltip>
            <h2 style={{textAlign:"left"}}>{this.mapopts[this.props.maptype].modalinfo.title}</h2>
            <p style={{textAlign:"left"}}>{this.mapopts[this.props.maptype].modalinfo.intro}</p>
            <p style={{textAlign:"left"}}><b>Methodology:</b><br/>{this.mapopts[this.props.maptype].modalinfo.methodology}</p>
            <p style={{textAlign:"left"}}>{this.mapopts[this.props.maptype].modalinfo.moreinfo} 
              <a href={this.mapopts[this.props.maptype].modalinfo.moreinfolink} target="_blank">{this.mapopts[this.props.maptype].modalinfo.moreinfolink}</a>
            </p>
          </div>
        </Modal>
      </div>
    )
  }
}