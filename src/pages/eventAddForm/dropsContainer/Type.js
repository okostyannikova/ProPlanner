import React, { Component } from 'react';
import TypeIcon from 'assets/images/type-icon.svg';

class Type extends Component {
  render() {
    const { view } = this.props;
    const viewMode = view ? 'list-item-view' : 'list-item';

    return (
      <div className={viewMode}>
        <div>
          <img src={TypeIcon} alt="TypeIcon" />
          <span className="list-item-main-text">Type</span>
        </div>
      </div>
    );
  }
}

export default Type;
