import React from 'react';
import Utils from '../js/Utils';

class Legends extends React.Component {
  render() {
    let groupData = Utils.groupBy(this.props.data, this.props.colorCategory),
      data = Object.keys(groupData);
      
    let legendStop = data.map((d,i) => {
      let styles = {
        backgroundColor : Utils.setColorScale(d, data, this.props.colorRange)
      }
      return(
        <div className='stop'>
          <div className='stop-swatch export-rect' style={styles}></div>
          <div className='stop-label'>
            <span>{d}</span>
          </div>
        </div>
      )
    })
    return(
      <div className='protograph-legends'>
        <div className='protograph-legends-title'>Legends</div>
        <div className='stops'>{legendStop}</div>
      </div>
    )
  }
}

export default Legends;