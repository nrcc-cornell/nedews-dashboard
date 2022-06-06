import React, { Component } from 'react'
import { GeoJSON } from 'react-leaflet'
import axios from 'axios'

const geojsonStyle = {
    color: "gainsboro", 
    weight:1, 
    fillColor: null, 
    fillOpacity: 0.0
}

export default class countyOverlay extends Component {
  constructor (props) {
	super(props)
	this.state = {
		geojson: null,
	}
  }

  componentDidMount = () => {
	axios.get("./data/Northeast_County_Boundaries.geojson")
    .then(results => {
        this.setState({geojson: results.data})
    })
    .catch(err => {
        console.log("County Boundary Overlay Error: " + err)
    })
  }

  render () {
	  return (
		<div>
		 {this.state.geojson && 
			<GeoJSON
				data={this.state.geojson}
				style={geojsonStyle}
			/>
		  }
		</div>
	  )
  }
}
