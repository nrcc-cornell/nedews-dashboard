import React, { Component } from 'react'
import { GeoJSON } from 'react-leaflet'
import axios from 'axios'

const usdmStyle = [
	{color: "#FFFF00", weight:1, fillColor: "#FFFF00", fillOpacity: 0.8}, //D0
	{color: "#FCD37F", weight:1, fillColor: "#FCD37F", fillOpacity: 0.8}, //D1
	{color: "#FFAA00", weight:1, fillColor: "#FFAA00", fillOpacity: 0.8}, //D2
	{color: "#E60000", weight:1, fillColor: "#E60000", fillOpacity: 0.8}, //D3
	{color: "#730000", weight:1, fillColor: "#730000", fillOpacity: 0.8}  //D4
]

export default class UsdmOverlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usdm: null,
    }
  }

  componentDidMount = () => {
    axios.get("./data/usdm.json")
      .then(results => {
				this.setState({usdm: results.data})
      })
      .catch(err => {
        console.log("USDM Read Error: " + err)
      })
  }

   render () {
      return (
				<div>
         {this.state.usdm && 
            this.state.usdm.map((g, i) => (
              <GeoJSON
                key={i}
                data={g}
								interactive={false}
                style={usdmStyle[g.properties.DM]}
              />
            ))
				  }
				</div>
      )
   }
}
