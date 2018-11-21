import React, { Component } from 'react';
import './goalform/styles.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as moment from 'moment';
import TextComponent from 'components/TextComponent/TextComponent';
import SelectComponent from 'components/SelectComponent/SelectComponent';
import Time from 'components/TimePickerComponent/Time';
import { required, maxTitleLength, maxDescriptionLength } from 'utils/validate';
import { typesOptions } from 'config';
import Type from './goalform/goalTypeComponent.js';
import ImageDropzone from './goalform/ImageDropzone';
import DropsContainer from './goalform/DropsContainer.js';
import { goalsOperations } from '../modules/Goals';
import { eventsOperations } from '../modules/Events';

class GoalForm extends Component {
  componentDidMount = () => {
    const { match, loadSingleGoal } = this.props;

    !match.path.includes('add') && loadSingleGoal(match.params.id);
  };

  componentWillUnmount = () => {
    const { removeSingleGoal } = this.props;
    removeSingleGoal();
  };

  render() {
    const {
      goalsList,
      handleSubmit,
      reset,
      patchGoal,
      history,
      addGoal,
      match,
      setSearch,
      restoreData,
      loadData,
      lastPageNumber,
      search,
      events,
      defaultType,
    } = this.props;

    const path = match.path;
    const isEditPath = path.includes('edit');
    const isAddPath = path.includes('add');
    const view = !(path.includes('edit') || path.includes('add'));

    const goal = goalsList ? goalsList.attributes : '';
    const goalsListId = goalsList ? goalsList.id : '';
    const goalType = goal ? goal['goal-type'] : defaultType;

    const submit = values => {
      if (isAddPath) {
        addGoal(values);
        history.push('/goals');
        return;
      }

      patchGoal(values, goalsListId);
    };

    return (
      <div>
        <Field name="picture" component={ImageDropzone} view={view} />
        <form onSubmit={handleSubmit(submit)} className="container-fluid">
          <div className="main-container">
            <ul className="component-list">
              <li>
                <Field
                  name="title"
                  component={TextComponent}
                  value={goal ? goal.title : 'Add a title...'}
                  view={view}
                  headerClass="title-component"
                  headerContent="Title"
                  placeholder="Add a title..."
                  validate={[required, maxTitleLength]}
                  isaddpath={isAddPath.toString()}
                  autoFocus
                />
              </li>
              <li>
                <Time view={view} />
              </li>
              <li>
                <Field name="type" component={Type} view={view} type={goalType} />
              </li>
              <li>
                <Field
                  name="select"
                  component={SelectComponent}
                  headerClass="events-component"
                  headerContent="Events"
                  isMulti
                  placeholder="add events..."
                  options={events}
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
                  value={goal ? goal.description : 'add a detailed description...'}
                  view={view}
                  headerClass="description-component"
                  headerContent="Description"
                  placeholder="add a detailed description..."
                  multiline
                  validate={[maxDescriptionLength]}
                />
              </li>
            </ul>
          </div>
          <div className="drops-container">
            <DropsContainer
              view={view}
              isEditPath={isEditPath}
              isAddPath={isAddPath}
              goal={goal}
              reset={reset}
              goalsListId={goalsListId}
              {...this.props}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth.user;
  const typesList = Object.keys(typesOptions);

  let id = 0;
  let title = '';
  let description = '';
  let type = user.default_events_type || 'work';
  let startTime = moment().format();
  let endTime = moment()
    .add(30, 'minutes')
    .format();
  let specific = '';
  let measurable = '';
  let achievable = '';
  let relevant = '';
  let timeFramed = '';
  let select = [];
  let picture = '';

  if (state.goals.goalsSingleGoal) {
    id = state.goals.goalsSingleGoal.id;
    title = state.goals.goalsSingleGoal.attributes.title;
    description = state.goals.goalsSingleGoal.attributes.description;
    type = state.goals.goalsSingleGoal.attributes['goal-type'];
    startTime = state.goals.goalsSingleGoal.attributes['start-date'].format();
    endTime = state.goals.goalsSingleGoal.attributes['end-date'].format();
    specific = state.goals.goalsSingleGoal.attributes.s;
    measurable = state.goals.goalsSingleGoal.attributes.m;
    achievable = state.goals.goalsSingleGoal.attributes.a;
    relevant = state.goals.goalsSingleGoal.attributes.r;
    timeFramed = state.goals.goalsSingleGoal.attributes.t;
    select = state.goals.goalsSingleGoal.events;
    picture = state.goals.goalsSingleGoal.attributes.picture;
  }

  return {
    goalsList: state.goals.goalsSingleGoal,
    events: state.events.eventsList,
    search: state.events.search,
    lastPageNumber: state.events.lastPageNumber,
    initialValues: {
      id,
      title,
      description,
      type,
      startTime,
      endTime,
      specific,
      measurable,
      achievable,
      relevant,
      timeFramed,
      select,
      picture,
    },
    defaultType:
      user.default_events_type !== null ? typesList.indexOf(user.default_events_type) : 0,
  };
};

export default (GoalForm = compose(
  connect(
    mapStateToProps,
    {
      loadSingleGoal: goalsOperations.loadSingleGoal,
      removeSingleGoal: goalsOperations.deleteSingleGoal,
      patchGoal: goalsOperations.patchGoal,
      addGoal: goalsOperations.addGoal,
      deleteGoal: goalsOperations.deleteGoal,
      loadData: eventsOperations.loadEvents,
      restoreData: eventsOperations.restoreEvents,
      setSearch: eventsOperations.setSearch,
    }
  ),
  reduxForm({
    form: 'goal',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
)(GoalForm));
