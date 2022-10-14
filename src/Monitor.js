import React, { Component } from 'react'
import SelectorMap from './SelectorMap'
import UsDroughtMap from './UsDroughtMap'
import AcisPcpnMaps from './AcisPcpnMaps'
//import AcisGeoMaps from './AcisGeoMaps'
import HprccSpiMaps from './HprccSpiMaps'
//import HprccGisMaps from './HprccGisMaps'
import OutlookMaps from './OutlookMaps'
import UsgsMaps from './UsgsMaps'
import EddiMaps from './EddiMaps'
import SportMaps from './SportMaps'
import NwmMaps from './NwmMaps'
import NrccSpiMaps from './NrccSpiMaps'
import KbdiMap from './KbdiMap'
//import SpiMaps from './SpiMaps'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedState: "nedews",
      showlastweek: true
    }
    this.lastweekAcisMaps = ['d7ptot','d30ppct','d60ppct','d90ppct','mn6ppct','y1ppct']
    this.currentAcisMaps = ['dmwkptot','d30ppct','d60ppct','d90ppct','mn6ppct','y1ppct']
    this.nwmSmMaps = ["lev0","lev1","lev2","lev3"]
    this.nwmSfMaps = ["1day","7day","14day","28day"]
  }

  componentDidMount() {
    const d = new Date()
    const wkdy = d.getDay()
    this.setState({showlastweek: wkdy === 4 || wkdy === 5})
  }

  updateSelectedState = (stabb) => {
    this.setState({selectedState: stabb})
  }

  render() {
    return (
      <div>
        <SelectorMap  selectedState={this.state.selectedState} updateSelectedState={this.updateSelectedState} />
        <UsDroughtMap selectedState={this.state.selectedState} />
        <AcisPcpnMaps selectedState={this.state.selectedState} maptype={"lastweek"} mapnames={this.lastweekAcisMaps} open={this.state.showlastweek} />
        <AcisPcpnMaps selectedState={this.state.selectedState} maptype={"current"} mapnames={this.currentAcisMaps} open={true} />
        <UsgsMaps     selectedState={this.state.selectedState} />
        <NrccSpiMaps  selectedState={this.state.selectedState} />
        <HprccSpiMaps selectedState={this.state.selectedState} maptype={"SPI"} />
        <HprccSpiMaps selectedState={this.state.selectedState} maptype={"SPEI"} />
        <KbdiMap      selectedState={this.state.selectedState} />
        <NwmMaps      selectedState={this.state.selectedState} maptype={"sf"} mapnames={this.nwmSfMaps} />
        <NwmMaps      selectedState={this.state.selectedState} maptype={"sm"} mapnames={this.nwmSmMaps} />
        <SportMaps />
        <EddiMaps />
        <OutlookMaps  selectedState={this.state.selectedState} />
      </div>
    )
  }
}

/*
        <AcisGeoMaps  selectedState={this.state.selectedState} classNames="marker-map" mapend={"current"} mapdefs={{timeperiod: "mn6ppct", mapTitle: "6-Month Precipitation", maptype: "qpf"}} mapnames={this.lastweekAcisMaps} />
        <SpiMaps      selectedState={this.state.selectedState} />
        <HprccGisMaps selectedState={this.state.selectedState} />
*/