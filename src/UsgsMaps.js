import React, { Component } from 'react'
import axios from 'axios'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
//import ButtonGroup from '@material-ui/core/ButtonGroup'
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
      wellsdate: null,
      sfmarkers: [],
      gwmarkers: [],
      showdm: true,
      cagtype: 'usdm',
      cagmarkers: {}
    }
    this.streamflows = [
      {
        file: "./data/flowrt.json",         //"./data/sf_1d.json",
        title: "Realtime",           //"1-Day"
      },
      {
        file: "./data/flow7d.json",         //"./data/sf_7d.json",
        title: "7-Day"
      },
      {
        file: "./data/flow14d.json",         //"./data/sf_14d.json",
        title: "14-Day"
      },
      {
        file: "./data/flow28d.json",         //"./data/sf_28d.json",
        title: "28-Day"
      }
    ]
    this.wellsfile = "./data/wells.json"
    this.wellstitle = "Groundwater Status"
    this.smitems = this.streamflows.map((i) => {return i.title})
  }

  getSfMarkers = (flowfile) => {
    const sfCategoryColors = [
      //null,
      'red',
      'darkred',
      'darkred',  //remove for NRCC  backup classes
      'darkorange',
      'lime',
      'cyan',
      'blue',
      'black'
    ]
    let markers = []
    axios.get(flowfile)
      .then(results => {
        results.data.data.forEach(f => {
          const href = "https://waterdata.usgs.gov/monitoring-location/" + f.siteid + "/#parameterCode=00065&period=P30D"
          const href2 = "https://waterwatch.usgs.gov/?id=wwchart_sitedur&ofmt=plot_mvbg&site_no=" + f.siteid + "&nyr=1"
          markers.push({position:f.position, fillColor:sfCategoryColors[f.class], data:[f.data[0], "Measurement date: "+f.data[1], href, href2]})
        })
        this.setState({sfmarkers: markers, flowdate: results.data.date})
      })
      .catch(err => {
        console.log("Streamflow Request Error: " + err)
      });
  }
 
  getGwMarkers = (wellsfile) => {
    const usgsCategoryColors = [
      'red',
      'darkred',
      'darkorange',
      'lime',
      'cyan',
      'blue',
      'black'
    ]
    const usdmCategoryColors = [
      "#730000",
      "#E60000",
      "#FFAA00",
      "#FCD37F",
      "#FFFF00",
      "gainsboro",
      "lime",
      "#BEE8FF",
      "#00A9E6",
      "#005CE6",
      "#0026D7",
    ]
    let usdmmarkers = []
    let usgsmarkers = []
    axios.get(wellsfile)
      .then(results => {
        results.data.data.forEach(f => {
          const href1 = "https://waterdata.usgs.gov/monitoring-location/" + f.siteid + "/#parameterCode=72019&period=P365D"
//          removed href2 pending replacement
          const href2_usdm = "https://nedews.nrcc.cornell.edu/gw/?id=" + f.siteid + "&cats=usdm"
          const href2_usgs = "https://nedews.nrcc.cornell.edu/gw/?id=" + f.siteid + "&cats=default"
//          markers.push({position:f.position, fillColor:gwCategoryColors[f.class], data:[f.data[0], "Measurement date: "+f.data[1], href1, href2]})
          usdmmarkers.push({position:f.position, fillColor:usdmCategoryColors[f.usdm], data:[f.name, "Measurement date: "+f.mdate, href1, href2_usdm]})
          usgsmarkers.push({position:f.position, fillColor:usgsCategoryColors[f.usgs], data:[f.name, "Measurement date: "+f.mdate, href1, href2_usgs]})
        })
        this.setState({cagmarkers: {usgs:usgsmarkers, usdm:usdmmarkers}})
        this.setState({gwmarkers: this.state.cagtype === 'usdm' ? usdmmarkers : usgsmarkers, wellsdate: results.data.date})
      })
      .catch(err => {
        console.log("Groundwater Request Error: " + err);
      })
  }
 
  componentDidMount = () => {
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

  handleToggleChange = (event) => {
    const newcagtype = event.currentTarget.value
    this.setState({cagtype: newcagtype, gwmarkers: this.state.cagmarkers[newcagtype]})
  }

  render() {
    return (
      <div>
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
                cagType={this.state.cagtype}
              />
              <StreamMenu streamflows={this.smitems} handleStreamMenuChange={this.handleStreamMenuChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MarkerMaps 
                markers={this.state.gwmarkers} 
                usdmOverlay={this.state.showdm} 
                selectedState={this.props.selectedState} 
                mapType="groundwater" 
                mapDate={this.state.wellsdate ? this.state.wellsdate : ""}
                mapTitle={this.wellstitle}
                cagType={this.state.cagtype}
              />
              <div className="gwbutton-container">
                <span>Percentile classes:</span>
                <Button 
                  className={this.state.cagtype === 'usdm' ? "gwbutton-select" : "gw-button-unselect"}
                  size="small"
                  value="usdm" 
                  onClick={this.handleToggleChange}
                >
                  USDM
                </Button>
                <Button 
                  className={this.state.cagtype === 'usgs' ? "gwbutton-select" : "gw-button-unselect"}
                  size="small"
                  value="usgs" 
                  onClick={this.handleToggleChange}
                >
                  USGS
                </Button>
              </div>
            </Grid>
           </Grid>
        </Collapsible>

      </div>
    )
  }
}


//<div style={{display:"table",height:"100%",width:"100%",textAlign:"center"}}>
//<a href="https://newengland.water.usgs.gov/web_app/GWW/GWW.html" style={{display:"table-cell", verticalAlign:"middle"}} target="_blank">View Groundwater Levels in New England<br/>(opens in a new tab)</a>
//</div>
