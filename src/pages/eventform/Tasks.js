import React, { Component } from 'react';
import TextComponent from 'components/TextComponent/TextComponent';
import LinearProgres from './tasks/LinearProgress';
import TaskList from './tasks/TaskList.js';
import TaskListNewItem from './tasks/TaskListNewItem.js';

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
    this.deleteHandle = this.deleteHandle.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.keyDownHandle = this.keyDownHandle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tasks: newProps.input.value.map(task => {
        const tasks = task.id
          ? {
              id: task.id,
              name: task.name,
              checked: task.checked,
            }
          : {
              name: task.name,
              checked: task.checked,
            };

        return tasks;
      }),
    });
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
    const { name, tasks } = this.state;
    const { input } = this.props;

    if (!name.length) {
      return;
    }

    input.onChange([...tasks, { name, checked: false }]);

    this.setState({
      name: '',
    });

    this.focusRef.current.focus();
  }

  checkBoxHandle(index) {
    const { tasks } = this.state;
    const { input } = this.props;

    const tempArray = JSON.parse(JSON.stringify(tasks));

    tempArray[index].checked = !tempArray[index].checked;
    input.onChange(tempArray);
  }

  updateTask(index, name) {
    const { tasks } = this.state;
    const { input } = this.props;

    const tempArray = JSON.parse(JSON.stringify(tasks));
    tempArray[index].name = name;
    input.onChange(tempArray);
  }

  deleteHandle(index) {
    const { tasks } = this.state;
    const { input } = this.props;

    input.onChange(tasks.filter((task, ind) => ind !== index));
  }

  keyDownHandle(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.addHandle();
    }

    if (e.keyCode === 27) {
      e.preventDefault();
      this.cancelHandle();
    }
  }

  render() {
    const { tasks, isOpen, name } = this.state;
    const { view } = this.props;

    const allTasks = tasks.length
      ? tasks.map(task => ({
          id: task.id,
          name: task.name,
          checked: task.checked,
        }))
      : [];

    const completed = (tasks.filter(task => task.checked).length * 100) / tasks.length;
    const completeness = isNaN(completed) ? 0 : completed;
    const disabled = !name.length;

    return (
      <div>
        <p className="tasks-component">Tasks</p>
        <LinearProgres completed={completeness} />
        <TaskList
          tasks={allTasks}
          checkBoxHandle={this.checkBoxHandle}
          view={view}
          deleteTask={this.deleteHandle}
          updateTask={this.updateTask}
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
              keyDownHandle={this.keyDownHandle}
              disabled={disabled}
            />
          ) : (
            <TextComponent placeholder="Add element..." value={name} onClick={this.openHandle} />
          )}
        </div>
      </div>
    );
  }
}

export default Tasks;
