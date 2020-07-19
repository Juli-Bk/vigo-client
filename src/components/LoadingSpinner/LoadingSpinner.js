import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './LoadingSpinnerStyle';
import { connect } from 'react-redux';
import { setLoading } from '../../redux/actions/actions';

const LoadingSpinner = (props) => {
  const { isLoading, setLoading } = props;

  const classes = useStyles();

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isLoading} onClick={handleClose}>
        <CircularProgress data-testid='loadingSpinner' color="inherit" />
      </Backdrop>
    </div>
  );
};

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func
};

const mapStateToProps = store => {
  return {
    isLoading: store.stateFlags && store.stateFlags.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: (isLoading) => dispatch(setLoading(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LoadingSpinner));
