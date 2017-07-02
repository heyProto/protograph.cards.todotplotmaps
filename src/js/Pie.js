import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryPie } from 'victory';
// import axios from 'axios';

class PieChart extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     dataJSON: undefined
  //   }
  // }

  // componentDidMount() {
  //  axios.get('pie.json')
  //   .then(card => {
  //     console.log(card.data, "data----")
  //     this.setState({
  //       dataJSON: card.data       
  //     }); 
  //   });
  // }

  render() {
    // console.log(this.state.dataJSON, "inside render")
    // if (this.state.dataJSON === undefined) {
    //   return (<div>Loading</div>)
    // } else {
      return (
        <VictoryPie 
          data={[
            {"month": "Sep", "profit": 35000},
            {"month": "Oct", "profit": 42000},
            {"month": "Nov", "profit": 55000},
            {"month": "Dec", "profit": 25000}
          ]}
          colorScale="red"
          x="month"
          y="profit"/>
      );
    // }
  }
}

render(<PieChart />, document.getElementById('root'));