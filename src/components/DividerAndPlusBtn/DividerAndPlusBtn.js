import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Box } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    height: '30px'
  },
  divider: {
    height: 1,
    color: colors.thinLine,
    marginBottom: '1rem'
  },

  plusBtn: {
    position: 'absolute',
    top: '-60%',
    left: '48%',
    border: `2px solid ${colors.black}`,
    borderRadius: '50%',
    color: colors.black,
    height: '2rem',
    width: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    background: colors.fontOncard
  }
});

const DividerAndPlusBtn = (props) => {
  const classes = useStyles();
  const {handler} = props;

  return (
    <Box className={classes.container}>
      <Divider className={classes.divider} />
      <Box data-testid='plus' className={classes.plusBtn} onClick={handler}>&#43;</Box>
    </Box>
  );
};

DividerAndPlusBtn.propTypes = {
  handler: PropTypes.func
};

export default React.memo(DividerAndPlusBtn);