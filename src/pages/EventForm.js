import React, { Component } from 'react';
import './eventform/styles.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as moment from 'moment';
import TextComponent from 'components/TextComponent/TextComponent';
import Time from 'components/TimePickerComponent/Time';
import { required, maxTitleLength, maxDescriptionLength } from 'utils/validate';
import SelectComponent from 'components/SelectComponent/SelectComponent';
import Tasks from './eventform/Tasks';
import DropsContainer from './eventform/DropsContainer.js';
import { eventsOperations } from '../modules/Events';
import { tasksOperations } from '../modules/Tasks';
import { goalsOperations } from '../modules/Goals';

class EventForm extends Component {
  state = {
    event: null,
  };

  componentDidMount = () => {
    const { match, loadSingleEvent, loadTasks } = this.props;

    !match.path.includes('add') && loadSingleEvent(match.params.id);
    !match.path.includes('add') && loadTasks(match.params.id);
  };

  componentWillUnmount = () => {
    const { removeSingleEvent, unloadTasks } = this.props;
    removeSingleEvent();
    unloadTasks();
  };

  render() {
    const {
      eventsList,
      handleSubmit,
      reset,
      patchEvent,
      history,
      addEvent,
      match,
      goals,
      restoreData,
      setSearch,
      loadData,
      lastPageNumber,
      search,
    } = this.props;

    const path = match.path;
    const isEditPath = path.includes('edit');
    const isAddPath = path.includes('add');
    const view = !(path.includes('edit') || path.includes('add'));

    const event = eventsList ? eventsList.attributes : '';
    const eventsListId = eventsList ? eventsList.id : '';

    const submit = values => {
      if (isAddPath) {
        addEvent(values);
        history.push('/events');
        return;
      }

      patchEvent(values, eventsListId);
    };

    return (
      <div>
        <form onSubmit={handleSubmit(submit)} className="container-fluid">
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
                  validate={[required, maxTitleLength]}
                  isaddpath={isAddPath.toString()}
                />
              </li>
              <li>
                <Time view={view} />
              </li>
              <li>
                <Field
                  name="select"
                  component={SelectComponent}
                  headerClass="goal-component"
                  headerContent="Goals"
                  placeholder="add goal..."
                  options={goals}
                  view={view}
                  search={setSearch}
                  restoreData={restoreData}
                  loadData={loadData}
                  lastPageNumber={lastPageNumber}
                  numberOfCards={15}
                  searchResult={search}
                />
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
                  validate={[maxDescriptionLength]}
                />
              </li>

              <li>
                <Field name="tasks" component={Tasks} view={view} />
              </li>
            </ul>
          </div>
          <div className="drops-container">
            <DropsContainer
              view={view}
              isEditPath={isEditPath}
              isAddPath={isAddPath}
              event={event}
              reset={reset}
              eventsListId={eventsListId}
              {...this.props}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let id = 0;
  let title = '';
  let description = '';
  let priority = 'normal';
  let type = 'work';
  let startTime = moment().format();
  let endTime = moment()
    .add(30, 'minutes')
    .format();
  let tasks = [];
  let select = '';

  if (state.events.eventsSingleEvent) {
    id = state.events.eventsSingleEvent.id;
    title = state.events.eventsSingleEvent.attributes.title;
    description = state.events.eventsSingleEvent.attributes.description;
    priority = state.events.eventsSingleEvent.attributes.priority;
    type = state.events.eventsSingleEvent.attributes['event-type'];
    startTime = state.events.eventsSingleEvent.attributes['start-date'].format();
    endTime = state.events.eventsSingleEvent.attributes['end-date'].format();
    tasks = state.tasks.tasksList;
    select = state.events.eventsSingleEvent.attributes['goal-id'];
  }

  return {
    eventsList: state.events.eventsSingleEvent,
    tasksList: state.tasks.tasksList,
    goals: state.goals.goalsList,
    search: state.goals.search,
    lastPageNumber: state.goals.lastPageNumber,
    initialValues: {
      id,
      title,
      description,
      priority,
      type,
      startTime,
      endTime,
      tasks,
      select,
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
      loadTasks: tasksOperations.loadTasks,
      unloadTasks: tasksOperations.unloadTasks,
      addEvent: eventsOperations.addEvent,
      deleteEvent: eventsOperations.deleteEvent,
      loadData: goalsOperations.loadGoals,
      restoreData: goalsOperations.restoreGoals,
      setSearch: goalsOperations.setSearch,
    }
  ),
  reduxForm({
    form: 'event',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(EventForm));
