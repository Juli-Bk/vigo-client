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
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'black'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  linkButton: {
    marginTop: '1.25rem',
    color: colors.fontSecondary,
    fontWeight: 300,
    fontFamily: fonts.f3,
    border: 'none',
    fonFamily: fonts.f2,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'none',
      color: colors.noticeColor
    }
  }
}));

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
            <Button autoFocus color="inherit" onClick={handleClose}>
              ok
            </Button>
          </Toolbar>
        </AppBar>
        <VigoPrivacyPolicy />
      </Dialog>
    </Box>
  );
};
export default React.memo(PrivacyPolicyModal);
