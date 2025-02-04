import React from 'react';
import axios from 'axios';
import Maps from '../js/Map.js';
// import DataSource from '../js/DataSource.js';
import Legends from '../js/Legends.js';
import Tooltip from '../js/Tooltip';
import Util from '../js/Utils';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: {},
      filteredData: {},
      topoJSON: {},
      clicked: false,
      circleClicked: false,
      circleHover: false,
      groupedData: undefined  
    }
    this.handleCircleClicked = this.handleCircleClicked.bind(this);
  }

  componentDidMount() {
    const {dataURL, topoURL} = this.props;
    axios.all([axios.get(dataURL), axios.get(topoURL)])
      .then(axios.spread((card, topo) => {
        this.setState({
          dataJSON: card.data,
          topoJSON: topo.data         
        });
        this.highlightCircleName();
      })); 
  }

  highlightCircleName() {
    this.state.onLoadTooltipData = this.state.filteredData[0]
    let name = `${this.state.filteredData[0].state}-${this.state.filteredData[0].area}`
    Util.highlightCircle(name)
  }

  exportData() {
    return document.getElementById('main-div').getBoundingClientRect();
  }

  generateFilters() {
    let groupData = Util.groupBy(this.state.dataJSON, this.props.chartOptions.filterBy)
    this.state.groupedData = groupData 
    return groupData;
  }

  handleClick(e, key, group) {
    this.setState({
      filteredData: group[key],
      clicked: true
    })
    this.highlightCircleName();
    let elm = document.getElementsByClassName('tab-label active_tab'),
      inactiveClass = "tab-label",
      activeClass = "tab-label active_tab";
    let i = 0;
    while (i < elm.length) {
      i++;
      elm[0].className = inactiveClass;
    }
    let selectTab = document.getElementById(key),
      selectLabel = selectTab.querySelector('label');
    selectLabel.className = activeClass;
  }

  handleCircleClicked(bool) {
    this.setState({
      circleClicked: bool
    })
  }

  renderLaptop() {
    let tabs;
    if (Object.keys(this.state.dataJSON).length === 0 && this.state.dataJSON.constructor === Object) {
      return(<div>Loading</div>)
    } else { 
      if (this.props.chartOptions.filterBy !== undefined) {
        let group = this.generateFilters(),
          keys = Object.keys(group),
          values = Object.values(group);
        if (this.state.clicked === false) {
          this.state.filteredData =  group[keys[0]];
        }
        tabs = keys.map((key, i) => { 
          let length = values[i].length;
          let active = (i===0) ? ' active_tab' : ''; //onload show the first tab active  
          return (
            <div key={key} id={key} className="single-tab" onClick={(e) => this.handleClick(e, key, group)}>
              <input type="radio" id={`tab-${key}`} className="tab-switch"/>
              <label htmlFor={`tab-${key}`} className={`tab-label${active}`}>{key} ({length})</label>
            </div>
          ) 
        })
      } else {
        this.state.filteredData = this.state.dataJSON
      }

      let styles = this.props.mode === 'laptop' ? {width: 639}: {width: this.props.dimensionWidth}
    
      const {chartTitle, colorCategory, filterBy} = this.props.chartOptions;
      return(
        <div id="main-div" style={styles}>
          <div id="renderTooltip">
            <Tooltip cardData={this.state.filteredData[0]} height={this.props.chartOptions.height} mode={this.props.mode} circleClicked={this.state.circleClicked} handleCircleClicked={this.handleCircleClicked}/>
          </div> 
          <div id="protograph_parent">        
            <h1 id='protograph_map_title'>{chartTitle}</h1>
            {filterBy !== undefined ? <div id="protograph_filters" className="pg-tabs"> {tabs} </div> : ''}
            {colorCategory !== undefined ? <Legends data={this.state.filteredData} chartOptions={this.props.chartOptions} /> : ''}
            <Maps dataJSON={this.state.filteredData} topoJSON={this.state.topoJSON} chartOptions={this.props.chartOptions} mode={this.props.mode} onLoadTooltipData={this.state.filteredData[0]} circleClicked={this.state.circleClicked} handleCircleClicked={this.handleCircleClicked} circleHover={this.state.circleHover}/>
          </div>
       </div>
        
      )
    }   
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
      case 'mobile' :
        return this.renderLaptop();
    }
  }
}

export default App;

// <DataSource id="protograph_source_div"/>
// {this.props.mode === 'mobile' ? <Search data={this.state.filteredData}/> : ''}