import React, { Component } from 'react'
import axios from 'axios'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'
import MarkerMaps from './MarkerMaps'
import ThumbMarkerMaps from './ThumbMarkerMaps'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export default class NrccSpiMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bigmap: '30d',
      markers: {'30d': null, '60d': null, '90d': null, '120d': null},
      showdm: true,
      spidate: null
    }
    this.durations = ['30d','60d','90d','120d']
    this.spicolors = [
        { "color": "#0026D7", "range": [2.0, 1000] },
        { "color": "#005CE6", "range": [1.6, 2.0] },
        { "color": "#00A9E6", "range": [1.3, 1.6] },
        { "color": "#BEE8FF", "range": [0.8, 1.3] },
        { "color": "lime", "range": [0.5, 0.8] },
        { "color": "gainsboro", "range": [-0.5, 0.5] },
        { "color": "#FFFF00", "range": [-0.8, -0.5] },
        { "color": "#FCD37F", "range": [-1.3, -0.8] },
        { "color": "#FFAA00", "range": [-1.6, -1.3] },
        { "color": "#E60000", "range": [-2.0, -1.6] },
        { "color": "#730000", "range": [-1000, -2.0] },
    ]
  }
    
  spiColorSelect = (val) => {
    let color = "white"
    this.spicolors.forEach((e) => {
      if (val > e.range[0] && val <= e.range[1]) {
        color = e.color
      }
    })
    return color
  }
  
  getSpiPts = () => {
    let markers = {'30d': [], '60d': [], '90d': [], '120d': []}
    axios.get("./data/ne_spi.json")
      .then(results => {
        Object.keys(results.data.data).forEach(f => {
          const stndata = results.data.data[f]
          this.durations.forEach((timeperiod) => {
            if (stndata[timeperiod.replace("d","-day")]) {
              const spi = stndata[timeperiod.replace("d","-day")].spi
              markers[timeperiod].push({position:stndata.position, fillColor:this.spiColorSelect(spi), data:[stndata.name, spi]})
            }
          })
        })
        this.setState({markers: markers})
        this.setState({spidate: results.data.date})
      })
      .catch(err => {
        console.log("SPI Points Error: " + err)
      });
  }

  componentDidMount = () => {
    this.getSpiPts()
  }

  handleThumbClick = (event,item) => {
    event.preventDefault()
    this.setState({bigmap: item})
  }

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  render() {
    return (
      <Collapsible trigger="NRCC SPI Maps" triggerTagName="h4" open={false} transitionTime={200}>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.showdm}
              onChange={this.handleSwitchChange('showdm')}
              value="showdm"
              color="primary"
              style={{height:"1.5em"}}
            />
          }
          label="Show USDM"
        />    

        <Grid container spacing={8} justify="center" style={{marginBottom:"0.4em"}}>
          {this.durations.map((d) => (
            <Grid item key={d} style={{flexBasis:"11%"}}>
              <a onClick={event => this.handleThumbClick(event, d)}>
                <ThumbMarkerMaps 
                  selectedState={this.props.selectedState} 
                  markers={this.state.markers[d]} 
                  duration={d}
                  border={d === this.state.bigmap}
                />
              </a>
            </Grid>
          ))}
        </Grid>
        
        <Grid container spacing={8} justify="center">
          <Grid item xs={12} sm={6}>
            {this.state.markers[this.state.bigmap] &&
              <MarkerMaps 
                selectedState={this.props.selectedState} 
                markers={this.state.markers[this.state.bigmap]} 
                mapTitle={this.state.bigmap.replace("d","-") + "Day SPI - " + this.state.spidate}
                usdmOverlay={this.state.showdm} 
                mapType="nrcc"
                mapDate={this.state.spidate}
              />
            }
          </Grid>
        </Grid>
      </Collapsible>
    )
  }
}