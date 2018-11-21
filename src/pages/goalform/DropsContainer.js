import React, { Component } from 'react';

import SmartComponent from './dropsContainer/SmartComponent.js';
import MainButton from './dropsContainer/MainButton.js';
import SecondaryButton from './dropsContainer/SecondaryButton.js';

class DropsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      view,
      isEditPath,
      isAddPath,
      match,
      history,
      reset,
      valid,
      deleteGoal,
      goalsListId,
      isDeleting,
    } = this.props;

    let mainButtonLink = '';
    if (view) {
      mainButtonLink = `${match.url}/edit`;
    } else if (isEditPath) {
      mainButtonLink = `/goal/${match.params.id}`;
    } else {
      mainButtonLink = '/goals';
    }

    const secondaryButtonLink = view || isAddPath ? '/goals' : `/goal/${match.params.id}`;

    return (
      <div>
        <ul className="drops-list">
          <SmartComponent view={view} />
        </ul>

        <MainButton
          view={view}
          history={history}
          link={mainButtonLink}
          isAddPath={isAddPath}
          valid={valid}
        />
        <SecondaryButton
          view={view}
          history={history}
          reset={reset}
          link={secondaryButtonLink}
          id={goalsListId}
          deleteHandle={deleteGoal}
          isDeleting={isDeleting}
        />
      </div>
    );
  }
}

export default DropsContainer;
