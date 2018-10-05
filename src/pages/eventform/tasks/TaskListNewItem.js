import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextComponent from '../TextComponent';

class TaskListNewItem extends Component {
  render() {
    const {
      openHandle,
      closeHandle,
      changeHandle,
      name,
      addHandle,
      cancelHandle,
      referece,
    } = this.props;

    return (
      <div onFocus={openHandle} onBlur={closeHandle} className="focus-container">
        <TextComponent
          placeholder="Add element..."
          onChange={changeHandle}
          multiline
          autoFocus
          inputRef={referece}
          value={name}
        />
        <div className="button-container">
          <Button
            variant="contained"
            onClick={addHandle}
            style={{ backgroundColor: '#00BCD4', color: 'white', marginRight: '5px' }}
          >
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={cancelHandle}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default TaskListNewItem;
