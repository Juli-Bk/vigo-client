import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles({
  title: {
    position: 'relative',
    width: 'fit-content',
    color: colors.fontPrimary,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontFamily: fonts.f4,

    '&:after': {
      position: 'absolute',
      content: '""',
      top: '-1.1rem',
      left: 0,
      height: 1,
      width: '100%',
      background: colors.fontPrimary
    }

  },
  divider: {
    height: 1,
    color: colors.thinLine,
    marginBottom: '1rem'
  }
});

const LowerTitle = (props) => {
  const classes = useStyles();
  const {text} = props;

  return (
    <Box className={classes.header}>
      <Divider className={classes.divider}/>
      <Typography variant='subtitle1' className={classes.title}>{text}</Typography>
    </Box>
  );
};

export default React.memo(LowerTitle);
