import React from 'react';

class Tooltip extends React.Component {
  render(){
    if (Object.keys(this.props.cardData).length === 0 && this.props.cardData.constructor === Object){
      return(<div></div>)
    } else {
      let tooltip_left, tooltip_top;
      if (document.getElementById("protograph-tooltip") === null) {
        console.log("if tooltip")
        tooltip_left = this.props.mouseX + 10;
        tooltip_top = this.props.mouseY + 10;
      } else {
        let tooltip_bbox = document.getElementById("protograph-tooltip").getBoundingClientRect()
        let width = document.getElementById('protograph_parent').offsetWidth,
          height = this.props.height;
        // console.log(this.props.mouseX + tooltip_bbox.width, width, tooltip_bbox.width, this.props.mouseX, "----width---")
        if ((this.props.mouseX + tooltip_bbox.width + 20) >= width){
          tooltip_left = (this.props.mouseX - tooltip_bbox.width);
          // console.log(tooltip_left, "tooltip_left")
        } else {
          tooltip_left = (this.props.mouseX + 20);
        }
        if ((this.props.mouseY + tooltip_bbox.height + 20) >= height){
          tooltip_top = (this.props.mouseY - tooltip_bbox.height);
        } else {
          tooltip_top = (this.props.mouseY + 20);
        }
        tooltip_left = Math.max(0, tooltip_left);
        tooltip_top = Math.max(0, tooltip_top);
        // console.log(tooltip_left, tooltip_top, "tooltip positions")
      }
      let styles = {
        transition: 'all 0.35s',
        display: this.isTooltipSeen,
        left: tooltip_left , 
        top: tooltip_top 
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