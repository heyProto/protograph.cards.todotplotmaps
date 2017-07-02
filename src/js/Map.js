import React from 'react';
import * as topojson from "topojson-client";
import {geoPath, geoCentroid, geoMercator} from 'd3-geo';
import axios from 'axios';

export default class MapsCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: {},
      topoJSON: {}      
    }
  }

  componentDidMount() {
    if (typeof this.props.dataURL === "string"){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.topoURL)])
        .then(axios.spread((card, topo) => {
          console.log(card, "data----", topo)
          this.setState({
            dataJSON: card.data,
            topoJSON: topo.data         
          });
        }));
    } 
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
 
  renderLaptop() {
    if (Object.keys(this.state.dataJSON).length === 0 && this.state.dataJSON.constructor === Object) {
      return(<div>Loading</div>)
    } else {
      let ch = this.state.topoJSON,
        country = topojson.feature(ch, ch.objects);
      var center = geoCentroid(topojson.feature(ch, ch.objects));

      var projection = geoMercator().center(center)
        .scale(1000)
        .translate([this.props.width / 2, this.props.height / 2]);

      var path = geoPath()
        .projection(projection);

      // console.log(this.state.dataJSON, "this.state.dataJSON")

      // let circles = this.state.dataJSON.map(function (point, i) {
      //   return (
      //     DOM.circle({
      //       cx: projection([point.Lng, point.Lat])[0], 
      //       cy: projection([point.Lng, point.Lat])[1],  
      //       r: 3, 
      //       key: i,
      //       fill: "steelblue"
      //     })
      //   )
      // });

      // return DOM.svg({width: this.props.width, height: this.props.height, id:"map_svg"},
      //   DOM.path({
      //     className: 'country', 
      //     d: path(country)
      //   }),
      //   DOM.g(null, circles)
      // );

      const circles = this.state.dataJSON.map((point, i) => {
        return(
          <circle key={i} cx={projection([point.Lng, point.Lat])[0]} cy={projection([point.Lng, point.Lat])[1]} r={3} fill={'#589fe0'}></circle>
        )
      });

      return(
        <svg id='map_svg' width={this.props.width} height={this.props.height}>
          <path className='country' d={path(country)}></path>
          <g>
            {circles}
          </g>
        </svg>
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