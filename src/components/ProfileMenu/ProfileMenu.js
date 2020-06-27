import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import {Avatar, Box, makeStyles, Menu, MenuItem, Typography, useMediaQuery} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {colors} from '../../styles/colorKit';
import {logout} from '../../redux/actions/user';
import {withRouter} from 'react-router';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 150
    }
  },
  avatarBtn: {
    cursor: 'pointer'
  },
  link: {
    color: 'inherit'
  },
  menu: {
    boxShadow: 'none'
  },
  menuItem: {
    '&:hover': {
      color: colors.noticeColor
    }
  }
}));

const ProfileMenu = (props) => {
  const {user, logout, history} = props;
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 723px)');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogOut = useCallback(() => {
    logout();
    handleClose();
    history.push('/');
  }, [handleClose, history, logout]);

  return (
    <Box className={classes.container}>
      <Avatar
        className={classes.avatarBtn}
        aria-controls='profile-menu'
        aria-haspopup='true'
        onClick={handleClick}/>
      {
        !isMobile
          ? <Typography variant='caption'>
            {user.firstName} {user.lastName}
          </Typography>
          : null
      }
      <Menu
        className={classes.menu}
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem className={classes.menuItem}>
          <Link to='/account' className={classes.link}>My account</Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileMenu)));