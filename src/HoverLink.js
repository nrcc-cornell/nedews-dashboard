import React, { Component } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

export default class HoverLink extends Component {
  constructor(props) {
    super(props)
    this.info = this.props.linkinfo
  }

  handleMouseEnter = () => {
    this.props.handleHoverHelp(this.info)
  }

  handleMouseLeave = () => {
    this.props.handleHoverHelp("")
  }

  handleHelpClick = () => {
    this.props.handleOpenModal(this.info)
  }

  render() {
    return (
      <div>
        <a href={this.info.href} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} target="_blank">{this.info.anchor}</a>
        <div className="link-helpicon-container">
          <HelpOutlineIcon style={{fontSize:"1em"}} onClick={this.handleHelpClick} alt="help" />
        </div>
      </div>
    )
  }
}