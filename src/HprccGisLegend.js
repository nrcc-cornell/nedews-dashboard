import React, { Component } from 'react'

export default class HprccGisLegend extends Component {
  constructor() {
    super()
    this.legend_defs = {
      "href": "https://hprcc.unl.edu/maps.php?map=ACISClimateMaps",
      "text": "High Plains Regional Climate Center"
    }
  }

  render() {
    return (

        <table className="mapLegend-container">
            <thead>
                <tr>
                  <td colSpan="12"><span style={{fontWeight:"bold"}}>Explanation - SPI Levels</span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><div className="mapLegend-icon mapLegend-icon-black"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-darkred"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-red"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-darkorange"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-goldenrod"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-yellow"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-lime"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-green"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-dodgerblue"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-indigo"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-darkviolet"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-fuchsia"></div></td>
                </tr>
                <tr>
                    <td>&lt;-3.0</td>
                    <td>-3.0 to -2.5</td>
                    <td>-2.5 to -2.0</td>
                    <td>-2.0 to -1.5</td>
                    <td>-1.5 to -1.0</td>
                    <td>-1.0 to 0.0</td>
                    <td>0.0 to 1.0</td>
                    <td>1.0 to 1.5</td>
                    <td>1.5 to 2.0</td>
                    <td>2.0 to 2.5</td>
                    <td>2.5 to 3.0</td>
                    <td>&gt;3.0</td>
                 </tr>
            </tbody>
            <tfoot>
                <tr>
                  <td colSpan="12">Data provided by <a href={this.legend_defs.href} target="_blank">{this.legend_defs.text}</a>; updated {this.props.mapDate}.</td>
                </tr>
            </tfoot>
        </table>

    )
  }
}