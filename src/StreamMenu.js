import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default class StreamMenu extends Component { 
  constructor (props) {
    super(props)
    this.state = {
      anchorEl: null,
      selectedIndex: 1
    }
  }

  handleButtonClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null })
    this.props.handleStreamMenuChange(index)
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }
    
  render() {
    return (
      <div className="streammenu-container">
        <Button
          onClick={this.handleButtonClick}
          size="small"
          variant="outlined"
        >
          Change time period
        </Button>
        <Menu
          id="streammenu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.streamflows.map((option, index) => (
            <MenuItem 
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
              className="streammenu-menuitem"
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}