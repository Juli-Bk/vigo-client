import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import SizeTable from '../SizeTable/SizeTable';

const ModalSizeTable = (props) => {
  const { targetId } = props;
  const [isOpen, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <SizeTable id={targetId}/>
    </Dialog>
  );
};

export default ModalSizeTable;
