import React from 'react';
import Button from '@material-ui/core/Button';

const MainButton = props => {
  const { view, history, link, valid, isAddPath } = props;

  const mainButtonStyle = view
    ? {
        borderRadius: '2px',
        width: '43%',
        maxWidth: '130px',
        height: '36px',
        marginRight: '24px',
        background:
          'linear-gradient(0deg, rgba(0, 188, 212, 0.1), rgba(0, 188, 212, 0.1)), #FFFFFF',
        color: '#00BCD4',
        boxShadow: '0px 2px 2px rgba(0, 188, 212, 0.24), 0px 0px 2px rgba(0, 188, 212, 0.12)',
      }
    : {
        borderRadius: '2px',
        width: '43%',
        maxWidth: '130px',
        height: '36px',
        marginRight: '24px',
        background: valid ? '#00BCD4' : '#8ec4cc',
        color: '#FFFFFF',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      };

  const mainButtonText = view ? 'EDIT' : 'SAVE';
  const type = view || isAddPath ? 'submit' : '';

  const handleClick = () => {
    if (isAddPath) {
      return;
    }

    history.push(link);
  };

  return (
    <Button
      onClick={handleClick}
      type={type}
      variant="contained"
      color="primary"
      style={mainButtonStyle}
      className="drops-list-button"
      disabled={!valid}
    >
      {mainButtonText}
    </Button>
  );
};

export default MainButton;
