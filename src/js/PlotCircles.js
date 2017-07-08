import React from 'react';
import Util from '../js/Utils';

class PlotCircles extends React.Component { 
  setColor(card) {
    let groupCat = Util.groupBy(this.props.dataJSON, this.props.colorCategory),
      colorDomain = Object.keys(groupCat);
    let color = Util.setColorScale(card, colorDomain, this.props.colorRange)
    
    return color;
  }

  render() {
    const circles = this.props.dataJSON.map((point, i) => {
      return(
        <circle id="map_circles"
          className={`map-circles circle-${point.State}-${point.District}`}
          key={i} 
          cx={this.props.projection([point.Lng, point.Lat])[0]} 
          cy={this.props.projection([point.Lng, point.Lat])[1]} 
          r={3.5} 
          fill={this.setColor(point[this.props.colorCategory])}>
        </circle>
      )
    });
    return(
      <g>{circles}</g>
    )
  }
}

export default PlotCircles;
