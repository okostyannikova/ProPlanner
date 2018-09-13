import React, { Component } from 'react';
import LinearProgres from './tasks/LinearProgress';
import TextComponent from './TextComponent';
import TaskList from './tasks/TaskList.js';
import TaskListNewItem from './tasks/TaskListNewItem.js';

export default class Tasks extends Component {
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
    this.changeHandle = this.changeHandle.bind(this);
    this.addHandle = this.addHandle.bind(this);
    this.checkBoxHandle = this.checkBoxHandle.bind(this);
  }

  openHandle() {
    this.setState({ isOpen: true });
  }

  closeHandle(e) {
    if (!e.relatedTarget || e.relatedTarget.closest('.focus-container') !== e.currentTarget) {
      this.setState({ isOpen: false });
    }
  }

  changeHandle(e) {
    this.setState({ name: e.target.value });
  }

  addHandle() {
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

    const completed = (tasks.filter(task => task.checked).length * 100) / tasks.length;
    const completeness = isNaN(completed) ? 0 : completed;

    return (
      <div>
        <p className="tasks-component">Tasks</p>
        <LinearProgres completed={completeness} />
        <TaskList tasks={tasks} checkBoxHandle={this.checkBoxHandle} />

        {isOpen ? (
          <TaskListNewItem
            openHandle={this.openHandle}
            closeHandle={this.closeHandle}
            changeHandle={this.changeHandle}
            addHandle={this.addHandle}
            name={name}
            referece={this.focusRef}
          />
        ) : (
          <TextComponent placeholder="Add element..." value={name} onClick={this.openHandle} />
        )}
      </div>
    );
  }
}
