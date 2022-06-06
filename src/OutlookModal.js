import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import Cancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import OutlookGisMaps from './OutlookGisMaps'

export default class OutlookModal extends Component {

  handleMapClick = () => {
    return
  }

  render() {
    return (
        <Modal 
          open={this.props.showModal}
          onClose={this.props.handleCloseModal}
          style={{right:"5%", left:"5%", top:"5%", bottom:"5%", maxWidth:"922px"}}
        >
          <div className="modal-container">
            <Tooltip title="Close">
              <Cancel style={{position:"absolute",top:"0",right:"0"}} onClick={this.props.handleCloseModal}  />
            </Tooltip>
            <div style={{paddingTop:"2em"}}>
              <Grid container spacing={8} justify="center">
                  {this.props.mapdefs.map((md, i) => (
                    <Grid key={i} item xs={6}>
                      {typeof md === "string" 
                        ? <img src={md} className="outlook-modal-linkedmap" alt="outlook map" />
                        : <OutlookGisMaps selectedState={this.props.selectedState} classNames={this.props.classNames} mapdefs={md} handleMapClick={this.handleMapClick} />
                      }
                    </Grid>
                 ))}
               </Grid>
              {this.props.links.map((ml, i) => (
                <p key={i} style={{margin:"0.5em 0"}}><a href={ml.href} target="_blank">{ml.anchor}</a></p>
              ))}
            </div>
          </div>
        </Modal>
    )
  }
}