import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  wrapper: {
    position: 'absolute',
    zIndex: '100',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  progressWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CardLoader(props) {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.progressWrapper}>
        <CircularProgress className={classes.progress} />
      </div>
    </div>
  );
}

CardLoader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardLoader);
