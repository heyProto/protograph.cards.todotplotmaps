// import Pie from './src/js/Pie.js';

import React from 'react';
import ReactDOM from 'react-dom';
import Maps from './src/js/Map.js';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};

ProtoGraph.Card.toMaps = function () {
  this.cardType = 'Map';
}

ProtoGraph.Card.toMaps.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toMaps.prototype.renderLaptop = function () {
  this.mode = 'laptop';
  ReactDOM.render(
    <Maps
      dataURL={this.options.data_url}
      topoURL={this.options.topo_url}
      height= {this.options.height}
      width= {this.options.width}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}