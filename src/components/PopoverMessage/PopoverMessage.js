import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import {connect} from 'react-redux';
import {setPopoverOpenState} from '../../redux/actions/actions';

const PopoverMessage = (props) => {
  const {popover, setPopover, anchorEl, popoverContent} = props;

  const handleClose = () => {
    setPopover(false);
  };

  const id = popover.isOpen ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={popover.isOpen}
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
    popover: store.popover
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPopover: data => dispatch(setPopoverOpenState(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopoverMessage);