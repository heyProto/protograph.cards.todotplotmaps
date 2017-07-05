import React from 'react';
import axios from 'axios';
import Maps from '../js/Map.js';
// import Search from '../js/Search.js';

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
  
  generateFilters() {
    let groupData = this.groupBy(this.state.dataJSON, this.props.filterBy)
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
        width: '100%',
        height: 'auto'
      }
      return(
        <div id="protograph_parent" style={styles}>        
          <h1 className='protograph_map_title'>Cow related violence by state</h1>
          {this.props.filterBy !== undefined ? <div className="tabs"> {tabs} </div> : ''}
          <Maps dataJSON={this.state.filteredData} topoJSON={this.state.topoJSON} colorCategory={this.props.colorCategory} width={this.props.width} height={this.props.height} mode={this.props.mode}/>
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

  groupBy(data, column) {
    let grouped_data = {};
    switch(typeof column) {
      case "string":
        data.forEach(datum => {
          if(grouped_data[datum[column]]) {
            grouped_data[datum[column]].push(datum);
          } else {
            grouped_data[datum[column]] = [datum];
          }
        });
        break;
      case "function":
        data.forEach(datum => {
          let key = column(datum);
          if(grouped_data[key]) {
            grouped_data[key].push(datum);
          } else {
            grouped_data[key] = [datum];
          }
        });
        break;
    }
    return grouped_data;
  }
}

export default App;

// {this.props.mode === 'mobile' ? <Search data={this.state.filteredData}/> : ''}