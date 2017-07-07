import React from 'react';
import {scaleOrdinal as d3ScaleOrdinal} from 'd3-scale';

class PlotCircles extends React.Component { 
  groupBy(data, column) {
    let grouped_data = {};
    switch(typeof column) {
      case "string":
        data.forEach(datum => {
          if(grouped_data[datum[column]]) {
            grouped_data[datum[column]].push(datum);
          } else {
            grouped_data[datum[column]] = [datum];
          }
        });
        break;
      case "function":
        data.forEach(datum => {
          let key = column(datum);
          if(grouped_data[key]) {
            grouped_data[key].push(datum);
          } else {
            grouped_data[key] = [datum];
          }
        });
        break;
    }
    return grouped_data;
  }

  setColor(card) {
    let groupCat = this.groupBy(this.props.dataJSON, this.props.colorCategory),
      colorDomain = Object.keys(groupCat),
      colorScale = d3ScaleOrdinal()
        .domain(colorDomain)
        .range(this.props.colorRange);

    return colorScale(card);
  }

  render() {
    let color;
    this.setColor();
    const circles = this.props.dataJSON.map((point, i) => {
      return(
        <circle id="map_circles"
          className={`circle ${i}`}
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
