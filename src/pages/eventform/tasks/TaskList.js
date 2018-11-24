import React, { Component } from 'react';
import Task from './taskList/Task';

class TaskList extends Component {
  render() {
    const { tasks, checkBoxHandle, deleteTask, updateTask, view } = this.props;

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
              key={task.id || `task${index}`}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskList;
