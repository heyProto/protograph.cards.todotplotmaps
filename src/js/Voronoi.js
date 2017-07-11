import React from 'react';
import ReactDOM from 'react-dom';
import {voronoi as d3Voronoi} from 'd3-voronoi';
import Tooltip from '../js/Tooltip';

class Voronoi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: {},
      display: 'visible'
    }
  }

  componentDidUpdate() {
    ReactDOM.render(<Tooltip cardData={this.state.tooltipData} mouseX={this.state.mouseX} mouseY={this.state.mouseY} isTooltipSeen={this.state.display} height={this.props.height} mode={this.props.mode} name={this.state.name}/>, document.getElementById('renderTooltip'))
  }

  handleMouseOver(e, card, voronoi, name) {
    let nearestCardData;
    if (this.props.mode === 'laptop'){
      // const radius = this.props.width/50,
      //   site = voronoi.find(e.pageX, e.pageY, 10);
      // nearestCardData = site && site.data;
      // console.log(nearestCardData,site, e.pageX, e.pageY, "nearestCardData")
      nearestCardData = card;
    } else {
      nearestCardData = card;
    }   
    this.setState({
      tooltipData: nearestCardData,
      display: 'visible',
      mouseX: e.pageX,
      mouseY: e.pageY
    })
    this.highlightCircle(name)
  }

  handleMouseOut() {
    this.setState({
      display: 'hidden'
    })
    this.highlightCircle(name)
  }

  highlightCircle(name) {
    let getCircles = document.getElementsByClassName(`circle-${name}`),
      allCircles = document.getElementsByClassName('map-circles');

    for (let j=0; j<allCircles.length; j++){
      console.log("select all circles")
      allCircles[j].style.stroke = 'none';
    }

    for (let i=0; i<getCircles.length; i++){
      if (this.state.display === 'visible'){
        console.log("if", this.state.display)
        let getFill = getCircles[i].getAttribute('fill')
        getCircles[i].style.stroke = getFill;
        getCircles[i].style.strokeWidth = '4px';
      } else {
        console.log("else", this.state.display)
        getCircles[i].style.stroke = 'none';
        // getCircles[i].style.strokeWidth = '1px';
      }     
    }
  }

  render() {
    let projection = this.props.projection
    let voronoi = d3Voronoi()
      .x(function (d){
        // console.log(d, "d")
        return projection([d.lng, d.lat])[0]
      })
      .y(function (d){
        return projection([d.lng, d.lat])[1]
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
      // console.log(i, "iiii")
      let name = `${d.data.state}-${d.data.area}`
      return(
        <path style={styles}
          d={`M ${d.join("L")} Z`}
          className={`voronoi ${d.data.State}-${d.data.District}`}
          onMouseMove={(e) => this.handleMouseOver(e, d.data, voronoi, name)}
          onMouseLeave={(e) => this.handleMouseOut(e, d.data, voronoi, name)}
          onTouchStart={(e) => this.handleMouseOver(e, d.data, voronoi, name)}
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
