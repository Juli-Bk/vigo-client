import React from 'react';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';

const PersonButton = (props) => {
  const {classIncome} = props;

  return (
    <>
      <PopupState variant="popover" popupId="open-person">
        {popupState => (
          <div>
            <IconButton aria-label="personIcon"
              className={classIncome}
              {...bindTrigger(popupState)}>
              <PersonIcon />
            </IconButton>
          </div>
        )}
      </PopupState>
    </>
  );
};

export default React.memo(PersonButton);