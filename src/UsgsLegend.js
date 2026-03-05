import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import Cancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'

export default class UsgsLegend extends Component {
    constructor() {
      super()
      this.state = {
        showModal: false
      }
      this.legend_defs = {
        groundwater: {
          "href1": "https://waterdata.usgs.gov/",
          "text1": "  USGS Water Data for the Nation",
//          "href2": "https://dashboard.waterdata.usgs.gov/app/nwd/lang-en/?aoi=default",
//          "text2": "Info"
        }, 
        streamflow: {
          "href1": "https://waterdata.usgs.gov",
          "text1": "USGS Water Data for the Nation",
//          "href2": "https://waterwatch.usgs.gov/index.php?id=ww_current",
//          "text2": "Streamflow"
        }
      }
    }

  handleOpenModal = (e) => {
    //e.preventDefault();
    this.setState({ showModal: e })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const href1 = this.legend_defs[this.props.mapType]["href1"],
          text1 = this.legend_defs[this.props.mapType]["text1"],
//          href2 = this.legend_defs[this.props.mapType]["href2"],
//          text2 = this.legend_defs[this.props.mapType]["text2"],
          mapType = this.props.mapType,
          cagType = this.props.cagType
    return (
      <div>
        {mapType === 'streamflow' &&
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
                <td>&le;10%</td>
                <td>10-25%</td>
                <td>25-75%</td>
                <td>75-90%</td>
                <td>&gt;90%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="7">Data provided by <a href={href1} target="_blank">{text1}</a> - <a href='#' onClick={() =>this.handleOpenModal('sf')}>About this map</a>; updated {this.props.mapDate}.</td>
              </tr>
            </tfoot>
          </table>
        }

        {(mapType === 'groundwater' && cagType === 'usgs') &&
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
                <td>&le;10%</td>
                <td>10-25%</td>
                <td>25-75%</td>
                <td>75-90%</td>
                <td>&gt;90%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="7">Data provided by <a href={href1} target="_blank">{text1}</a> - <a href='#' onClick={() =>this.handleOpenModal('sf')}>About this map</a>; updated {this.props.mapDate}.</td>
              </tr>
            </tfoot>
          </table>
        }

        {(mapType === 'groundwater' && cagType === 'usdm') &&
          <table className="mapLegend-container">
            <thead>
              <tr>
                <td colSpan="11"><span style={{fontWeight:"bold"}}>Explanation - Percentile Classes</span></td>
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
              <tr style={{height:"2.5em"}}>
                <td><b>D4</b>:<br/> &le;2%</td>
                <td><b>D3</b>:<br/>2-5%</td>
                <td><b>D2</b>:<br/>5-10%</td>
                <td><b>D1</b>:<br/>10-20%</td>
                <td><b>D0</b>:<br/>20-30%</td>
                <td>30-70%</td>
                <td>70-80%</td>
                <td>80-90%</td>
                <td>90-95%</td>
                <td>95-98%</td>
                <td>&gt;98%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="11">Data provided by <a href={href1} target="_blank">{text1}</a> - <a href='#' onClick={() =>this.handleOpenModal('gw')}>About this map</a>; updated {this.props.mapDate}.</td>
              </tr>
            </tfoot>
          </table>
        }

        <Modal 
          open={this.state.showModal === 'gw' || this.state.showModal === 'sf'}
          onClose={this.handleCloseModal} 
          className="modal-container-container"
          >
          <div className="modal-container">
            <Tooltip title="Close">
              <Cancel onClick={this.handleCloseModal} />
            </Tooltip>
            {this.state.showModal === 'gw' &&
              <React.Fragment>
                <h2>Groundwater Status Map</h2>
                <p>
                  This map is based on daily values and field observations retrieved from the <a href="https://api.waterdata.usgs.gov" target="blank">USGS Water Data API</a>. 
                  Station percentile values plotted on this map were computed by NRCC using the 
                  USGS <a href="https://water.usgs.gov/catalog/tools/0388b0a4-66ec-47ad-9ba9-07ac621ddd06/" target="blank">dataretrieval</a>
                  &nbsp;and <a href="https://water.usgs.gov/catalog/tools/8ceba06b-08fe-437d-bf6e-4f843639b958/" target="blank">hyswap</a> tools. 
                  Ranges for the percentile clssses are based on the approved historical data occurring within a 30-day window centered on the date of interest 
                  and filtered down to just the measurement taken closest to the date of interest for each year. Percentiles were 
                  computed for stations with at least 10 years of historical data. Current year percentile values may be 
                  based on either approved or provisional data. The accuracy of provisional data has not been verified by USGS. 
                </p>
              </React.Fragment>
            }
            {this.state.showModal === 'sf' &&
              <React.Fragment>
                <h2>Streamflow Status Map</h2>
                <p>
                  This map is based on observations retrieved from the <a href="https://api.waterdata.usgs.gov" target="blank">USGS Water Data API</a>. 
                  Data include approved, quality-assured data, and more recent provisional data, whose accuracy has not been verified by USGS.  
                  Note that for some streams, flow statistics may have been computed from mixed regulated
                  and unregulated flows; this can affect depictions of flow conditions.
                </p>
                <p >
                  Station percentile values plotted on this map were computed by NRCC using the 
                  USGS <a href="https://water.usgs.gov/catalog/tools/0388b0a4-66ec-47ad-9ba9-07ac621ddd06/" target="blank">dataretrieval</a>
                  &nbsp;and <a href="https://water.usgs.gov/catalog/tools/8ceba06b-08fe-437d-bf6e-4f843639b958/" target="blank">hyswap</a> tools. 
                  Percentiles are based on approved historical data occurring within 1-, 7-, 14-, and 28-day windows ending on the date of interest 
                  and summarized as the mean value for the period for each year. Current year percentile values may be based on either approved or provisional data. 
                  Percentiles were computed for stations with at least 20 years of historical data. 
                </p>
              </React.Fragment>
            }
          </div>
        </Modal>
      </div>
    )
  }
}

//<a href='#' onClick={() => this.handleOpenModal('sf')}>About this map</a>