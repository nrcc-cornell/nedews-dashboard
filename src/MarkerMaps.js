import React, { Component } from 'react'
import { Map, TileLayer, CircleMarker, Popup, ZoomControl, Pane } from 'react-leaflet'
import Control from 'react-leaflet-control'
import UsgsLegend from './UsgsLegend'
//import HprccGisLegend from './HprccGisLegend'
import NrccSpiLegend from './NrccSpiLegend'
import StateOutlines from './StateOutlines'
import UsdmOverlay from './UsdmOverlay'
import CountyOverlay from './CountyOverlay'

export default class MarkerMaps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      iconSize: 3
    }
  }

  static stateBbox = {
    'ny': [-79.76338,40.49622,-71.85616,45.01597],
    'vt': [-73.43545,42.72694,-71.49364,45.01597],
    'nh': [-72.55248,42.69692,-70.71118,45.30586],
    'me': [-71.08446,43.07085,-66.98549,47.45681],
    'ma': [-73.50006,41.23893,-69.92871,42.88474],
    'ct': [-73.72618,40.99194,-71.78796,42.04940],
    'ri': [-71.85616,41.14717,-71.12036,42.01853],
    'pa': [-80.52072,39.72006,-74.69888,42.26896],
    'nj': [-75.56031,38.93103,-73.90206,41.35472],
    'de': [-75.79003,38.45161,-75.05063,39.83927],
    'md': [-79.48700,37.92245,-75.05063,39.72263],
    'wv': [-82.64199,37.20203,-77.71748,40.63859],
    'nedews': [-80.2,40.2,-66.6,47.7],
    'northeast': [-82.70, 37.20, -66.90, 47.60]
  }
  static statesOnMap = ['ny','vt','nh','me','ma','ct','ri','pa','nj','md','de','wv']
  static geoStyle = {color: "darkblue", weight:1, fillColor: "white", fillOpacity: 0.0}
  static minZoomLevel = 5
  static maxZoomLevel = 9
  static maxBounds = [[37.20, -82.70], [48.60, -65.00]]

  componentDidMount() {
    this.setState({iconSize: this.props.selectedState === 'northeast' || this.props.selectedState === 'nedews' ? 3 : 5})
    const leafletMap = this.leafletMap.leafletElement
    leafletMap.on('zoomend', () => {
      this.setState({iconSize:leafletMap.getZoom() - 2})
    })
  }

  render() {
    const bbox = MarkerMaps.stateBbox[this.props.selectedState]
    return (
      <div>
          <Map
            className="marker-map"
            ref={m => { this.leafletMap = m }}
            bounds={[[bbox[1], bbox[0]], [bbox[3], bbox[2]]]}
            maxBounds={MarkerMaps.maxBounds}
            minZoom={MarkerMaps.minZoomLevel}
            maxZoom={MarkerMaps.maxZoomLevel}
            scrollWheelZoom={false}
            attributionControl={true}
            zoomControl={false}
            style={{"border":"1pt solid gray"}}>

            <TileLayer
               url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {this.props.mapTitle &&
              <Control position="topleft">
                <span style={{fontWeight:"bold"}}>{this.props.mapTitle}</span>
              </Control>
            }

            <ZoomControl position="topleft" />

            {this.props.usdmOverlay &&
              <Pane name="usdm" style={{ zIndex: 500 }}>
                <UsdmOverlay />
              </Pane>
            }

            <Pane name="counties" style={{ zIndex: 510 }}>
              <CountyOverlay />
            </Pane>
          
            <Pane name="states" style={{ zIndex: 520 }}>
              <StateOutlines statesOnMap={MarkerMaps.statesOnMap} mapStyle={MarkerMaps.geoStyle} />
            </Pane>
          
            <Pane name="markers" style={{ zIndex: 530 }}>
              {this.props.markers && 
                this.props.markers.map((m, i) => (
                  <CircleMarker 
                    key={i+"marker"}
                    center={m.position}
                    radius={this.state.iconSize}
                    pane={"markers"}
                    {...{fillColor: m.fillColor, color: "black", weight: 1, fillOpacity: 1}}
                  >
                    {m.data &&
                      <Popup>
                        {
                          {1:<div>{m.data[0]}</div>,
                           2:<div style={{textAlign:"center"}}>{m.data[0]}<br/>{m.data[1]}</div>,
                           3:<div style={{textAlign:"center"}}>{m.data[0]}<br/>{m.data[1]}<br/><a href={m.data[2]} target="blank">USGS site page (new tab)</a></div>,
                           4:<div style={{textAlign:"center"}}>{m.data[0]}<br/>{m.data[1]}<br/><a href={m.data[2]} target="blank">USGS site page (new tab)</a><br/><a href={m.data[3]} target="blank">Site statistics (new tab)</a></div>,
                        }[m.data.length]
                        }
                      </Popup>
                    }
                  </CircleMarker>
                ))
              }
            </Pane>
          </Map>
          {this.props.mapType === "nrcc" ? <NrccSpiLegend mapDate={this.props.mapDate}/> : <UsgsLegend mapDate={this.props.mapDate} mapType={this.props.mapType} cagType={this.props.cagType} />}          
      </div>
    )
  }
}
/*
{this.props.lines &&
  <GeoJSON
    key={this.props.mapTitle+"lines"}
    data={this.props.lines}
    interactive={false}
    style={(feature) => {
      const colorStyle = {color: this.props.lineColors[feature.properties.color_code]}
      return {...colorStyle, ...this.props.lineStyle}
    }}
  />
}

                      <Popup>
                        {m.data.length === 1 ? (
                          <div>{m.data[0]}</div>
                        ) : (
                          <div style={{textAlign:"center"}}>{m.data[0]}<br/>{m.data[1]}<br/><a href={m.data[2]} target="blank">Graph</a></div>
                        )}
                      </Popup>

*/