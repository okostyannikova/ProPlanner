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
    const { event, history, reset } = this.props;
    const mainButtonLink = `/events`;
    const secondaryButtonLink = `/events`;

    const priority = event ? event.priority : '1';
    const eventType = event ? event['event-type'] : '1';

    return (
      <div>
        <ul className="drops-list">
          <li>
            <Field name="priority" component={Priority} priority={priority} />
          </li>
          {/* <li>
            <Notification />
          </li>
          <li>
            <Location />
          </li> */}
          <li>
            <Field name="type" component={Type} type={eventType} />
          </li>
        </ul>
        <MainButton history={history} link={mainButtonLink} />
        <SecondaryButton history={history} reset={reset} link={secondaryButtonLink} />
      </div>
    );
  }
}

export default DropsContainer;
