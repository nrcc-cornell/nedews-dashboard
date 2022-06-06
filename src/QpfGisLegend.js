import React, { Component } from 'react'

export default class QpfGisLegend extends Component {
  constructor() {
    super()
    this.legend_defs = {
        "href": "https://www.wpc.ncep.noaa.gov/",
        "text": "DOC/NOAA/NWS/NCEP/WPC"
    }
  }

  render() {
    const colspan = (this.props.contours.length + 1) * 2
    return (
      <div className="qpfLegend-container">
        <table>
            <thead>
                <tr>
                    <td colSpan={colspan}>Explanation - Forecast precipitation (inches)</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan="2" style={{backgroundColor:this.props.colorCodes[0]}}><div>&nbsp;</div></td>
                    {this.props.contours.map((k) => (
                        <td key={k} colSpan="2" style={{backgroundColor:this.props.colorCodes[k]}}><div></div></td>
                    ))}
                </tr>
                <tr>
                    <td colSpan="1"><div></div></td>
                    {this.props.contours.map((c) => (
                        <td key={c} colSpan="2"><div>{c.toFixed(2)}</div></td>
                    ))}
                    <td colSpan="1"><div></div></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={colspan}>Data provided by <a href={this.legend_defs.href} target="_blank">{this.legend_defs.text}</a>.</td>
                </tr>
            </tfoot>
        </table>
      </div>
    )
  }
}