import React from 'react';

console.log("PlotCircles")

class PlotCircles extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      tooltipData: {}
    }
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e, card) {
    this.setState({
      tooltipData: card,
      mouseX: e.pageX,
      mouseY: e.pageY,
      display: 'block'
    })
  }

  handleMouseOut() {
    this.setState({
      display: 'none'
    })
  }

  setColor(card) {
    switch(card[this.props.colorCat]){
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
    console.log(this.props.dataJSON, "this.props.dataJSON")
    const circles = this.props.dataJSON.map((point, i) => {
      if (this.props.colorCat) {
        color = this.setColor(point)
      } else {
        color = '#589fe0'
      }
      return(
        <circle 
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
