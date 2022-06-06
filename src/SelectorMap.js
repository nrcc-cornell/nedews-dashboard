import React, { Component } from 'react'
import { Map, GeoJSON, TileLayer } from 'react-leaflet'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import 'leaflet/dist/leaflet.css'
import StateOutlines from './StateOutlines'
import StatusUpdate from './StatusUpdate'

export default class SelectorMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usdm: null,
    }
  }

  static usdmShapefile = "./data/USDM_current_M.zip"
  static minZoomLevel = 5
  static maxZoomLevel = 5
  static bounds = [[40.2, -80.2], [47.7, -66.6]]
  static maxBounds = [[40.2, -80.2], [47.7, -66.6]]
  static statesOnMap = ['ny','vt','nh','me','ma','ct','ri']
  static statesMasked = ['pa','nj']
  static geoStyle = {color: "darkblue", weight:2, fillColor: "lightblue", fillOpacity: 0.2}
  static maskStyle = {color: "darkgray", weight: 1, fillColor: "gray", fillOpacity: 0.6}
  static highlightStyle = {color:"darkblue", weight:2, fillColor:"blue", fillOcacity:0.8}
  static usdmStyle = [
    {color: "#FFFF00", weight:1, fillColor: "#FFFF00", fillOpacity: 1.0}, //D0
    {color: "#FCD37F", weight:1, fillColor: "#FCD37F", fillOpacity: 1.0}, //D1
    {color: "#FFAA00", weight:1, fillColor: "#FFAA00", fillOpacity: 1.0}, //D2
    {color: "#E60000", weight:1, fillColor: "#E60000", fillOpacity: 1.0}, //D3
    {color: "#730000", weight:1, fillColor: "#730000", fillOpacity: 1.0}  //D4
  ]

  componentDidMount = () => {
    axios.get("./data/usdm.json")
      .then(results => {
        this.setState({usdm: results.data})
      })
      .catch(err => {
        console.log("USDM Read Error: " + err)
      })
  }

  stateHighlight = (e) => {
    if (e.sourceTarget.options.properties.name !== "northeast") {
      const feature = e.target
      feature.setStyle(SelectorMap.highlightStyle)
    }
  }

  stateReset = (e) => {
    if (e.sourceTarget.options.properties.name !== "northeast") {
      const feature = e.target
      feature.setStyle(SelectorMap.geoStyle)
    }
  }

  handleStateClick = (e) => {
    const clickedState = e.sourceTarget.options.properties.name
    this.props.updateSelectedState(clickedState)
  }

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.stateHighlight,
      mouseout: this.stateReset,
      click: this.handleStateClick
    })
  }

  handleReset = (e) => {
    e.preventDefault()
    this.props.updateSelectedState("nedews")
  }

  render() {
    return (
      <Grid container className="selectormap-container" spacing={0} justify="center">
        <Grid item xs={12} sm={6}>
          <div className="selectormap-map-container">
            <Map
              className="selectormap-map"
              bounds={SelectorMap.bounds}
              maxBounds={SelectorMap.maxBounds}
              minZoom={SelectorMap.minZoomLevel}
              maxZoom={SelectorMap.maxZoomLevel}
              doubleClickZoom={false}
              zoomControl={false}
              attributionControl={false}>

              <TileLayer
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png"
                attribution='Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {this.state.usdm && 
                this.state.usdm.map((g, i) => (
                  <GeoJSON
                    key={i}
                    data={g}
                    style={SelectorMap.usdmStyle[g.properties.DM]}
                  />
                ))
              }

              {this.state.usdm && 
                <StateOutlines statesOnMap={SelectorMap.statesMasked} mapStyle={SelectorMap.maskStyle} names={['northeast','northeast']} onEachFeature={this.onEachFeature} />
              }       

              {this.state.usdm && 
                <StateOutlines statesOnMap={SelectorMap.statesOnMap} mapStyle={SelectorMap.geoStyle} names={SelectorMap.statesOnMap} onEachFeature={this.onEachFeature} />
              }

            </Map>
            <span className="selectormap-map-caption">Click a state to zoom maps below</span>
            {this.props.selectedState !== "nedews" && <button onClick={this.handleReset}>Return to Northeast</button>}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatusUpdate />
        </Grid>
      </Grid>

    )
  }
}