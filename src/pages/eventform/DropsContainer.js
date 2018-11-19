import React, { Component } from 'react';
import { Field } from 'redux-form';
import { typesOptions, priorityOptions } from 'config';
import Priority from 'components/PriorityComponent/Priority';
import Type from 'components/TypeComponent/Type';
import { connect } from 'react-redux';
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
      event,
      match,
      history,
      reset,
      valid,
      deleteEvent,
      eventsListId,
      defaultPriority,
      defaultType,
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

    const priority = event ? event.priority : defaultPriority;
    const eventType = event ? event['event-type'] : defaultType;

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

export default connect(state => {
  const { user } = state.auth.user;
  const typesList = Object.keys(typesOptions);
  const priorityList = Object.keys(priorityOptions);
  return {
    defaultPriority: priorityList.indexOf(user.default_events_priority),
    defaultType: typesList.indexOf(user.default_events_type),
  };
})(DropsContainer);
