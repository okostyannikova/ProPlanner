import React, { Component } from 'react';
import './eventAddForm/styles.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import TextComponent from './eventAddForm/TextComponent';
import Time from './eventAddForm/Time';
import Tasks from './eventAddForm/Tasks';
import DropsContainer from './eventAddForm/DropsContainer.js';
import { eventsOperations } from '../modules/Events';

class EventAddForm extends Component {
  state = {
    event: null,
  };

  componentWillUnmount = () => {
    const { removeSingleEvent } = this.props;
    removeSingleEvent();
  };

  render() {
    const { handleSubmit, reset, history, addEvent } = this.props;

    const submit = values => {
      addEvent(values);
      history.push('/events');
    };

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <div className="main-container">
            <ul className="component-list">
              <li>
                <Field
                  name="title"
                  component={TextComponent}
                  value="Add a title..."
                  headerClass="title-component"
                  headerContent="Title"
                  placeholder="Add a title..."
                />
              </li>
              <li>
                <Time />
              </li>
              <li>
                <Field
                  name="description"
                  component={TextComponent}
                  value="add a detailed description..."
                  headerClass="description-component"
                  headerContent="Description"
                  placeholder="add a detailed description..."
                  multiline
                />
              </li>
              <li>
                <Tasks />
              </li>
            </ul>
          </div>
          <div className="drops-container-add">
            <DropsContainer reset={reset} {...this.props} />
          </div>
        </form>
      </div>
    );
  }
}

export default (EventAddForm = compose(
  connect(
    null,
    {
      addEvent: eventsOperations.addEvent,
      removeSingleEvent: eventsOperations.deleteSingleEvent,
    }
  ),
  reduxForm({
    form: 'addEvent',
    // enableReinitialize: true,
  })
)(EventAddForm));
