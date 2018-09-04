import React, { Component } from 'react';
import './eventsettings/styles.css';
import ImageDropzone from './eventsettings/ImageDropzone';
import Title from './eventsettings/Title';
import Time from './eventsettings/Time';
import Description from './eventsettings/Description';
import Tasks from './eventsettings/Tasks';

export default class EventSettings extends Component {
  render() {
    return (
      <div>
        <ImageDropzone />
        <div className="main-container">
          <ul className="component-list">
            <li>
              <Title />
            </li>
            <li>
              <Time />
            </li>
            <li>
              <Description />
            </li>
            <li>
              <Tasks />
            </li>
          </ul>
        </div>
        <div className="drops-container">drops-container</div>
      </div>
    );
  }
}
