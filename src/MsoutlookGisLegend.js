import React, { Component } from 'react'

export default class MsoutlookGisLegend extends Component {
  constructor () {
    super()
    this.legend_defs = {
      "href1": "https://www.cpc.ncep.noaa.gov/",
      "text1": "DOC/NOAA/NWS/NCEP/CPC",
      "helpref": "https://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal_info.php"
    }
    this.pcts = [33.0, 40.0, 50.0, 60.0, 70.0, 80.0]
    this.normal_pcts = [33.0, 40.0, 50.0]
}

  render() {
    return (
      <div className="outlookLegend-container">
        <table>
            <thead style={{borderBottom:"0"}}>
                <tr>
                    <td colSpan="37">Explanation - Probabilities (percent)</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><div>&nbsp;</div></td>
                    {this.pcts.map((p) => (
                        <td key={p} colSpan="2" className={`topbotbor${p===33?" lbor":""}`} style={{backgroundColor:this.props.colorCodes["Below"][p]}}><div></div></td>
                    ))}
                    <td className="lbor"></td>
                    {this.normal_pcts.map((p) => (
                        <td key={p} colSpan="2" className={`topbotbor${p===33? " lbor":""}`} style={{backgroundColor:this.props.colorCodes["Normal"][p]}}><div></div></td>
                    ))}
                    <td className="lbor"></td>
                    {this.pcts.map((p) => (
                        <td key={p} colSpan="2" className={`topbotbor${p===33?" lbor":""}`} style={{backgroundColor:this.props.colorCodes["Above"][p]}}><div></div></td>
                    ))}
                    <td className="lbor"></td>
                    <td colSpan="2" className="topbotbor lrbor" style={{backgroundColor:"#FFFFFF"}}><div></div></td>
                    <td></td>
                </tr>
                <tr>
                    {this.pcts.map((p) => (
                        <td key={p} colSpan="2"><div>{p}</div></td>
                    ))}
                    <td></td>
                    {this.normal_pcts.map((p) => (
                        <td key={p} colSpan="2"><div>{p}</div></td>
                    ))}
                    <td></td>
                    {this.pcts.map((p) => (
                        <td key={p} colSpan="2"><div>{p}</div></td>
                    ))}
                    <td></td>
                    <td colSpan="2"><div></div></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td colSpan="12">Prob Below Normal</td>
                    <td></td>
                    <td colSpan="6">Prob Near Normal</td>
                    <td></td>
                    <td colSpan="12">Prob Above Normal</td>
                    <td colSpan="4">Equal Chance</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="33">Data provided by <a href={this.legend_defs.href1} target="_blank">{this.legend_defs.text1}</a>.</td>
                    <td colSpan="4"><a href={this.legend_defs.helpref} target="_blank">Help</a></td>
                </tr>
            </tfoot>
        </table>
      </div>
    )
  }
}