import React, { Component } from 'react';
import './eventform/styles.css';
import ImageDropzone from './eventform/ImageDropzone';
import TextComponent from './eventform/TextComponent';
import Time from './eventform/Time';
import Tasks from './eventform/Tasks';
import DropsContainer from './eventform/DropsContainer.js';

export default class EventForm extends Component {
  render() {
    return (
      <div>
        <ImageDropzone />
        <div className="main-container">
          <ul className="component-list">
            <li>
              <TextComponent
                headerClass="title-component"
                headerContent="Title"
                placeholder="Add a title..."
              />
            </li>
            <li>
              <Time />
            </li>
            <li>
              <TextComponent
                headerClass="description-component"
                headerContent="Description"
                placeholder="add a detailed description..."
                multiline
              />
            </li>
            <li>
              <Tasks />
            </li>
          </ul>
        </div>
        <div className="drops-container">
          <DropsContainer />
        </div>
      </div>
    );
  }
}
