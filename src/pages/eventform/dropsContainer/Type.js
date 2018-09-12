import React, { Component } from 'react';
import TypeIcon from 'assets/images/SvgJs/TypeIcon.js';

class Type extends Component {
  render() {
    return (
      <div className="list-item">
        <div>
          <TypeIcon />
          <span className="list-item-main-text">Type</span>
        </div>
      </div>
    );
  }
}

export default Type;
