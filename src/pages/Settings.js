import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { settingsOperations } from 'modules/Settings';
import { typesOptions, priorityOptions } from 'config';
import TimePickers from './settings/TimePickers';
import Priority from './settings/Priority';
import Type from './settings/Type';
import userIcon from '../assets/images/settings/user-icon.svg';
import emailIcon from '../assets/images/settings/email-icon.svg';

const styles = {
  colorSwitchBase: {
    color: '#e4e4e4',
    '&$colorChecked': {
      color: '#00BCD4',
      '& + $colorBar': {
        backgroundColor: 'rgba(0, 188, 212, 0.49)',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  handleChange = () => event => {
    const { updateSyncToGoogleCalendar } = this.props;
    updateSyncToGoogleCalendar(event.target.checked);
  };

  validateTime = time => {
    const timeToMinutes = value => value.split(':')[0] * 60 + Number(value.split(':')[1]);
    const start = timeToMinutes(time.start);
    const end = timeToMinutes(time.end);
    const range = 8 * 60;
    if (end - start < range) {
      this.setState(prevState => ({ ...prevState, error: true }));
      setTimeout(() => {
        this.setState(prevState => ({ ...prevState, error: false }));
      }, 5000);
      return false;
    }
    return true;
  };

  handleStartDateChange = newTime => {
    const { updateWorkTime, workingEndTime } = this.props;
    const time = {
      start: newTime.format('HH:mm:SS'),
      end: workingEndTime.format('HH:mm:SS'),
    };
    if (this.validateTime(time)) updateWorkTime(time);
  };

  handleEndDateChange = newTime => {
    const { updateWorkTime, workingStartTime } = this.props;
    const time = {
      start: workingStartTime.format('HH:mm:SS'),
      end: newTime.format('HH:mm:SS'),
    };
    if (this.validateTime(time)) updateWorkTime(time);
  };

  handleTypeChange = newType => {
    const { updateEventsSettings, defaultPriority } = this.props;
    const settings = {
      default_events_type: newType,
      default_events_priority: defaultPriority,
    };
    updateEventsSettings(settings);
  };

  handlePriorityChange = newPriority => {
    const { updateEventsSettings, defaultType } = this.props;
    const settings = {
      default_events_type: defaultType,
      default_events_priority: newPriority,
    };
    updateEventsSettings(settings);
  };

  render() {
    const {
      avatar,
      name,
      email,
      classes,
      workingStartTime,
      workingEndTime,
      defaultType,
      defaultPriority,
      syncEnabled,
    } = this.props;
    const { error } = this.state;
    return (
      <PageContainer className="page-content settings">
        <UserInfo>
          <AvatarContainer>
            <Avatar src={avatar} />
          </AvatarContainer>
          <ul>
            <ListItem>
              <UserTitle>
                <UserTitleIcon src={userIcon} />
                Name
              </UserTitle>
              <UserText>{name}</UserText>
            </ListItem>
            <ListItem>
              <UserTitle>
                <UserTitleIcon src={emailIcon} />
                Email
              </UserTitle>
              <UserText>{email}</UserText>
            </ListItem>
          </ul>
        </UserInfo>

        <SettingsContainer>
          <ul>
            <SettingsItem>
              <Title>
                <Icon
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.3832 0 0 5.3832 0 12C0 18.6168 5.3832 24 12 24C18.6168 24 24 18.6168 24 12C24 5.3832 18.6168 0 12 0ZM12 21.4466C6.79119 21.4466 2.55315 17.2091 2.55315 12C2.55315 6.79094 6.79119 2.5534 12 2.5534C17.2088 2.5534 21.4468 6.79094 21.4468 12C21.4468 17.2091 17.2088 21.4466 12 21.4466Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M18.2539 11.6295H12.8611V5.14531C12.8611 4.59966 12.4187 4.15725 11.873 4.15725C11.3274 4.15725 10.8849 4.59966 10.8849 5.14531V12.6175C10.8849 13.1632 11.3274 13.6056 11.873 13.6056H18.2539C18.7996 13.6056 19.242 13.1632 19.242 12.6175C19.242 12.0719 18.7996 11.6295 18.2539 11.6295Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                </Icon>
                Time period
              </Title>
              <Content>
                <TimePickers
                  handleStartDateChange={this.handleStartDateChange}
                  handleEndDateChange={this.handleEndDateChange}
                  start={workingStartTime}
                  end={workingEndTime}
                  error={error}
                />
              </Content>
            </SettingsItem>
            <SettingsItem>
              <Title>
                <Icon
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5363 12.0958L11.5692 3.14126C11.2514 2.82332 10.8251 2.55378 10.29 2.3323C9.75475 2.11078 9.26567 2 8.8225 2H3.6053C3.17047 2 2.79424 2.15897 2.47652 2.47652C2.15879 2.79424 2 3.17047 2 3.6053V8.8225C2 9.26563 2.11065 9.75458 2.33226 10.2898C2.55387 10.8251 2.82345 11.2471 3.14126 11.5565L12.1082 20.5361C12.4176 20.8455 12.7936 21.0002 13.237 21.0002C13.6714 21.0002 14.0522 20.8455 14.3782 20.5361L20.5361 14.3658C20.8455 14.0563 21 13.6803 21 13.2372C21 12.8024 20.8455 12.4219 20.5363 12.0958ZM7.14819 7.14824C6.83447 7.46179 6.45626 7.61865 6.01309 7.61865C5.57009 7.61865 5.1917 7.46179 4.87816 7.14824C4.56461 6.83465 4.40788 6.45644 4.40788 6.01331C4.40788 5.57013 4.56461 5.19179 4.87816 4.87838C5.19175 4.56479 5.57009 4.40792 6.01309 4.40792C6.45626 4.40792 6.8346 4.56479 7.14819 4.87838C7.46161 5.19179 7.61847 5.57018 7.61847 6.01331C7.61847 6.45644 7.46179 6.83465 7.14819 7.14824Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                </Icon>
                Default type
              </Title>
              <Content>
                <Type type={defaultType} handleTypeChange={this.handleTypeChange} />
              </Content>
            </SettingsItem>
            <SettingsItem>
              <Title>
                <Icon
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.2967 22.5936C5.12011 22.5936 5.25483 22.5936 0.703125 22.5936C0.314484 22.5936 0 22.9081 0 23.2968C0 23.6854 0.314484 23.9999 0.703125 23.9999H23.2967C23.6854 23.9999 23.9999 23.6854 23.9999 23.2968C23.9999 22.9081 23.6854 22.5936 23.2967 22.5936Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M6.42183 15.5624H2.10938C1.72073 15.5624 1.40625 15.8769 1.40625 16.2655V21.1874H7.12495V16.2655C7.12495 15.8769 6.81047 15.5624 6.42183 15.5624Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M13.453 11.3437H9.23428C8.84564 11.3437 8.53116 11.6582 8.53116 12.0468V21.1874H14.1561V12.0468C14.1562 11.6582 13.8417 11.3437 13.453 11.3437Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M23.7939 5.83094L18.872 0.205981C18.5974 -0.0686602 18.1524 -0.0686602 17.8778 0.205981L12.9559 5.83094C12.7547 6.03212 12.6943 6.33423 12.8035 6.59725C12.9119 6.86022 13.1688 7.03122 13.453 7.03122H15.5624V21.1874H21.1874V7.03122H23.2968C23.581 7.03122 23.8378 6.86026 23.9463 6.59725C24.0555 6.33428 23.9951 6.03212 23.7939 5.83094Z"
                    fill="#344662"
                    fillOpacity="0.5"
                  />
                </Icon>
                Default priority
              </Title>
              <Content>
                <Priority
                  priority={defaultPriority}
                  handlePriorityChange={this.handlePriorityChange}
                />
              </Content>
            </SettingsItem>
            <SettingsItemSwitch>
              <StyledSwitch
                checked={syncEnabled}
                onChange={this.handleChange()}
                value="syncEnabled"
                classes={{
                  switchBase: classes.colorSwitchBase,
                  checked: classes.colorChecked,
                  bar: classes.colorBar,
                }}
              />
              <Title>
                {`${syncEnabled ? 'Disable' : 'Enable'} auto sync with Google Calendar`}
              </Title>
            </SettingsItemSwitch>
          </ul>
        </SettingsContainer>
      </PageContainer>
    );
  }
}

Settings.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  defaultType: PropTypes.number.isRequired,
  defaultPriority: PropTypes.number.isRequired,
  workingStartTime: PropTypes.object.isRequired,
  workingEndTime: PropTypes.object.isRequired,
  syncEnabled: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  updateWorkTime: PropTypes.func.isRequired,
  updateEventsSettings: PropTypes.func.isRequired,
  updateSyncToGoogleCalendar: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { user } = state.auth.user;
  const startTime = user.working_start_time.split(':');
  const endTime = user.working_end_time.split(':');
  const typesList = Object.keys(typesOptions);
  const priorityList = Object.keys(priorityOptions);
  return {
    avatar: user.avatar,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    workingStartTime: moment()
      .hour(startTime[0])
      .minutes(startTime[1])
      .seconds(0)
      .milliseconds(0),
    workingEndTime: moment()
      .hour(endTime[0])
      .minutes(endTime[1])
      .seconds(0)
      .milliseconds(0),
    defaultType:
      user.default_events_type !== null ? typesList.indexOf(user.default_events_type) : 0,
    defaultPriority:
      user.default_events_priority !== null
        ? priorityList.indexOf(user.default_events_priority)
        : 0,
    syncEnabled: user.sync_enabled,
  };
};

export default connect(
  mapStateToProps,
  {
    updateWorkTime: settingsOperations.updateWorkTime,
    updateEventsSettings: settingsOperations.updateEventsSettings,
    updateSyncToGoogleCalendar: settingsOperations.updateSyncToGoogleCalendar,
  }
)(withStyles(styles)(Settings));

const PageContainer = styled.div`
  padding: 64px 9% 0px 9%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 890px) {
    padding: 50px 5% 0px 5%;
  }
  @media (max-width: 630px) {
    flex-direction: column;
    padding: 24px 20px 0px 20px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 2 341px;
  max-width: 360px;
  @media (max-width: 630px) {
    width: 100%;
    max-width: 100%;
  }
`;
const AvatarContainer = styled.div`
  display: block;
  width: 205px;
  height: 205px;
  background-color: #f9f9f9;
  border: 15px solid #f9f9f9;
  border-radius: 10px;
  box-sizing: border-box;
  margin-left: 21px;
  margin-bottom: 25px;
  @media (max-width: 630px) {
    margin: 0 auto 25px;
  }
`;
const Avatar = styled.img`
  border-radius: 10px;
`;
const ListItem = styled.li`
  list-style: none;
  margin: 0;
`;
const UserTitle = styled.p`
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  color: rgba(52, 70, 98, 0.54);
  margin: 0;
`;
const UserTitleIcon = styled.img`
  margin-right: 18px;
  vertical-align: middle;
`;
const UserText = styled.p`
  font-size: 20px;
  color: #344662;
  margin: 5px 0 26px 37px;
  word-wrap: break-word;
  @media (max-width: 630px) {
    margin-bottom: 16px;
  }
`;

const SettingsContainer = styled.div`
  flex: 3 1 561px;
  margin-top: 15px;
  margin-left: 20px;
  @media (max-width: 630px) {
    width: 100%;
    margin-top: 60px;
    margin-left: 0;
  }
`;
const SettingsItem = styled.li`
  list-style: none;
  &:not(:last-child) {
    margin-bottom: 38px;
  }
  &:first-child {
    margin-bottom: 22px;
  }
  @media (max-width: 630px) {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;
const SettingsItemSwitch = styled(SettingsItem)`
  display: flex;
  align-items: center;
`;
const Title = styled.span`
  font-size: 18px;
  color: rgba(52, 70, 98, 0.87);
  font-weight: 500;
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  margin-right: 24px;
  vertical-align: middle;
`;

const Content = styled.div`
  margin-top: 15px;
  margin-left: 48px;
`;
const StyledSwitch = styled(Switch)`
  margin-left: -10px;
  margin-right: 12px;
`;
