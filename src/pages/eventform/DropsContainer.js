import React, { Component } from 'react';
import { Field } from 'redux-form';
// import Notification from './dropsContainer/Notification.js';
// import Location from './dropsContainer/Location.js';
import Priority from 'components/PriorityComponent/Priority';
import Type from 'components/TypeComponent/Type';
import MainButton from './dropsContainer/MainButton.js';
import SecondaryButton from './dropsContainer/SecondaryButton.js';

// Выровнять иконки по центру текста

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
      event,
      match,
      history,
      reset,
      valid,
      deleteEvent,
      eventsListId,
    } = this.props;

    let mainButtonLink = '';
    if (view) {
      mainButtonLink = `${match.url}/edit`;
    } else if (isEditPath) {
      mainButtonLink = `/event/${match.params.id}`;
    } else {
      mainButtonLink = '/events';
    }

    const secondaryButtonLink = view || isAddPath ? '/events' : `/event/${match.params.id}`;

    const priority = event ? event.priority : '1';
    const eventType = event ? event['event-type'] : '1';

    return (
      <div>
        <ul className="drops-list">
          <li>
            <Field name="priority" component={Priority} view={view} priority={priority} />
          </li>
          {/* <li>
            <Notification view={view} />
          </li>
          <li>
            <Location view={view} />
          </li> */}
          <li>
            <Field name="type" component={Type} view={view} type={eventType} />
          </li>
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
          id={eventsListId}
          deleteHandle={deleteEvent}
        />
      </div>
    );
  }
}

export default DropsContainer;
