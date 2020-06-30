import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {confirmMyEmail} from '../../redux/actions/user';
import queryString from 'query-string';

const EmailConfirmationDialog = (props) => {
  const {history, location, confirm} = props;

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const email = parsed.email;
    confirm(email, () => {
      history.push('/');
    });
  }, [confirm, history, location.search]);

  return (
    <Box style={{height: 300}}/>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    confirm: (email, callback) => dispatch(confirmMyEmail(email, callback))
  };
};

export default connect(null, mapDispatchToProps)(React.memo(withRouter(EmailConfirmationDialog)));