import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/js/App.js';

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
    <App
      dataURL={this.options.data_url}
      topoURL={this.options.topo_url}
      height= {this.options.height}
      width= {this.options.width}
      mode={this.mode}
      colorCategory={this.options.colorCategory}
      filterBy={this.options.filterBy}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}