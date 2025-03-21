import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'
import OutlookGisMaps from './OutlookGisMaps'
import OutlookModal from './OutlookModal'

export default class OutlookMaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      mapdefs: [],
      links: []
    }
    this.mapdefs = {
      qpf_day1: {timeperiod: "qpf_day1", mapTitle: "Day 1 QPF", maptype: "qpf"},
      qpf_day2: {timeperiod: "qpf_day2", mapTitle: "Day 2 QPF", maptype: "qpf"},
      qpf_day3: {timeperiod: "qpf_day3", mapTitle: "Day 3 QPF", maptype: "qpf"},
      qpf_7day: {timeperiod: "qpf_7day", mapTitle: "7 Day QPF", maptype: "qpf"},
      prcp_610day: {timeperiod: "prcp_610day", mapTitle: "6-10 Day Precipitation Outlook", maptype: "prcpoutlooks"},
      temp_610day: {timeperiod: "temp_610day", mapTitle: "6-10 Day Temperature Outlook", maptype: "tempoutlooks"},
      prcp_814day: {timeperiod: "prcp_814day", mapTitle: "8-14 Day Precipitation Outlook", maptype: "prcpoutlooks"},
      temp_814day: {timeperiod: "temp_814day", mapTitle: "8-14 Day Temperature Outlook", maptype: "tempoutlooks"},
      prcp_month: {timeperiod: "prcp_month", mapTitle: "Monthly Precipitation Outlook", maptype: "msprcpoutlooks"},
      temp_month: {timeperiod: "temp_month", mapTitle: "Monthly Temperature Outlook", maptype: "mstempoutlooks"},
      prcp_seas:  {timeperiod: "prcp_seas", mapTitle: "3-Month Precipitation Outlook", maptype: "msprcpoutlooks"},
      temp_seas:  {timeperiod: "temp_seas", mapTitle: "3-Month Temperature Outlook", maptype: "mstempoutlooks"}
    }
    this.image34prcp = "https://www.cpc.ncep.noaa.gov/products/predictions/WK34/gifs/WK34prcp.gif"
    this.image34temp = "https://www.cpc.ncep.noaa.gov/products/predictions/WK34/gifs/WK34temp.gif"
    this.imagedo =  "https://www.cpc.ncep.noaa.gov/products/expert_assessment/month_drought.png"
    this.imageso =  "https://www.cpc.ncep.noaa.gov/products/expert_assessment/season_drought.png"
  }

  handleMapClick = (mapprops) => {
    const timeperiod = mapprops.timeperiod
    let mapdefs = [], links = []
    if (timeperiod.indexOf("610day") >= 0) {
      mapdefs = [this.mapdefs.prcp_610day, this.mapdefs.temp_610day]
      links = [
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/610day/", anchor: "View national maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/erf_info.php?outlook=610&var=p", anchor: "How to read precipitation maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/erf_info.php?outlook=610&var=t", anchor: "How to read temperature maps"}
      ]
    } else if (timeperiod.indexOf("814day") >= 0) {
      mapdefs = [this.mapdefs.prcp_814day, this.mapdefs.temp_814day]
      links = [
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/814day/", anchor: "View national maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/erf_info.php?outlook=814&var=p", anchor: "How to read precipitation maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/erf_info.php?outlook=814&var=t", anchor: "How to read temperature maps"}
      ]
      } else if (timeperiod.indexOf("month") >= 0) {
      mapdefs = [this.mapdefs.prcp_month, this.mapdefs.temp_month]
      links = [
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/long_range/lead14/index.php", anchor: "View national maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus07.html", anchor: "Prognostic discussion"}
      ]
    } else if (timeperiod.indexOf("seas") >= 0) {
      mapdefs = [this.mapdefs.prcp_seas, this.mapdefs.temp_seas]
      links = [
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal.php?lead=1", anchor: "View national maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal_info.php", anchor: "How to read seasonal outlook maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/multi_season/13_seasonal_outlooks/color/p.gif", anchor: "Full suite of seasonal precipitation outlook maps"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/multi_season/13_seasonal_outlooks/color/t.gif", anchor: "Full suite of seasonal temperature outlook maps"}
      ]
    } else if (timeperiod.indexOf("qpf") >= 0) {
      mapdefs = [this.mapdefs.qpf_day1, this.mapdefs.qpf_day2, this.mapdefs.qpf_day3, this.mapdefs.qpf_7day]
      links = [
        {href: "https://www.wpc.ncep.noaa.gov/qpf/qpf2.shtml", anchor: "Go to natonal QPF page"},
        {href: "https://www.wpc.ncep.noaa.gov/html/fam2.shtml#qpf", anchor: "QPF product information"}
      ]
    } else if (timeperiod.indexOf("wk34") >= 0) {
      mapdefs = [this.image34prcp, this.image34temp]
      links = [
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/WK34/", anchor: "Go to main Week 3-4 Outlooks page"},
        {href: "https://www.cpc.ncep.noaa.gov/products/predictions/WK34/week34faq.php", anchor: "How to read 3-4 Week Outlooks"}
      ]
    } else if (timeperiod.indexOf("msdo") >= 0) {
      mapdefs = [this.imagedo, this.imageso]
      links = [
        {href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/mdo_summary.php", anchor: "Monthly Drought Outlook page"},
        {href: "https://www.cpc.ncep.noaa.gov/products/expert_assessment/sdo_summary.php", anchor: "Seasonal Drought Outlook page"}
      ]
    }
    this.setState({showModal: true, mapdefs: mapdefs, links: links})
  }

  handleCloseModal = () => {
    this.setState({showModal : false})
  }

  render() {
    const bigClassName = "outlook-map"
    const modalClassName = "outlook-modal-map"
    return (
        <div>
            <Collapsible trigger="NOAA NCEP Outlooks" triggerTagName="h4" open={true} transitionTime={200}>
              <Grid container spacing={0} justify="flex-start">
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.qpf_day1} classNames={bigClassName} handleMapClick={this.handleMapClick} /> 
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.qpf_day2} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                 </Grid>
                <Grid item xs={12} sm={3} >
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.qpf_day3} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.qpf_7day} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
              </Grid>          

              <Grid container spacing={0} justify="flex-start">
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.prcp_610day} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.temp_610day} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.prcp_814day} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.temp_814day} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
              </Grid>

              <Grid container spacing={0} justify="flex-start">
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.prcp_month} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.temp_month} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.prcp_seas} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <OutlookGisMaps selectedState={this.props.selectedState} mapdefs={this.mapdefs.temp_seas} classNames={bigClassName} handleMapClick={this.handleMapClick} />
                </Grid>
              </Grid>

              <Grid container spacing={0} justify="flex-start">
                <Grid item xs={12} sm={3}>
                  <img src={this.image34prcp} className="outlookmap-border" alt="outlook map" onClick={this.handleMapClick.bind(this,{timeperiod:"wk34"})} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <img src={this.image34temp} className="outlookmap-border" alt="outlook map" onClick={this.handleMapClick.bind(this,{timeperiod:"wk34"})} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <img src={this.imagedo} className="outlookmap-border" alt="outlook map" onClick={this.handleMapClick.bind(this,{timeperiod:"msdo"})} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <img src={this.imageso} className="outlookmap-border" alt="outlook map" onClick={this.handleMapClick.bind(this,{timeperiod:"msdo"})} />
                </Grid>
              </Grid>
            </Collapsible>

            <OutlookModal 
              showModal={this.state.showModal} 
              handleCloseModal={this.handleCloseModal} 
              selectedState={this.props.selectedState} 
              classNames={modalClassName}
              mapdefs={this.state.mapdefs}
              links={this.state.links}
            />
        </div>
    )
  }
}
/*
                  <a href="https://www.wpc.ncep.noaa.gov/qpf/fill_94qwbg.gif" target="_blank" rel="nofollow">View Day 1 QPF</a>
                  <a href="https://www.wpc.ncep.noaa.gov/qpf/fill_98qwbg.gif" target="_blank" rel="nofollow">View Day 2 QPF</a>
                  <a href="https://www.wpc.ncep.noaa.gov/qpf/fill_99qwbg.gif" target="_blank" rel="nofollow">View Day 3 QPF</a>
                  <a href="https://www.wpc.ncep.noaa.gov/qpf/p168i.gif" target="_blank" rel="nofollow">View 7-Day QPF</a>
*/       