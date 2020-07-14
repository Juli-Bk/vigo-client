import React, {useEffect} from 'react';
import MyAccTabs from '../../components/MyAccTabs/MyAccTabs';
import {Container} from '@material-ui/core';
import {clear} from '../../redux/actions/user';
import {setLoginModalOpenState} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const MyAccount = (props) => {
  const {auth = true, clear, setLoginModalOpenState} = props;

  useEffect(() => {
    if (!auth) {
      clear();
      setLoginModalOpenState(true);
    }
  }, [auth, clear, setLoginModalOpenState]);

  return (
    <>
      {
        auth ? <Container component='span'>
          <MyAccTabs/>
        </Container>
          : <></>
      }
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch(clear()),
    setLoginModalOpenState: flag => dispatch(setLoginModalOpenState(flag))
  };
};

export default connect(null, mapDispatchToProps)(React.memo(withRouter(MyAccount)));
