import React, { Component } from 'react'
import axios from 'axios'
import { Map, GeoJSON, TileLayer} from 'react-leaflet'
import Control from 'react-leaflet-control'
import {featureEach} from '@turf/meta'
import StateOutlines from './StateOutlines'
import QpfGisLegend from './QpfGisLegend'
import MarkerMaps from './MarkerMaps'
//import sortPolygons from './Stacker'
import Collapsible from 'react-collapsible'

export default class AcisGeoMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clines: null,
      mapDate: null,
      contour_colors: null,
      contour_values: null,
    }
  }

  getColorsValues = (map_features, value_property) => {
    let colors = []
    let values = []
    featureEach(map_features, feat => {
      const feature_prop = feat.properties

if (parseFloat(feature_prop[value_property]) === 25) {

      colors.push(feature_prop.fill)
      values.push(parseFloat(feature_prop[value_property]))
    }


  })


    return {colors:colors, values:values}
  }
  

  componentDidMount = () => {
    axios.get("./data/" + this.props.mapdefs.timeperiod + '_' + this.props.selectedState + '_' + this.props.mapend + ".geojson")
      .then(results => {
        let mapdate = ''
        // for qpf maps, look for decreasing bulleyes
//        results.data = sortPolygons(results.data,"title")
        const areaInfo = this.getColorsValues(results.data,"title")
         this.setState({
          clines: results.data,
          mapDate: mapdate,
          contour_colors: areaInfo.colors,
          contour_values: areaInfo.values
        })
      })
      .catch(err => {
        console.log("Outlook Lines Error: " + err)
      });
  }

  getStyle = (feature) => {
    const fprops = feature.properties
    return (
      {
        color: fprops.fill, 
        fillOpacity: 0.8, 
        weight:1, 
        opacity: 1
      } 
    )
  }

  handleMapClick = () => {
    this.props.handleMapClick(this.props.mapdefs)
  }

  render() {
    const bbox = MarkerMaps.stateBbox[this.props.selectedState]
    return (
      <div>
        <Collapsible trigger="New Maps" triggerTagName="h4" open={true} transitionTime={200}>
        <Map
          className={this.props.classNames}
          bounds={[[bbox[1], bbox[0]], [bbox[3], bbox[2]]]}
          maxBounds={MarkerMaps.maxBounds}
          minZoom={4}
          maxZoom={MarkerMaps.maxZoomLevel}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >

          <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png"
              attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
          />

          {this.props.mapdefs.mapTitle &&
            <Control position="topleft">
              <span style={{fontWeight:"bold"}}>{this.props.mapdefs.mapTitle}<br />{this.state.mapDate}</span>
            </Control>
          }

          {this.state.clines &&
            <div>
              <GeoJSON
                data={this.state.clines}
                style={this.getStyle}
              />
              <StateOutlines statesOnMap={MarkerMaps.statesOnMap} mapStyle={MarkerMaps.geoStyle} />
            </div>
          }
        </Map>

         {this.state.contour_colors && 
          <QpfGisLegend colorCodes={this.state.contour_colors} contours={this.state.contour_values} />
        }


</Collapsible>
      </div>
    )
  }
}
