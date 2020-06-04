import React from 'react';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerList: {
    height: '100%',
    width: 100
  }

}));

const PersonButton = (props) => {
  const classLocal = useStyles();
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
              <Box className={classLocal.containerList}>
                <List component="nav" >
                  <ListItem button divider>
                    <ListItemText primary="Log in" />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary="Register" />
                  </ListItem>
                </List>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  );
};

export default React.memo(PersonButton);