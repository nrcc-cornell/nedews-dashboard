import React, { Component } from 'react'
import Collapsible from 'react-collapsible'

export default class SpiMaps extends Component {
  constructor(props) {
    super(props)
    this.stateZoomStart = "zoom_type=state&state="
    this.neZoom = "center_pt=42.4,-74.8&zoom=6"
    this.state = {
      stateZoom: this.stateZoomStart + this.props.selectedState.toUpperCase(),
      showing: false    // don't open iframe until it has been uncollapsed
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.selectedState !== nextProps.selectedState) {
       this.setState({stateZoom: this.stateZoomStart + nextProps.selectedState.toUpperCase()})
    }
  }

  buildFrameSource = () => {
//    return "http://climate.ncsu.edu/products/hirdtt/spi_framed.php?dur=2&state_lines=on&county_lines=on&layer=spi&" + 
//      (['nedews','northeast'].includes(this.props.selectedState) ? this.neZoom : this.state.stateZoom)
      return "http://climate.ncsu.edu/water/map"
  }

  showFrame = () => {
    this.setState({showing: true})
  }
  
  render() {
    return (
      <Collapsible trigger="AHPS SPI Maps" triggerTagName="h4" open={false} lazyRender={true} transitionTime={200} onOpening={this.showFrame} >
        <span className="spimap-tagline">This tool is provided by the&nbsp;
          <a href="http://climate.ncsu.edu/" target="_blank">North Carolina Climate Office</a>
        </span>
        {this.state.showing && 
          <iframe 
            src={this.buildFrameSource()}
            frameBorder="0" 
            scrolling="no"
            width="100%"
            height="750px"
          />
        }
      </Collapsible>
    )
  }
}