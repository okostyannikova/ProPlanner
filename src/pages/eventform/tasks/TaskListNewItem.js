import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextComponent from 'components/TextComponent/TextComponent';

class TaskListNewItem extends Component {
  render() {
    const {
      openHandle,
      closeHandle,
      changeHandle,
      name,
      addHandle,
      cancelHandle,
      keyDownHandle,
      referece,
      disabled,
    } = this.props;

    return (
      <div onFocus={openHandle} onBlur={closeHandle} className="focus-container">
        <TextComponent
          placeholder="Add element..."
          onChange={changeHandle}
          onKeyDown={keyDownHandle}
          multiline
          autoFocus
          inputRef={referece}
          value={name}
        />
        <div className="button-container">
          <Button
            variant="contained"
            onClick={addHandle}
            style={{
              backgroundColor: disabled ? '#e1e4e8' : '#00BCD4',
              boxShadow: disabled
                ? '0px 2px 2px rgba(52, 70, 98, 0.24), 0px 0px 2px rgba(52, 70, 98, 0.12)'
                : 'none',
              color: disabled ? 'rgba(52, 70, 98, 0.5)' : 'white',
              marginRight: '5px',
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#f50057', color: 'white' }}
            onClick={cancelHandle}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default TaskListNewItem;
