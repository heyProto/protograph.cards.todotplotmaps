import React from 'react';
import axios from 'axios';
import Maps from '../js/Map.js';
import DataSource from '../js/DataSource.js';
import Legends from '../js/Legends.js';
import Util from '../js/Utils';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: {},
      filteredData: {},
      topoJSON: {},
      clicked: false,
      groupedData: undefined  
    }
  }

  componentDidMount() {
    axios.all([axios.get(this.props.dataURL), axios.get(this.props.topoURL)])
      .then(axios.spread((card, topo) => {
        this.setState({
          dataJSON: card.data,
          topoJSON: topo.data         
        });
      })); 
  }

  exportData() {
    return document.getElementById('root').getBoundingClientRect();
  }

  generateFilters() {
    let groupData = Util.groupBy(this.state.dataJSON, this.props.filterBy)
    this.state.groupedData = groupData 
    return groupData;
  }

  handleClick(e, key, group) {
    this.setState({
      filteredData: group[key],
      clicked: true
    })
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

  renderLaptop() {
    let tabs;
    if (Object.keys(this.state.dataJSON).length === 0 && this.state.dataJSON.constructor === Object) {
      return(<div>Loading</div>)
    } else { 
      if (this.props.filterBy !== undefined) {
        let group = this.generateFilters(),
          keys = Object.keys(group);
        if (this.state.clicked === false) {
          this.state.filteredData =  group[keys[0]];
        }
        tabs = keys.map((key, i) => { 
          let active = (i===0) ? ' active_tab' : ''; //onload show the first tab active  
          return (
            <div key={key} id={key} className="tab" onClick={(e) => this.handleClick(e, key, group)}>
              <input type="radio" id={`tab-${key}`} className="tab-switch"/>
              <label htmlFor={`tab-${key}`} className={`tab-label${active}`}>{key}</label>
            </div>
          ) 
        })
      } else {
        this.state.filteredData = this.state.dataJSON
      }
     
      let styles = {
        width: '100%'
      }
      return(
        <div id="protograph_parent" style={styles}>        
          <h1 id='protograph_map_title'>{this.props.chartTitle}</h1>
          {this.props.filterBy !== undefined ? <div id="protograph_filters" className="tabs"> {tabs} </div> : ''}
          <Maps dataJSON={this.state.filteredData} topoJSON={this.state.topoJSON} colorCategory={this.props.colorCategory} colorRange={this.props.colorRange} height={this.props.height} mode={this.props.mode}/>
          <Legends data={this.state.filteredData} colorCategory={this.props.colorCategory} colorRange={this.props.colorRange}/>
          <DataSource id="protograph_source_div"/>
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

// {this.props.mode === 'mobile' ? <Search data={this.state.filteredData}/> : ''}