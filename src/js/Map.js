import React from 'react';
import * as topojson from 'topojson-client';
import {geoPath, geoCentroid, geoMercator} from 'd3-geo';
import PlotCircles from '../js/PlotCircles';
// import Voronoi from '../js/Voronoi';

class MapsCard extends React.Component {
  render(){
    let offsetWidth = document.getElementById('protograph_parent').offsetWidth - 20,
      actualHeight = this.props.height - 92;

    let ch = this.props.topoJSON,
      country = topojson.feature(ch, ch.objects),
      center = geoCentroid(topojson.feature(ch, ch.objects)),
      scale = 700,
      projection = geoMercator().center(center)
        .scale(scale)
        .translate([offsetWidth / 2, actualHeight / 2]),
      path = geoPath()
        .projection(projection);

    let bounds  = path.bounds(country),
      hscale = scale*offsetWidth  / (bounds[1][0] - bounds[0][0]),
      vscale = scale*actualHeight / (bounds[1][1] - bounds[0][1]);
    scale = (hscale < vscale) ? hscale : vscale;
    let offset = [offsetWidth - (bounds[0][0] + bounds[1][0])/2, actualHeight - (bounds[0][1] + bounds[1][1])/2];

    projection = geoMercator().center(center)
      .scale(scale)
      .translate(offset);
    path = path.projection(projection);

    console.log(country, "country")

    return(
      <svg id='map_svg' viewBox={`0, 0, ${offsetWidth}, ${actualHeight}`} width={offsetWidth} height={actualHeight}>
        <path className='country' d={path(country)}></path>
        <PlotCircles dataJSON={this.props.dataJSON} projection={projection} colorCategory={this.props.colorCategory} height={actualHeight} width={offsetWidth} mode={this.props.mode}/>
      </svg>
    )
  }
}

export default MapsCard

// <Voronoi data={this.props.dataJSON} projection={projection} width={offsetWidth} height={actualHeight}/>