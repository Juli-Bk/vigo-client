import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import {connect} from 'react-redux';
import {setPopoverOpenState} from '../../redux/actions/actions';

const PopoverMessage = (props) => {
  const {isPopoverOpen, setPopover, anchorEl, popoverContent} = props;

  const handleClose = () => {
    setPopover(false);
  };

  const id = isPopoverOpen ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
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
    </div>
  );
};

const mapStateToProps = store => {
  return {
    isPopoverOpen: store.isPopoverOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPopover: flag => dispatch(setPopoverOpenState(flag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopoverMessage);