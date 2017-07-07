import React from 'react';
import * as topojson from 'topojson-client';
import {geoPath, geoCentroid, geoMercator} from 'd3-geo';
import PlotCircles from '../js/PlotCircles';
import Voronoi from '../js/Voronoi';

class MapsCard extends React.Component {
  render(){
    let padding = this.props.mode === 'mobile' ? 20 : 0,
      offsetWidth = document.getElementById('protograph_parent').offsetWidth - padding,
      actualHeight = this.props.height

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

    // console.log(country, "country")

    let regions = country.features.map((d,i) => {
      return(
        <g className="region">
          <path className="geo-region" d={path(d)}></path>
        </g>
      )
    })

    let outlines = country.features.map((d,i) => {
      return(
        <path className="geo region-outline" d={path(d)}></path>
      )
    })

    let styles ={
      strokeWidth: 0.675
    }

    return(
      <svg id='map_svg' viewBox={`0, 0, ${offsetWidth}, ${actualHeight}`} width={offsetWidth} height={actualHeight}>
        <g id="regions-grp" className="regions">{regions}</g>
        <path className='geo borders' d={path(country)}></path>
        <g className="outlines" style={styles}>{outlines}</g>
        <PlotCircles dataJSON={this.props.dataJSON} projection={projection} colorCategory={this.props.colorCategory} colorRange={this.props.colorRange} height={actualHeight} width={offsetWidth} />
        <Voronoi data={this.props.dataJSON} projection={projection} width={offsetWidth} height={actualHeight} mode={this.props.mode} />
      </svg>
    )
  }
}

export default MapsCard
