import React from 'react';
import * as topojson from 'topojson-client';
import {geoPath, geoCentroid, geoMercator} from 'd3-geo';
import axios from 'axios';
import PlotCircles from '../js/PlotCircles';
import Tooltip from '../js/Tooltip';
import FilterTab from '../js/FilterTab';
import * as _ from 'underscore';

export default class MapsCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: {},
      topoJSON: {},
      groupedData: undefined 
    }
  }

  componentDidMount() {
    axios.all([axios.get(this.props.dataURL), axios.get(this.props.topoURL)])
      .then(axios.spread((card, topo) => {
        this.setState({
          dataJSON: card.data,
          topoJSON: topo.data         
        });
      })); 
  }

  getScreenSize() {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {
      width: width,
      height: height
    };
  }

  generateFilters() {
    let groupData = _.groupBy(this.state.dataJSON, function (d){
      return d['SDG'];
    })
    console.log(groupData, "groupData")
    return groupData;    
  }
 
  renderLaptop() {
    if (Object.keys(this.state.dataJSON).length === 0 && this.state.dataJSON.constructor === Object) {
      return(<div>Loading</div>)
    } else { 
      let ch = this.state.topoJSON,
        country = topojson.feature(ch, ch.objects);

      let
        center = geoCentroid(topojson.feature(ch, ch.objects)),
        projection = geoMercator().center(center)
          .scale(700)
          .translate([this.props.width / 2, this.props.height / 2]),
        path = geoPath()
          .projection(projection);

      let styles = {
        width: '100%',
        height: 'auto'
      }
      console.log(this.props, "this.props", this.state)

      return(
        <div id="protograph_parent" style={styles}>
          <h1 className='protograph_map_title'>Cow related violence by state</h1>
          {this.props.filterBy ? (this.state.groupedData = this.generateFilters(), <FilterTab data={this.state.groupedData} projection={projection} colorCat={this.props.colorCategory}/>) : ''}
          <svg id='map_svg' width={this.props.width} height={this.props.height - 51}>
            <path className='country' d={path(country)}></path>
            <PlotCircles dataJSON={this.state.groupedData['SDG1']} projection={projection} colorCat={this.props.colorCategory}/>
          </svg>
        </div>
      )
    }   
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
      case 'mobile' :
        return this.renderLaptop();
    }
  }
}