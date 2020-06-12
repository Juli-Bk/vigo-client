import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles({
  title: {
    color: colors.black,
    background: colors.thinLine,
    padding: '.5rem .8rem',
    fontFamily: fonts.f3,
    marginBottom: '3rem'
  }
});

const PageTitle = (props) => {
  const {title} = props;
  const classes = useStyles();
  return <Typography variant='h5' className={classes.title}>{title}</Typography>;
};

export default React.memo(PageTitle);