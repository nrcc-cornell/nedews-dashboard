import React, { Component } from 'react'
import axios from 'axios'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'
import MarkerMaps from './MarkerMaps'
import ThumbMarkerMaps from './ThumbMarkerMaps'
import sortPolygons from './Stacker'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
//import NavigateNext from '@material-ui/icons/NavigateNext'
//import NavigateBefore from '@material-ui/icons/NavigateBefore'

export default class HprccGisMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bigmap: '30d',
      markers: {'30d': null, '60d': null, '90d': null, '120d': null},
      lines:   {'30d': null, '60d': null, '90d': null, '120d': null},
      showdm: false,
      downloadDates: {},
      spidate: null
    }
    this.durations = ['30d','60d','90d','120d']
    this.colorCodes = {
      0: "black",
      1: "darkred",
      2: "red",
      3: "darkorange",
      4: "goldenrod",
      5: "yellow",
      6: "lime",
      7: "green",
      8: "dodgerblue",
      9: "indigo",
      10: "darkviolet",
      11: "fuchsia"
    }
    this.defaultFillOpacity = 0.1
    this.lineStyle = {fillOpacity: this.defaultFillOpacity, weight:1, opacity: 0.5}
    this.datesfile = "./data/download_dates.json"
  }

  getSpiPts = (timeperiod) => {
    let markers = []
    axios.get("./data/" + timeperiod + "_SPI_point.json")
      .then(results => {
        results.data.forEach(f => {
          markers.push({position:f.position, fillColor:this.colorCodes[f.class], data:[f.data[0],f.data[1]]})
        })
        const allmark = this.state.markers
        allmark[timeperiod] = markers
        this.setState({markers: allmark})
      })
      .catch(err => {
        console.log("SPI Points Error: " + err)
      });
  }

  getSpiLines = (timeperiod) => {
    axios.get("./data/" + timeperiod + "_SPI_line.json")
      .then(results => {
        const allline = this.state.lines
        allline[timeperiod] = sortPolygons(results.data, "level")
        this.setState({lines: allline, spidate: this.state.downloadDates["hprcc_"+timeperiod+"_SPI"]})
      })
      .catch(err => {
        console.log("SPI Lines Error: " + err)
      });
  }

  getDownloadDates = (datesfile) => {
    axios.get(datesfile)
      .then(results => {
        this.setState({downloadDates: results.data, spidate: results.data.hprcc_30d_SPI})
      })
      .catch(err => {
        console.log("Download Dates Request Error: " + err);
      })
  }

  componentDidMount = () => {
    this.getDownloadDates(this.datesfile)
    this.durations.forEach((d) => {
      this.getSpiLines(d)
      this.getSpiPts(d)
    })
  }

  handleThumbClick = (event,item) => {
    event.preventDefault()
    this.setState({bigmap: item})
  }

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked })
    this.lineStyle.fillOpacity = event.target.checked ? 0 : this.defaultFillOpacity
  }

  render() {
    const bigmapTitle = this.state.bigmap.replace("d","-") + "Day SPI"
    return (
      <Collapsible trigger="New ACIS SPI Maps" triggerTagName="h4" open={false} transitionTime={200}>
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
            {this.state.markers[this.state.bigmap] && this.state.lines[this.state.bigmap] &&
              <MarkerMaps 
                selectedState={this.props.selectedState} 
                markers={this.state.markers[this.state.bigmap]} 
                lines={this.state.lines[this.state.bigmap]} 
                lineColors={this.colorCodes}
                lineStyle={this.lineStyle}
                mapTitle={bigmapTitle}
                usdmOverlay={this.state.showdm} 
                mapType="hprcc"
                mapDate={this.state.spidate}
              />
            }
          </Grid>
        </Grid>
      </Collapsible>
    )
  }
}