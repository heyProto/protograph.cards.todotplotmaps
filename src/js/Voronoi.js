import React from 'react';
import ReactDOM from 'react-dom';
import {voronoi as d3Voronoi} from 'd3-voronoi';
import Tooltip from '../js/Tooltip';

class Voronoi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: {},
      display: 'hidden'
    }
  }

  componentDidUpdate() {
    ReactDOM.render(<Tooltip cardData={this.state.tooltipData} mouseX={this.state.mouseX} mouseY={this.state.mouseY} isTooltipSeen={this.state.display} height={this.props.height} mode={this.props.mode}/>, document.getElementById('renderTooltip'))
  }

  handleMouseOver(e, card, voronoi) {
    const radius = this.props.width/10,
      site = voronoi.find(e.pageX, e.pageY, radius),
      nearestCardData = site && site.data;
    this.setState({
      tooltipData: nearestCardData,
      display: 'visible',
      mouseX: e.pageX,
      mouseY: e.pageY
    })
  }

  handleMouseOut() {
    this.setState({
      display: 'hidden'
    })
  }

  render() {
    let projection = this.props.projection
    let voronoi = d3Voronoi()
      .x(function (d){
        // console.log(d, "d")
        return projection([d.Lng, d.Lat])[0]
      })
      .y(function (d){
        return projection([d.Lng, d.Lat])[1]
      })
      .size([this.props.width, this.props.height])(this.props.data);
      // .extent([[0, 0], [this.props.width, this.props.height]])
    
    // console.log("voronoi", voronoi)
    let polygons = voronoi.polygons(this.props.data)
    // console.log(a, "polygons")
    // let voronoiData = voronoi(this.props.data)

    // console.log("voronoiData", voronoiData)
    let cleanVoronoiCells = polygons.clean(undefined)

    // console.log(cleanVoronoiCells, "cleanVoronoiCells")
    let styles = {
      fill: 'none',
      pointerEvents: 'all'
    }
   
    let voronoiPaths = cleanVoronoiCells.map((d, i) => {
      return(
        <path style={styles}
          d={`M ${d.join("L")} Z`}
          className={`voronoi ${i}`}
          onMouseMove={(e) => this.handleMouseOver(e, d.data, voronoi)}
          onMouseLeave={(e) => this.handleMouseOut(e, d.data, voronoi)}
          onTouchStart={(e) => this.handleMouseOver(e, d.data. voronoi)}>
        </path>
      )
    }) 

    return(
      <g className="voronoiWrapper">{voronoiPaths}</g>
    )
  }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

export default Voronoi;

 // <defs className="clipWrapper">{clipWrapper}</defs>
 //      <g className="circleClipWrapper">{circleClipWrapper}</g>
 //      <g className="circleWrapper">{circleWrapper}</g>