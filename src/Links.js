import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import Modal from '@material-ui/core/Modal'
import Cancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import linkInfo from './linkInfo.json'
import HoverLink from './HoverLink'

export default class Links extends Component { 
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      linkInfo: ""
    }
    this.linkKeys = ["usdm","ahps","nc-ahps","dmmaps","blends","usgs-sf","usgs-gw","negs_gw","nygs_gw","nhdes-gw","hprcc-acis","qdri","vdri","eddi","sport","grace","nldas","vic","cpc-sm","cpc-pdsi","cpc-topsoil","cpc-blends",
    "cpc-hazards","ne-sweq","edd","nidis","nrccdu","dir","spei","nyc-resv","me-wells","vtanr","enso","cocorahs" ]
  }
  
  handleHoverHelp = (info) => {
    this.setState({ linkInfo: info })
  }

  handleOpenModal = (info) => {
    this.setState({ showModal: true, linkInfo: info })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  renderLinks = () => {
    return (
      this.linkKeys.map((k) => 
        <li key={k}>
          <HoverLink linkinfo={linkInfo[k]} handleHoverHelp={this.handleHoverHelp} handleOpenModal={this.handleOpenModal} />
        </li>
      )
    )
  }

  render() {
    return (
      <div>
        <Collapsible trigger="Other Drought Tools" triggerTagName="h4" open={true} transitionTime={200}>         
          <Grid container spacing={8} justify="flex-start">
            <Grid item xs={12} sm={5}>
              <ul>{this.renderLinks()}</ul>
            </Grid>
            <Grid item xs={false} sm={7}>
              {this.state.linkInfo && 
                <div className="hover-content-container">
                  <img src={this.state.linkInfo.image} alt="sample" /> <span>{this.state.linkInfo.text}</span>
                </div>
              }
            </Grid>
          </Grid>
        </Collapsible>

        <Modal 
          open={this.state.showModal}
          onClose={this.handleCloseModal}
        >
          <div className="modal-container">
            <Tooltip title="Close">
              <Cancel style={{position:"absolute",top:"0",right:"0"}} onClick={this.handleCloseModal}  />
            </Tooltip>
            <p>{this.state.linkInfo.text}</p>
            <img src={this.state.linkInfo.image} className="modal-container-image" alt="sample" />
          </div>
        </Modal>
      </div>
    )
  }
}