import React from 'react';
import {voronoi as d3Voronoi} from 'd3-voronoi';

class Voronoi extends React.Component {
  render() {
    let voronoi = d3Voronoi()
      .extent([[0, 0], [this.props.width, this.props.height]]);

    let voronoiData = voronoi(this.props.data)
    let voronoiPaths = voronoiData.map((d, i) => {
      return(
        <path 
          d={`M ${d.join("L")} Z`}
          className={`voronoi ${i}`}>
        </path>
      )
    })   
    return(
      <g className="voronoiWrapper">{voronoiPaths}</g>
    )
  }
}

export default Voronoi;