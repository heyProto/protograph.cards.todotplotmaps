import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from '../js/Tooltip';

class PlotCircles extends React.Component { 
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
    console.log("hoverrr")
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

  setColor(card) {
    switch(card[this.props.colorCategory]){
      case 'Poverty Reduction':
        return '#F7630C'; //orange
      case 'Disaster Risk Reduction':
        return '#B146C2' //purple
      case 'Democratic Governance':
        return '#00AFF0'; //lue
      case 'Energy & Environment':
        return '#00CC6A'; //green
    }
  }

  render() {
    let color;
    const circles = this.props.dataJSON.map((point, i) => {
      if (this.props.colorCategory) {
        color = this.setColor(point)
      } else {
        color = '#00AFF0'
      }
      return(
        <circle id="map_circles"
          className={`circle ${i}`}
          key={i} 
          cx={this.props.projection([point.Lng, point.Lat])[0]} 
          cy={this.props.projection([point.Lng, point.Lat])[1]} 
          r={3.5} 
          fill={color}
          onMouseOver={(e) => this.handleMouseOver(e, point)}
          onMouseOut={(e) => this.handleMouseOut(e, point)}>
        </circle>
      )
    });
    return(
      <g>{circles}</g>
    )
  }
}

export default PlotCircles;

// <Tooltip cardData={this.props.tooltipData} mouseX={this.props.mouseX} mouseY={this.props.mouseY} isTooltipSeen={this.props.display}/>
