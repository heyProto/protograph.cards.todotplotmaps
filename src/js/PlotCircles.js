import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from '../js/Tooltip';

class PlotCircles extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: {},
      display: 'none'
    }
  }

  componentDidUpdate() {
    ReactDOM.render(<Tooltip cardData={this.state.tooltipData} mouseX={this.state.mouseX} mouseY={this.state.mouseY} isTooltipSeen={this.state.display} height={this.props.height}/>, document.getElementById('renderTooltip'))
  }

  handleMouseOver(e, card) {
    this.setState({
      tooltipData: card,
      display: 'block',
      mouseX: e.pageX,
      mouseY: e.pageY
    })
  }

  handleMouseOut() {
    this.setState({
      display: 'none'
    })
  }

  setColor(card) {
    switch(card[this.props.colorCategory]){
      case 'Poverty Reduction':
        return '#f44336';
      case 'Disaster Risk Reduction':
        return '#4CAF50';
      case 'Democratic Governance':
        return '#2196F3';
      case 'Energy & Environment':
        return '#FFC400'
    }
  }

  render() {
    let color;
    const circles = this.props.dataJSON.map((point, i) => {
      if (this.props.colorCategory) {
        color = this.setColor(point)
      } else {
        color = '#589fe0'
      }
      return(
        <circle id="map_circles"
          key={i} 
          cx={this.props.projection([point.Lng, point.Lat])[0]} 
          cy={this.props.projection([point.Lng, point.Lat])[1]} 
          r={3} 
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
