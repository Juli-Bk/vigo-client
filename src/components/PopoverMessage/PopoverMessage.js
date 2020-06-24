import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const PopoverMessage = (props) => {
  const {popoverContent, buttonContent} = props;
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {(popupState) => (
        <Box>
          <Button {...bindTrigger(popupState)}>
            {buttonContent}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Box p={2}>
              <Typography>{popoverContent}</Typography>
            </Box>
          </Popover>
        </Box>
      )}
    </PopupState>
  );
};
export default React.memo(PopoverMessage);