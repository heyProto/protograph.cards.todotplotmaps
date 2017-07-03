import React from 'react';

class FilterTab extends React.Component {
  render() {
    console.log("hey", this.props.data)
    let tabs = Object.keys(this.props.data).map(function (key, i){ 
      return (
        <div className="tab">
          <input type="radio" name="css-tabs" id={`tab-${i}`} className="tab-switch"/>
          <label for={`tab-${i}`} className="tab-label">{key}</label>
        </div>
      )
    })
    return(
      <div className="tabs"> {tabs} </div>
    )
  }
}

export default FilterTab;


 // <div className="tab">
 //            <input type="radio" name="css-tabs" id="tab-1" checked className="tab-switch"/>
 //            <label for="tab-1" className="tab-label">Tab One</label>
 //          </div>
 //          <div className="tab">
 //            <input type="radio" name="css-tabs" id="tab-2" className="tab-switch"/>
 //            <label for="tab-2" className="tab-label">Tab Two</label>
 //          </div>
 //          <div className="tab">
 //            <input type="radio" name="css-tabs" id="tab-3" className="tab-switch"/>
 //            <label for="tab-3" className="tab-label">Tab Three</label>
 //          </div>