import React from 'react';

class Tooltip extends React.Component {
  render(){
    if (Object.keys(this.props.cardData).length === 0 && this.props.cardData.constructor === Object){
      return(<div></div>)
    } else {
      let styles = {
        display: this.props.isTooltipSeen,
        top: this.props.mouseY + 10, 
        left: this.props.mouseX + 10
      }   
      return(
        <div id="protograph-tooltip" style={styles}>
          <div className="t-company">{this.props.cardData.State}</div>
          <div className="t-sector">{this.props.cardData.District}</div>
          <div className="ratings top-row">
            <div className="label">Elements</div>
            <div className="value"> 2015 </div>
            <div className="value"> 2016 </div>
          </div>
          <div className="ratings">
            <div className="label"> Non Discrimination</div>
            <div className="value"> 0.2 </div>
            <div className="value">0.5</div>
          </div>
          <div className="ratings">
            <div className="label"> Non Discrimination</div>
            <div className="value"> 0.2 </div>
            <div className="value">0.5</div>
          </div>
        </div>
      )
    }
  }
}

export default Tooltip;