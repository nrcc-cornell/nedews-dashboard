import React, { Component } from 'react'

export default class NrccSpiLegend extends Component {
  constructor() {
    super()
    this.legend_defs = {
      "href": "https://www.nrcc.cornell.edu",
      "text": "Northeast Regional Climate Center"
    }
  }

  render() {
    return (

        <table className="mapLegend-container">
            <thead>
                <tr>
                  <td colSpan="11"><span style={{fontWeight:"bold"}}>Explanation - SPI Levels</span></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><div className="mapLegend-icon mapLegend-icon-d4"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-d3"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-d2"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-d1"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-d0"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-dnada"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-w0"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-w1"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-w2"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-w3"></div></td>
                    <td><div className="mapLegend-icon mapLegend-icon-w4"></div></td>
                </tr>
                <tr>
                    <td><b>D4</b>: &lt;-2.0</td>
                    <td><b>D3</b>: -2.0 to -1.6</td>
                    <td><b>D2</b>: -1.6 to -1.3</td>
                    <td><b>D1</b>: -1.3 to -0.8</td>
                    <td><b>D0</b>: -0.8 to -0.5</td>
                    <td>-0.5 to 0.5</td>
                    <td>0.5 to 0.8</td>
                    <td>0.8 to 1.3</td>
                    <td>1.3 to 1.6</td>
                    <td>1.6 to 2.0</td>
                    <td>&gt;2.0</td>
                 </tr>
            </tbody>
            <tfoot>
                <tr>
                  <td colSpan="11">Data provided by <a href={this.legend_defs.href} target="_blank">{this.legend_defs.text}</a>. Powered by <a href="https://www.rcc-acis.org" target="_blank">ACIS</a>.</td>
                </tr>
            </tfoot>
        </table>

    )
  }
}