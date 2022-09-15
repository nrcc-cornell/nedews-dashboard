import React, { Component } from 'react'
import axios from 'axios'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'
import MarkerMaps from './MarkerMaps'
import StreamMenu from './StreamMenu'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export default class UsgsMaps extends Component { 
  constructor (props) {
    super(props)
    this.state = {
      flowindex: 1,
      flowdate: null,
      sfmarkers: [],
      gwmarkers: [],
      downloadDates: {},
      showdm: true
    }
    this.streamflows = [
      {
        file: "./data/flowrt.json",
        title: "Real-Time"
      },
      {
        file: "./data/flow7d.json",
        title: "7-Day"
      },
      {
        file: "./data/flow14d.json",
        title: "14-Day"
      },
      {
        file: "./data/flow28d.json",
        title: "28-Day"
      }
    ]
    this.wellsfile = "./data/wells.json"
    this.wellstitle = "Groundwater Status"
    this.datesfile = "./data/download_dates.json"
    this.smitems = this.streamflows.map((i) => {return i.title})
  }

  getSfMarkers = (flowfile) => {
    const sfCategoryColors = [
      null,
      'red',
      'darkred',
      'darkred',
      'darkorange',
      'lime',
      'cyan',
      'blue',
      'black'
    ]
    let markers = []
    axios.get(flowfile)
      .then(results => {
        results.data.forEach(f => {
          const href = "https://waterdata.usgs.gov/monitoring-location/" + f.siteid + "/#parameterCode=00065&period=P30D"
          markers.push({position:f.position, fillColor:sfCategoryColors[f.class], data:[f.data[0], "Measurement date: "+f.data[1], href]})
        })
        this.setState({sfmarkers: markers, flowdate: this.state.downloadDates[flowfile.replace("./data/","").replace(".json","")]})
      })
      .catch(err => {
        console.log("Streamflow Request Error: " + err)
      });
  }
 
  getGwMarkers = (wellsfile) => {
    const gwCategoryColors = [
      'red',
      'darkred',
      'darkorange',
      'lime',
      'cyan',
      'blue',
      'black'
    ]
    let markers = []
    axios.get(wellsfile)
      .then(results => {
        results.data.forEach(f => {
//        const href1 = "https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=" + f.siteid + "&parm_cd=72019&period=60"
          const href1 = "https://waterdata.usgs.gov/monitoring-location/" + f.siteid + "/#parameterCode=72019&period=P60D"
//          removed href2 pending replacement
//          const href2 = "https://groundwaterwatch.usgs.gov/BandPlots-small/" + f.state + "/sm_" + f.siteid + ".png"
//          markers.push({position:f.position, fillColor:gwCategoryColors[f.class], data:[f.data[0], "Measurement date: "+f.data[1], href1, href2]})
          markers.push({position:f.position, fillColor:gwCategoryColors[f.class], data:[f.data[0], "Measurement date: "+f.data[1], href1]})
})
        this.setState({gwmarkers: markers})
      })
      .catch(err => {
        console.log("Groundwater Request Error: " + err);
      })
  }

  getDownloadDates = (datesfile) => {
    axios.get(datesfile)
      .then(results => {
        this.setState({downloadDates: results.data})
        this.setState({flowdate: results.data.flow7d})
      })
      .catch(err => {
        console.log("Download Dates Request Error: " + err);
      })
  }
 
  componentDidMount = () => {
    this.getDownloadDates(this.datesfile)
    this.getSfMarkers(this.streamflows[this.state.flowindex].file)
    this.getGwMarkers(this.wellsfile)
  }

  handleStreamMenuChange = (index) => {
    this.getSfMarkers(this.streamflows[index].file)
    this.setState({flowindex: index})
  }

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }
    
  render() {
    return (
      <Collapsible trigger="USGS Streamflow and Groundwater" triggerTagName="h4" open={true} transitionTime={200}>
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

        <Grid container spacing={8} justify="center">
          <Grid item xs={12} sm={6}>
            <MarkerMaps 
              markers={this.state.sfmarkers} 
              usdmOverlay={this.state.showdm} 
              selectedState={this.props.selectedState} 
              mapType="streamflow" 
              mapDate={this.state.flowdate ? this.state.flowdate : ""}
              mapTitle={this.streamflows[this.state.flowindex].title+" Streamflow"}
            />
            <StreamMenu streamflows={this.smitems} handleStreamMenuChange={this.handleStreamMenuChange} />
          </Grid>
          <Grid item xs={12} sm={6}>

            <div style={{display:"table",height:"100%",width:"100%",textAlign:"center"}}>
              <a href="https://newengland.water.usgs.gov/web_app/GWW/GWW.html" style={{display:"table-cell", verticalAlign:"middle"}} target="_blank">View Groundwater Levels in New England<br/>(opens in a new tab)</a>
            </div>

          </Grid>
        </Grid>
      </Collapsible>
    )
  }
}

//
//<MarkerMaps 
//markers={this.state.gwmarkers} 
//usdmOverlay={this.state.showdm} 
//selectedState={this.props.selectedState} 
//mapType="groundwater" 
//mapDate={this.state.downloadDates ? this.state.downloadDates.wells : ""} 
//mapTitle={this.wellstitle}
///>
//