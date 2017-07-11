import React from 'react';

class Tooltip extends React.Component {
  handleOnClick(e, data) {
    console.log(data, "on click data")
    // document.getElementById('protograph-tooltip').style.display = 'none'
  }

  render(){
    if (this.props.cardData === null){
      return(<div></div>)
    } else {
      // console.log(this.props.name, "this.props.classname")
      let tooltip_left, tooltip_top, titleHeight, filtersHeight, sourceHeight;
      if (this.props.mode === 'laptop'){
        if (document.getElementById("protograph-tooltip") === null) {
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
      } else {
        titleHeight = document.getElementById('protograph_map_title') ? document.getElementById('protograph_map_title').offsetHeight : 0,
        filtersHeight = document.getElementById('protograph_filters') ? document.getElementById('protograph_filters').offsetHeight : 0,
        sourceHeight = document.getElementById('protograph_source_div')? document.getElementById('protograph_source_div').offsetHeight : 0,
        tooltip_left = 0;
        tooltip_top = this.props.height + titleHeight + filtersHeight + sourceHeight + 10;
      }
      // let styles;
      // if (this.props.mode === 'laptop'){
      let styles = {
        transition: 'all 0.35s',
        visibility: this.props.isTooltipSeen,
        left: tooltip_left, 
        top: tooltip_top 
      } 
      // } else {
      //   styles = {
      //     transition: 'all 0.35s',
      //     display: 'block',
      //     left: tooltip_left 
      //   } 
      // }
     
      return(
        <div id="protograph-tooltip" style={styles} onClick={(e) => this.handleOnClick(e, this.props.cardData)}>
          {this.props.mode === 'mobile' ? <div id="tooltip-close" className="tooltip-close-icon">X</div> : ''}
          <div className="t-sector">{this.props.cardData.date}</div>
          <div className="t-company">{this.props.cardData.title}</div>
          <hr/>
          <img className="t-image" src={this.props.cardData.image ? this.props.cardData.image : ''}/>
          <div className="t-sector">Demographics: {this.props.cardData.victim_demographics}</div>
          <div className="t-sector">{this.props.cardData.area}, {this.props.cardData.state}</div>
          <hr/>
          <div className="t-sector">{this.props.cardData.what_happened}</div>
        </div>
      )
    }
  }
}

export default Tooltip;


  // <div className="ratings top-row">
  //           <div className="label">Elements</div>
  //           <div className="value"> 2015 </div>
  //           <div className="value"> 2016 </div>
  //         </div>
  //         <div className="ratings">
  //           <div className="label"> Non Discrimination</div>
  //           <div className="value"> 0.2 </div>
  //           <div className="value">0.5</div>
  //         </div>
  //         <div className="ratings">
  //           <div className="label"> Non Discrimination</div>
  //           <div className="value"> 0.2 </div>
  //           <div className="value">0.5</div>
  //         </div>