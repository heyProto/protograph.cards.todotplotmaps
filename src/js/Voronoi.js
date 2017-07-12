import React from 'react';
import ReactDOM from 'react-dom';
import {voronoi as d3Voronoi} from 'd3-voronoi';
import Tooltip from '../js/Tooltip';

class Voronoi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: {}
    }
  }

  componentDidUpdate() {
    ReactDOM.render(<Tooltip cardData={this.state.tooltipData} height={this.props.height} mode={this.props.mode} name={this.state.name}/>, document.getElementById('renderTooltip'))
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
      tooltipData: nearestCardData
    })
    this.highlightCircle(name)
  }

  handleMouseOut(e) {
    e.preventDefault();
    // this.setState({
    //   visibility: 'visible',
    //   display: 'none'
    // })
    // this.highlightCircle(name)
    // let allPath = document.querySelectorAll('.voronoiWrapper path')
    // for (let i=0; i<allPath.length; i++){
    //   allPath[i].style.pointerEvents = 'all'
    // }
  }

  handleOnClick(e, card, name) {
    console.log(e.type, "card data on click")
    document.getElementById('t-pin').style.display = 'block'
    let allPath = document.querySelectorAll('.voronoiWrapper path');
    for (let i=0; i<allPath.length; i++){
      allPath[i].style.pointerEvents = 'none'
    }
    this.setState({
      tooltipData: card
    })
  }

  highlightCircle(name) {
    let getCircles = document.getElementsByClassName(`circle-${name}`),
      allCircles = document.getElementsByClassName('map-circles');

    // remove highlight of previous circle
    for (let j=0; j<allCircles.length; j++){
      allCircles[j].style.stroke = 'none';
    }

    for (let i=0; i<getCircles.length; i++){
      getCircles[i].style.stroke = '#D80202';
      getCircles[i].style.strokeWidth = '3.5px';    
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
          className={`voronoi ${d.data.state}-${d.data.area}`}
          onClick={(e) => this.handleOnClick(e, d.data, name)}
          onMouseMove={(e) => this.handleMouseOver(e, d.data, voronoi, name)}
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

// 
