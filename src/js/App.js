import React from 'react';
import axios from 'axios';
import Maps from '../js/Map.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: {},
      filteredData: {},
      topoJSON: {},
      groupedData: undefined  
    }
  }

  componentDidMount() {
    axios.all([axios.get(this.props.dataURL), axios.get(this.props.topoURL)])
      .then(axios.spread((card, topo) => {
        this.setState({
          dataJSON: card.data,
          filteredData: card.data,
          topoJSON: topo.data         
        });
      })); 
  }
  
  generateFilters(data) {
    let groupData = this.groupBy(this.state.dataJSON, this.props.filterBy)
    this.state.groupedData = groupData 
    return groupData;
  }

  handleClick(key, group) {
    this.setState({
      filteredData: group[key]
    })
  }

  renderLaptop() {
    if (Object.keys(this.state.dataJSON).length === 0 && this.state.dataJSON.constructor === Object) {
      return(<div>Loading</div>)
    } else { 
      let group = this.generateFilters();
      let keys = Object.keys(group);
      let tabs = keys.map((key, i) => {
        return (
          <div className="tab" onClick={(e) => this.handleClick(key, group)}>
            <input type="radio" name="css-tabs" id={`tab-${i}`} className="tab-switch"/>
            <label for={`tab-${i}`} className="tab-label">{key}</label>
          </div>
        ) 
      })

      let styles = {
        width: '100%',
        height: 'auto'
      } 

      return(
        <div id="protograph_parent" style={styles}>        
          <h1 className='protograph_map_title'>Cow related violence by state</h1>
          <div className="tabs"> {tabs} </div>
          <Maps dataJSON={this.state.filteredData} topoJSON={this.state.topoJSON} colorCategory={this.props.colorCategory} width={this.props.width} height={this.props.height}/> 
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