import React, { Component } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

export default class StatusUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: null,
      headline: "Drought Status Update",
      anchor: null,
      link: null
    }
  }

  componentDidMount = () => {
    axios.get("https://www.nrcc.cornell.edu/regional/drought/update/drought_update.json")
    .then(results => {
        let statustext = [(results.data.postdate).replace("Posted ",""), results.data.dews_status].join(" - ")
        this.setState({status: statustext})
        if (results.data.dews_headline) {
          this.setState({ headline : results.data.dews_headline })
        }
        if (results.data.dews_link && results.data.dews_anchor) {
          this.setState({link: results.data.dews_link, anchor: results.data.dews_anchor})
        }
    })
    .catch(err => {
        console.log("Drought Update Read Error: " + err)
        this.setState({status: null})
    })
  }

  render() {
    return (
      <div>
        {this.state.status &&
          <div>
            <Typography variant="h6">
              {this.state.headline}
            </Typography>
            <Paper style={{border:"1pt solid black", padding:"4px", maxHeight:"220px", overflow:"auto"}}>
              <Typography variant="body2" align="left" style={{fontFamily:"Open Sans,sans-serif", fontSize:"13px"}}>
                {this.state.status}
                {this.state.link && this.state.anchor &&
                  <React.Fragment>
                    &nbsp;
                    <a href={this.state.link} target="_blank">{this.state.anchor}</a>
                    .
                  </React.Fragment>
                }
              </Typography>
            </Paper>
          </div>
        }
      </div>
    )
  }
}