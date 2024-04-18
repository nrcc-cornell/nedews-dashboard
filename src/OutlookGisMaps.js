import React, { Component } from 'react'
import axios from 'axios'
import { Map, GeoJSON, TileLayer} from 'react-leaflet'
import Control from 'react-leaflet-control'
import StateOutlines from './StateOutlines'
import QpfGisLegend from './QpfGisLegend'
import OutlookGisLegend from './OutlookGisLegend'
import MsoutlookGisLegend from './MsoutlookGisLegend'
import MarkerMaps from './MarkerMaps'
import sortPolygons from './Stacker'

export default class OutlookGisMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clines: null,
      mapDate: null,
      contours: null
    }
    this.colorCodes = {
      qpf: {
        0.01: "lime",
        0.1:  "green",
        0.25: "darkgreen",
        0.5:  "royalblue",
        0.75: "dodgerblue",
        1.0:  "deepskyblue",
        1.25: "cyan",
        1.5:  "mediumpurple",
        1.75: "darkorchid",
        2.0:  "purple",
        2.5:  "maroon",
        3.0:  "red",
        4.0:  "coral",
        5.0:  "orange",
        7.0:  "sienna",
        10.0: "goldenrod",
        15.0: "yellow",
        20.0: "pink"
      },
      qpf_decreasing: {
        0.01: "white",
        0.1:  "lime",
        0.25: "green",
        0.5:  "darkgreen",
        0.75: "royalblue",
        1.0:  "dodgerblue",
        1.25: "deepskyblue",
        1.5:  "cyan",
        1.75: "mediumpurple",
        2.0:  "darkorchid",
        2.5:  "purple",
        3.0:  "maroon",
        4.0:  "red",
        5.0:  "coral",
        7.0:  "orange",
        10.0: "sienna",
        15.0: "goldenrod",
        20.0: "pink"
      },
      prcpoutlooks: {
        Below: {
          90.0: "#48322E",
          80.0: "#7E4005",
          70.0: "#934639",
          60.0: "#9C4438",
          50.0: "#B86F33",
          40.0: "#DBA848",
          33.0: "#EFD591"
        },
        Normal: {
          36.0: "#B1B0A5"
        },
        Above:{
          33.0: "#B3D9AB",
          40.0: "#94CD7E",
          50.0: "#48AE38",
          60.0: "#397C5E",
          70.0: "#078B43",
          80.0: "#196F3D",
          90.0: "#245811"
        }
      },
      tempoutlooks: {
        Below: {
          90.0: "#19133B",
          80.0: "#221A50",
          70.0: "#2F3E6B",
          60.0: "#045BA0",
          50.0: "#389FDB",
          40.0: "#77B6E0",
          33.0: "#A2BFD9"
        },
        Normal: {
          36.0: "#B1B0A5"
        },
        Above:{
          33.0: "#E4B16B",
          40.0: "#E58A49",
          50.0: "#DB5829",
          60.0: "#CD2B2C",
          70.0: "#C33546",
          80.0: "#842E39",
          90.0: "#602326"
        }
      },
      msprcpoutlooks: {
        Below: {
          33.0: "#EFD591",
          40.0: "#DBA848",
          50.0: "#B86F33",
          60.0: "#9C4438",
          70.0: "#7E4005",
          80.0: "#48322E",
          90.0: "#48322E"
        },
        Normal: {
          33.0: "#D2DDDE",
          40.0: "#B3B0B1",
          50.0: "#7F7A7C",
          60.0: "#7F7A7C",
          70.0: "#7F7A7C",
          80.0: "#7F7A7C",
          90.0: "#7F7A7C"
        },
        Above: {
          33.0: "#B3D9AB",
          40.0: "#94CD7E",
          50.0: "#48AE38",
          60.0: "#397C5E",
          70.0: "#196F3D",
          80.0: "#245811",
          90.0: "#245811"
        },
      EC: {
          33.0: "#FFFFFF"
        }
      },
      mstempoutlooks: {
        Below: {
          33.0: "#A4BED4",
          40.0: "#81B9E1",
          50.0: "#4A98C7",
          60.0: "#045C98",
          70.0: "#2D3B68",
          80.0: "#1E154C",
          90.0: "#130D32"
        },
        Normal: {
          33.0: "#D2DDDE",
          40.0: "#B3B0B1",
          50.0: "#7F7A7C",
          60.0: "#7F7A7C",
          70.0: "#7F7A7C",
          80.0: "#7F7A7C",
          90.0: "#7F7A7C"
        },
        Above: {
          33.0: "#E0B361",
          40.0: "#FB8B51",
          50.0: "#DA5733",
          60.0: "#C72A2A",
          70.0: "#CB2E43",
          80.0: "#8C3538",
          90.0: "#581C21"
        },
      EC: {
          33.0: "#FFFFFF"
        }
      }
    }
  }

  componentDidMount = () => {
    axios.get("./data/" + this.props.mapdefs.timeperiod + ".json")
      .then(results => {
        const fprops = results.data.map_features.features[0].properties
        let mapdate = ''
        if (fprops.VALID_TIME) {
          mapdate = "Valid: " + fprops.VALID_TIME
        } else if (fprops.Start_Date) {
          mapdate = fprops.Start_Date + " to " + fprops.End_Date
        } else if (fprops.Valid_Seas) {
          mapdate = fprops.Valid_Seas
        }
        // for qpf maps, look for decreasing bulleyes
        if (this.props.mapdefs.timeperiod.indexOf("qpf") >= 0) {
          results.data.map_features = sortPolygons(results.data.map_features,"QPF")
        }
        this.setState({
          clines: results.data.map_features,
          mapDate: mapdate,
          contours: results.data.values
        })
      })
      .catch(err => {
        console.log("Outlook Lines Error: " + err)
        this.setState({
          clines: null,
          mapDate: "This map is temporarily unavailable",
          contours: null
        })
      });
  }

  getStyle = (feature) => {
    const fprops = feature.properties
    const maptype = this.props.mapdefs.maptype
    return maptype === "qpf" ? ( 
      {
        color: fprops.direction === 'decreasing' ? this.colorCodes[maptype+"_decreasing"][fprops.QPF] : this.colorCodes[maptype][fprops.QPF], 
        fillOpacity: 1.0, 
        weight: 1, 
        opacity: 1
      } 
    ) : (
      {
        color: this.colorCodes[maptype][fprops.Cat][fprops.Prob], 
        fillOpacity: 0.8, 
        weight: 1, 
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
        <Map
          className={this.props.classNames}
          bounds={[[bbox[1], bbox[0]], [bbox[3], bbox[2]]]}
          maxBounds={MarkerMaps.maxBounds}
          minZoom={4}
          maxZoom={MarkerMaps.maxZoomLevel}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
          onClick={this.handleMapClick}
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

        {this.state.contours && this.props.mapdefs.maptype === 'qpf' &&
          <QpfGisLegend colorCodes={this.colorCodes[this.props.mapdefs.maptype]} contours={this.state.contours} />
        }
        {this.state.contours && (this.props.mapdefs.maptype === 'prcpoutlooks' || this.props.mapdefs.maptype === 'tempoutlooks') &&
          <OutlookGisLegend colorCodes={this.colorCodes[this.props.mapdefs.maptype]}  contours={this.state.contours} />
        }
        {(this.props.mapdefs.maptype === 'msprcpoutlooks' || this.props.mapdefs.maptype === 'mstempoutlooks') &&
          <MsoutlookGisLegend colorCodes={this.colorCodes[this.props.mapdefs.maptype]} />
        }

      </div>
    )
  }
}