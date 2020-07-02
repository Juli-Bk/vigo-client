import React, {useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import VigoPrivacyPolicy from './VigoProvacyPolicy';
import useStyles from '../../styles/formStyle/formStyle';

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrivacyPolicyModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button className={classes.linkButton} onClick={handleClickOpen}>
        Privacy Policy
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar elevation={0} className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <VigoPrivacyPolicy />
        <Button autoFocus className={classes.buttonOk} color="inherit" onClick={handleClose}>
        ok
        </Button>
      </Dialog>
    </Box>
  );
};
export default React.memo(PrivacyPolicyModal);
