import React from 'react';

class Tooltip extends React.Component {
  handleOnClick() {
    console.log("pushpin");
    document.getElementById('t-pin') ? document.getElementById('t-pin').style.display = 'none': ''
    this.props.handleCircleClicked(false);
  }

  render(){
    if (this.props.cardData === null){
      return(<div></div>)
    } else {
      let tooltip_right, tooltip_left, tooltip_top, titleHeight, filtersHeight, sourceHeight;
      titleHeight = document.getElementById('protograph_map_title') ? document.getElementById('protograph_map_title').offsetHeight : 66;
      filtersHeight = document.getElementById('protograph_filters') ? document.getElementById('protograph_filters').offsetHeight : 40;
      sourceHeight = document.getElementById('protograph_source_div')? document.getElementById('protograph_source_div').offsetHeight : 0;
      if (this.props.mode === 'laptop'){
        tooltip_right = 374;
        // tooltip_right = 7;
        tooltip_top = titleHeight + filtersHeight + 10;
      } else {
        tooltip_right = 0;
        tooltip_top = this.props.height + titleHeight + filtersHeight + sourceHeight + 10;
      }
      let styles = {
        transition: 'all 0.35s',
        display: 'block',
        left: tooltip_right,
        // right: tooltip_right,
        top: tooltip_top
      }

      return(
        <div id="protograph-tooltip" style={styles}>
          {this.props.mode === 'laptop' ? <span id="t-pin" className="t-pushpin" onClick={(e) => this.handleOnClick(e)}>x</span> : ''}
          <div className="t-date">{this.props.cardData.date}</div>
          <div className="t-title">{this.props.cardData.title}</div>
          <div className="t-location">{this.props.cardData.area}, {this.props.cardData.state} ({this.props.cardData.state_ruling_party} ruled)</div>
          {this.props.cardData.image ? <img className="t-image" src={this.props.cardData.image}/> : ''}
          <hr/>
          <div className="t-header">What were the victims doing?</div>
          <div className="t-p">
            {this.props.cardData.victim_religion} {this.props.cardData.victim_gender} {this.props.cardData.victim_tag} {this.props.cardData.victiom_action} 
          </div>
          {this.props.cardData.victim_names !== '' ? <div><div className="t-p t-padup">Names of the victims - {this.props.cardData.victim_names}</div></div> : ''}
          <hr/>
          <div className="t-header">What was the mob doing?</div>
          <div className="t-p">
            {this.props.cardData.accused_religion} {this.props.cardData.accused_gender} {this.props.cardData.accused_tag} {this.props.cardData.accused_action} 
          </div>
          {this.props.cardData.accused_names !== '' ? <div><div className="t-p t-padup">Names of the accused - {this.props.cardData.accused_names}</div></div> : ''}
          <hr/>
          <div className="t-header">Was it illegal?</div>
          <div className="t-p">
          The mob broke the law. 
          {this.props.cardData.does_the_state_criminalise_victims_actions === 'No' ? '' : <span> The victims actions were also possibly illegal because {this.props.cardData.which_law}</span>
          }
          </div>
          <hr/>
          <div className="t-header">what happened?</div>
          <div className="t-p">{this.props.cardData.the_lynching}</div>
          <div className="t-p t-padup">{this.props.cardData.count_injured} victims were injured and {this.props.cardData.count_dead} victims were left dead.
          </div>
          <hr/>
          <div className="t-header">further reading</div>
          <div className="t-p t-padup"><a id="t-further-reading" href="{this.props.cardData.url}">{this.props.cardData.url}</a></div>
        </div>
      )
    }
  }
}

export default Tooltip;
