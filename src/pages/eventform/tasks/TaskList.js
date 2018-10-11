import React, { Component } from 'react';
import Task from './taskList/Task';

class TaskList extends Component {
  state = { tasks: [] };

  componentWillReceiveProps(newProps) {
    if (!newProps) return;
    this.setState({ tasks: newProps.tasks });
  }

  render() {
    const { tasks, checkBoxHandle, deleteTask, updateTask, eventId, view } = this.props;
    // console.log('123', tasks.tasks);
    return (
      <div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <Task
              task={task}
              view={view}
              index={index}
              checkBoxHandle={checkBoxHandle}
              deleteTask={deleteTask}
              updateTask={updateTask}
              eventId={eventId}
              key={task.id || `task${index}`}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskList;
