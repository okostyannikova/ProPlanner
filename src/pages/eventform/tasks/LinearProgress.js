import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  colorPrimary: { backgroundColor: '#F9F9F9' },
  barColorPrimary: { backgroundColor: '#00BCD4' },
};

class LinearProgres extends React.Component {
  // state = {
  //   completed: 70,
  // };

  render() {
    const { classes, completed } = this.props;
    return (
      <span className="linear-progres">
        <div className="linear-progres-container">
          <span>
            <LinearProgress
              variant="determinate"
              value={completed}
              style={{
                borderRadius: '50px',
                height: '8px',
                width: '90%',
              }}
              classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary,
              }}
            />
          </span>
          <span className="progress-percent">{`${parseInt(completed, 10)}%`}</span>
        </div>
      </span>
    );
  }
}

export default withStyles(styles)(LinearProgres);
