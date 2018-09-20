import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class TaskList extends Component {
  render() {
    const { tasks, checkBoxHandle } = this.props;

    return (
      <div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            // Времменый key, поменять, когда будут id с сервера !!!
            <li key={`${task.name}${index}`}>
              <Checkbox
                checked={task.checked}
                onChange={() => checkBoxHandle(index)}
                value={task.name}
                style={{ color: '#00BCD4' }}
                color="primary"
              />
              <span className={task.checked ? 'checked-task' : ''}>{task.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskList;
