import React, { Component } from 'react'

export default class UsgsLegend extends Component {
    constructor() {
      super()
      this.legend_defs = {
        groundwater: {
          "href1": "https://groundwaterwatch.usgs.gov",
          "text1": "USGS Groundwater Watch",
          "href2": "https://groundwaterwatch.usgs.gov/default.asp",
          "text2": "AGLN"
        }, 
        streamflow: {
          "href1": "https://waterwatch.usgs.gov",
          "text1": "USGS WaterWatch",
          "href2": "https://waterwatch.usgs.gov/index.php?id=ww_current",
          "text2": "Streamflow"
        }
      }
    }

  render() {
    const href1 = this.legend_defs[this.props.mapType]["href1"],
          text1 = this.legend_defs[this.props.mapType]["text1"],
          href2 = this.legend_defs[this.props.mapType]["href2"],
          text2 = this.legend_defs[this.props.mapType]["text2"]
    return (
      <table className="mapLegend-container">
        <thead>
          <tr>
            <td colSpan="7"><span style={{fontWeight:"bold"}}>Explanation - Percentile Classes</span></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div className="mapLegend-icon mapLegend-icon-red"></div></td>
            <td><div className="mapLegend-icon mapLegend-icon-darkred"></div></td>
            <td><div className="mapLegend-icon mapLegend-icon-darkorange"></div></td>
            <td><div className="mapLegend-icon mapLegend-icon-lime"></div></td>
            <td><div className="mapLegend-icon mapLegend-icon-lightblue"></div></td>
            <td><div className="mapLegend-icon mapLegend-icon-blue"></div></td>
            <td><div className="mapLegend-icon mapLegend-icon-black"></div></td>
          </tr>
          <tr>
            <td rowSpan="2">Low</td>
            <td>Much below normal</td>
            <td>Below normal</td>
            <td>Normal</td>
            <td>Above normal</td>
            <td>Much above normal</td>
            <td rowSpan="2">High</td>
          </tr>
          <tr>
            <td>&lt;10%</td>
            <td>10-24%</td>
            <td>25-75%</td>
            <td>76-90%</td>
            <td>&gt;90%</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7">Data provided by <a href={href1} target="_blank">{text1}</a> - <a href={href2} target="_blank">{text2}</a>; updated {this.props.mapDate}.</td>
          </tr>
        </tfoot>
      </table>
    )
  }
}