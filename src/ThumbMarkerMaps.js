import React, { Component } from 'react'
import { Map, TileLayer, CircleMarker } from 'react-leaflet'
import StateOutlines from './StateOutlines'
import MarkerMaps from './MarkerMaps'

export default class ThumbMarkerMaps extends Component {
  constructor() {
    super()
    this.iconSize = 2
  }

  render() {
    const bbox = MarkerMaps.stateBbox[this.props.selectedState]
    const div_style = {border: "4px solid " + (this.props.border ? "#337ab7" : "white")}
    return (
      <div style={div_style}>
        <Map
          className="thumb-marker-map"
          bounds={[[bbox[1], bbox[0]], [bbox[3], bbox[2]]]}
          maxBounds={MarkerMaps.maxBounds}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
          doubleClickZoom={false}
          dragging={false}
          style={{"border":"1pt solid gray"}}>

          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
          />

          {this.props.markers && 
            <StateOutlines statesOnMap={MarkerMaps.statesOnMap} mapStyle={MarkerMaps.geoStyle} />
          }

          {this.props.markers &&
            this.props.markers.map((m, i) => (
              <CircleMarker 
                key={i}
                center={m.position}
                radius={this.iconSize}
                {...{fillColor: m.fillColor, color: "black", weight: 0.5, fillOpacity: 1}}
              />
            ))
          }
        </Map>
        <div className="thumb-label">{this.props.duration.replace("d","")}-Day</div>
      </div>
    )
  }
}