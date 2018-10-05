import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgres from './tasks/LinearProgress';
import TextComponent from './TextComponent';
import TaskList from './tasks/TaskList.js';
import TaskListNewItem from './tasks/TaskListNewItem.js';
import { tasksOperations } from '../../modules/Tasks';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      name: '',
      tasks: [],
    };

    this.focusRef = React.createRef();

    this.openHandle = this.openHandle.bind(this);
    this.closeHandle = this.closeHandle.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.addHandle = this.addHandle.bind(this);
    this.checkBoxHandle = this.checkBoxHandle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tasks.length) {
      this.setState({
        tasks: newProps.tasks.map(task => ({
          id: task.id,
          name: task.title,
          checked: task.status !== 'open',
        })),
      });
    }
  }

  openHandle() {
    this.setState({ isOpen: true });
  }

  closeHandle(e) {
    if (!e.relatedTarget || e.relatedTarget.closest('.focus-container') !== e.currentTarget) {
      this.setState({ isOpen: false });
    }
  }

  cancelHandle() {
    this.setState({ isOpen: false, name: '' });
  }

  changeHandle(e) {
    this.setState({ name: e.target.value });
  }

  addHandle() {
    const { name } = this.state;
    const { createTask, id } = this.props;

    createTask({ name, id });
    this.setState({
      tasks: [...this.state.tasks, { name: this.state.name, checked: false }],
      name: '',
    });

    this.focusRef.current.focus();
  }

  checkBoxHandle(index) {
    const tempArray = this.state.tasks;
    tempArray[index].checked = !tempArray[index].checked;

    this.setState({
      tasks: tempArray,
    });
  }

  render() {
    const { tasks, isOpen, name } = this.state;
    const { view, id, deleteTask } = this.props;

    const allTasks = this.props.tasks.length
      ? this.props.tasks.map(task => ({
          id: task.id,
          name: task.title,
          checked: task.status !== 'open',
        }))
      : [];

    const completed = (tasks.filter(task => task.checked).length * 100) / tasks.length;
    const completeness = isNaN(completed) ? 0 : completed;

    return (
      <div>
        <p className="tasks-component">Tasks</p>
        <LinearProgres completed={completeness} />
        <TaskList
          tasks={allTasks}
          checkBoxHandle={this.checkBoxHandle}
          view={view}
          deleteTask={deleteTask}
          eventId={id}
          className="tasks-list"
        />
        <div hidden={view}>
          {isOpen ? (
            <TaskListNewItem
              openHandle={this.openHandle}
              closeHandle={this.closeHandle}
              changeHandle={this.changeHandle}
              addHandle={this.addHandle}
              cancelHandle={this.cancelHandle}
              name={name}
              referece={this.focusRef}
            />
          ) : (
            <TextComponent placeholder="Add element..." value={name} onClick={this.openHandle} />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tasks: state.tasks.tasksList,
  }),
  {
    createTask: tasksOperations.createTask,
    deleteTask: tasksOperations.deleteTask,
  }
)(Tasks);
