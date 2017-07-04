import React from 'react';
import * as topojson from 'topojson-client';
import {geoPath, geoCentroid, geoMercator} from 'd3-geo';
import PlotCircles from '../js/PlotCircles';

class MapsCard extends React.Component {
  render(){
    let ch = this.props.topoJSON,
      country = topojson.feature(ch, ch.objects),
      center = geoCentroid(topojson.feature(ch, ch.objects)),
      projection = geoMercator().center(center)
        .scale(700)
        .translate([this.props.width / 2, this.props.height / 2]),
      path = geoPath()
        .projection(projection);

    return(
      <svg id='map_svg' width={this.props.width} height={this.props.height - 51}>
        <path className='country' d={path(country)}></path>
        <PlotCircles dataJSON={this.props.dataJSON} projection={projection} colorCategory={this.props.colorCategory}/>
      </svg>
    )
  }
}

export default MapsCard