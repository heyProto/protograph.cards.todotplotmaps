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

  handleMouseOver(e, card) {
    console.log("hoverrr", card)
    this.setState({
      tooltipData: card,
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
    // const points = this.props.data.map((point, i) => {
    //   return {
    //     x: this.props.projection([point.Lng, point.Lat])[0],
    //     y: this.props.projection([point.Lng, point.Lat])[1]
    //   }
    // })
    // console.log(points, "points")
    let projection = this.props.projection
    let voronoi = d3Voronoi()
      .x(function (d){
        // console.log(d, "d")
        return projection([d.Lng, d.Lat])[0]
      })
      .y(function (d){
        return projection([d.Lng, d.Lat])[1]
      })
      .extent([[0, 0], [this.props.width, this.props.height]])
    
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
      // console.log(d, "d")
      return(
        <path style={styles}
          d={`M ${d.join("L")} Z`}
          className={`voronoi ${i}`}
          onMouseOver={(e) => this.handleMouseOver(e, d.data)}
          onMouseOut={(e) => this.handleMouseOut(e, d.data)}
          onTouchStart={(e) => this.handleMouseOver(e, d.data)}
          >
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