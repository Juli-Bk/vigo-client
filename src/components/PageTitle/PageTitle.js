import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const useStyles = makeStyles({
  title: {
    color: colors.black,
    background: colors.thinLine
  }
});

const PageTitle = (props) => {
  const {title} = props;
  const classes = useStyles();
  return <Typography variant='h5' className={classes.title}>{title}</Typography>;
};

export default React.memo(PageTitle);