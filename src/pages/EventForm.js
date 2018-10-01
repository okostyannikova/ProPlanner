import React, { Component } from 'react';
import './eventform/styles.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as moment from 'moment';
import ImageDropzone from './eventform/ImageDropzone';
import TextComponent from './eventform/TextComponent';
import Time from './eventform/Time';
import Tasks from './eventform/Tasks';
import DropsContainer from './eventform/DropsContainer.js';
import { eventsOperations } from '../modules/Events';

class EventForm extends Component {
  state = {
    event: null,
  };

  componentDidMount = () => {
    const { match, loadSingleEvent } = this.props;

    loadSingleEvent(match.params.id);
  };

  componentWillUnmount = () => {
    const { removeSingleEvent } = this.props;
    removeSingleEvent();
  };

  render() {
    const path = this.props.match.path;
    const view = !(path.includes('edit') || path.includes('add'));

    const { eventsList, handleSubmit, reset, patchEvent } = this.props;

    const event = eventsList ? eventsList.attributes : '';

    const submit = values => {
      patchEvent(values);
    };

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <ImageDropzone />
          <div className="main-container">
            <ul className="component-list">
              <li>
                <Field
                  name="title"
                  component={TextComponent}
                  value={event ? event.title : 'Add a title...'}
                  view={view}
                  headerClass="title-component"
                  headerContent="Title"
                  placeholder="Add a title..."
                />
              </li>
              <li>
                <Time view={view} />
              </li>
              <li>
                <Field
                  name="description"
                  component={TextComponent}
                  value={event ? event.description : 'add a detailed description...'}
                  view={view}
                  headerClass="description-component"
                  headerContent="Description"
                  placeholder="add a detailed description..."
                  multiline
                />
              </li>
              <li>
                <Tasks view={view} />
              </li>
            </ul>
          </div>
          <div className="drops-container">
            <DropsContainer view={view} event={event} reset={reset} {...this.props} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let id = 0;
  let title = 'Add a title...';
  let description = 'add a detailed description...';
  let priority = 'high';
  let type = 'work';
  let startTime = moment().format();
  let endTime = moment().format();

  if (state.events.eventsSingleEvent) {
    id = state.events.eventsSingleEvent.id;
    title = state.events.eventsSingleEvent.attributes.title;
    description = state.events.eventsSingleEvent.attributes.description;
    priority = state.events.eventsSingleEvent.attributes.priority;
    type = state.events.eventsSingleEvent.attributes['event-type'];
    startTime = state.events.eventsSingleEvent.attributes['start-date'].format();
    endTime = state.events.eventsSingleEvent.attributes['end-date'].format();
  }

  return {
    eventsList: state.events.eventsSingleEvent,
    initialValues: {
      id,
      title,
      description,
      priority,
      type,
      startTime,
      endTime,
    },
  };
};

export default (EventForm = compose(
  connect(
    mapStateToProps,
    {
      loadSingleEvent: eventsOperations.loadSingleEvent,
      removeSingleEvent: eventsOperations.deleteSingleEvent,
      patchEvent: eventsOperations.patchEvent,
    }
  ),
  reduxForm({
    form: 'event',
    enableReinitialize: true,
  })
)(EventForm));
