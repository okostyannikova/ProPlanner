import React, { Component } from 'react';
import TypeIcon from 'assets/images/type-icon.svg';

class Type extends Component {
  render() {
    return (
      <div className="list-item">
        <div>
          <img src={TypeIcon} alt="TypeIcon" />
          <span className="list-item-main-text">Type</span>
        </div>
      </div>
    );
  }
}

export default Type;
