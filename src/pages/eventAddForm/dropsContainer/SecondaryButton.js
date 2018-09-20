import React from 'react';
import Button from '@material-ui/core/Button';

const SecondaryButton = props => {
  const { reset, history, link } = props;

  const secondaryButtonStyle = {
    borderRadius: '2px',
    width: '130px',
    height: '36px',
    marginRight: '24px',
    background: 'linear-gradient(0deg, rgba(52, 70, 98, 0.15), rgba(52, 70, 98, 0.15)), #FFFFFF',
    color: 'rgba(52, 70, 98, 0.5)',
    boxShadow: '0px 2px 2px rgba(52, 70, 98, 0.24), 0px 0px 2px rgba(52, 70, 98, 0.12)',
  };

  const secondaryButtonText = 'CANCEL';

  const clickHandle = () => {
    reset();
    history.push(link);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      style={secondaryButtonStyle}
      className="drops-list-button"
      onClick={() => clickHandle()}
    >
      {secondaryButtonText}
    </Button>
  );
};

export default SecondaryButton;
