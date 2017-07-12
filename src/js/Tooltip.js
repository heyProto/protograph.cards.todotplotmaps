import React from 'react';

class Tooltip extends React.Component {
  render(){
    if (this.props.cardData === null){
      return(<div></div>)
    } else {
      // console.log(this.props.name, "this.props.classname")
      let tooltip_right, tooltip_top, titleHeight, filtersHeight, sourceHeight;
      titleHeight = document.getElementById('protograph_map_title') ? document.getElementById('protograph_map_title').offsetHeight : 0;
      filtersHeight = document.getElementById('protograph_filters') ? document.getElementById('protograph_filters').offsetHeight : 0;
      sourceHeight = document.getElementById('protograph_source_div')? document.getElementById('protograph_source_div').offsetHeight : 0;
      if (this.props.mode === 'laptop'){
        tooltip_right = 7;
        tooltip_top = titleHeight + filtersHeight + 10;
      } else {
        tooltip_right = 0;
        tooltip_top = this.props.height + titleHeight + filtersHeight + sourceHeight + 10;
      }
      let styles = {
        transition: 'all 0.35s',
        display: 'block',
        right: tooltip_right,
        top: tooltip_top
      }

      return(
        <div id="protograph-tooltip" style={styles}>
          <div className="t-date">{this.props.cardData.date}</div>
          <div className="t-title">{this.props.cardData.title}</div>
          <div className="t-location">{this.props.cardData.area}, {this.props.cardData.state} ({this.props.cardData.state_ruling_party} ruled)</div>
          {this.props.cardData.image ? <img className="t-image" src={this.props.cardData.image}/> : ''}
          <hr/>
          <div className="t-header">demographics</div>
          <div className="t-p">{this.props.cardData.victim_religion} {this.props.cardData.victim_gender} <span className="t-location">({this.props.cardData.victim_tag})</span>
          </div>
          <div className="t-p">{this.props.cardData.count_injured} injured and {this.props.cardData.count_dead} dead
          </div>
          <hr/>
          <div className="t-header">Reason for vigilante attack</div>
          <div className="t-p">{this.props.cardData.sub_classification}</div>
          <hr/>
          <div className="t-header">what happened?</div>
          <div className="t-p">{this.props.cardData.what_happened}</div>
          <hr/>
          <div className="t-header">further reading</div>
          <div className="t-p"><a href="{this.props.cardData.url}">{this.props.cardData.url}</a></div>
        </div>
      )
    }
  }
}

export default Tooltip;