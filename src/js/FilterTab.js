import React from 'react';
import PlotCircles from '../js/PlotCircles';

class FilterTab extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      clicked: false
    }
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(data) {
    console.log("handleTabClick")
    this.setState({
      clicked: true,
      filteredData: data
    })
  }

  render() {
    let ObjValue = Object.values(this.props.data);
    let tabs = Object.keys(this.props.data).map((key, i) => {
      let data = ObjValue[i];
      return (
        <div>
          <div className="tab" onClick={(e) => this.handleClick(e, data)}>
            <input type="radio" name="css-tabs" id={`tab-${i}`} className="tab-switch"/>
            <label for={`tab-${i}`} className="tab-label">{key}</label>
          </div>
          <div>
            {this.state.clicked ? <PlotCircles dataJSON={data} projection={this.props.projection} colorCat={this.props.colorCat}/> : ''}
          </div>
        </div>
      )
    })
    return(
      <div className="tabs"> {tabs} </div>
    )
  }
}

export default FilterTab;
