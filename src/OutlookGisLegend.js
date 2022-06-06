import React, { Component } from 'react'

export default class OutlookGisLegend extends Component {
  constructor () {
    super()
    this.legend_defs = {
        "href1": "https://www.cpc.ncep.noaa.gov/",
        "text1": "DOC/NOAA/NWS/NCEP/CPC"
    }
  }

  findUsedPcts = () => {
    let used_pcts = []
    if (this.props.contours) {
        let clist = this.props.contours.map((c) => {
            return parseFloat(c.split("|")[1])
        })
        const clist_max = Math.max(...clist)
        const possible_pcts = [90.0,80.0,70.0,60.0,50.0,40.0,33.0]
        possible_pcts.forEach((p) => {
            if (p <= clist_max) {
                used_pcts.push(p)
            }
        })
    }
    return used_pcts
  }

  render() {
    const used_pcts = this.findUsedPcts()
    const colcnt_pcts = used_pcts.length * 2
    const colcnt_all = (colcnt_pcts * 2) + 2
    return (
      <div className="outlookLegend-container">
        <table>
            <thead>
                <tr>
                    <td colSpan={colcnt_all}>Explanation - Probabilities (percent)</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {used_pcts.map((p) => (
                        <td key={p} colSpan="2" style={{backgroundColor:this.props.colorCodes["Below"][p]}}><div></div></td>
                    ))}
                    <td colSpan="2" style={{backgroundColor:"#B1B0A5"}}><div>&nbsp;</div></td>
                    {used_pcts.slice(0).reverse().map((p) => (
                        <td key={p} colSpan="2" style={{backgroundColor:this.props.colorCodes["Above"][p]}}><div></div></td>
                    ))}
                </tr>
                <tr>
                    <td colSpan="1"><div></div></td>
                    {used_pcts.map((p) => (
                        <td key={p} colSpan="2"><div>{p}</div></td>
                    ))}
                    {used_pcts.slice(0).reverse().map((p) => (
                        <td key={p} colSpan="2"><div>{p}</div></td>
                    ))}
                    <td colSpan="1"><div></div></td>
                </tr>
                <tr>
                    <td colSpan={colcnt_pcts-1}>Prob Below Normal</td>
                    <td colSpan="4" style={{borderLeft:"1pt solid gray", borderRight:"1pt solid gray"}}>Normal</td>
                    <td colSpan={colcnt_pcts-1}>Prob Above Normal</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={colcnt_all}>Data provided by <a href={this.legend_defs.href1} target="_blank">{this.legend_defs.text1}</a>.</td>
                </tr>
            </tfoot>
        </table>
      </div>
    )
  }
}