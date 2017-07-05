import React from 'react';

class Search extends React.Component {
  handleKeyup(e){
    console.log(e,"on key up")
  }

  render() {
    let dropdownOptions = this.props.data.map((key, i) => {
      // console.log(key, "key")
      return(
        <div className="skills-option" value={key.State}>{key.State}</div>
      )
    })
    return(
      <div className="searchable-filter-div">
        <div className="filter-title">Search State</div>
        <input type="text" id="skill_search" className="filter-search" placeholder="Search" onKeyUp={(e) => this.handleKeyup(e)}/>
        <div className="skills-options">{dropdownOptions}</div>
      </div> 
    )
  }
}

export default Search;


// $("#skill_search").on("keyup", function () {
//   var value = $(this).val().toLowerCase();
//   $(".skills-option").map(function (i, d) {
//     if (d.getAttribute("value").toLowerCase().indexOf(value) === -1) {
//       d.style.display = "none";
//     } else {
//       d.style.display = "block";
//     }
//   });
// });