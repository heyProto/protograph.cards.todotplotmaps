import React from 'react';

class DataSource extends React.Component {
  render() {
    return (
      <div className="protograph-source">
        <div className="protograph-source-header">Source:</div>
        <div className="protograph-source-summary"> DHS. Refreshed each fiscal year</div>
        <div className="protograph-credits">Created by: ICFJ & Pykih</div>
      </div>
    )
  }
}

export default DataSource;