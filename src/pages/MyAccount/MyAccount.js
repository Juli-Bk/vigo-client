import React, {useEffect} from 'react';
import MyAccTabs from '../../components/MyAccTabs/MyAccTabs';
import {Container} from '@material-ui/core';
import {clear, getUserData} from '../../redux/actions/user';
import {setLoginModalOpenState} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {isEmptyObj} from '../../helpers/helpers';

const MyAccount = (props) => {
  const {
    auth = true,
    user,
    clear,
    setLoginOpen,
    getUserData
  } = props;

  useEffect(() => {
    if (!auth) {
      clear();
      setLoginOpen(true);
      getUserData();
    }
  }, [auth, clear, getUserData, setLoginOpen]);

  return (
    <>
      {
        !isEmptyObj(user)
          ? <Container component='span'>
            <MyAccTabs user={user}/>
          </Container>
          : <></>
      }
    </>
  );
};

const mapStoreToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch(clear()),
    getUserData: () => dispatch(getUserData()),
    setLoginOpen: flag => dispatch(setLoginModalOpenState(flag))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(MyAccount)));
