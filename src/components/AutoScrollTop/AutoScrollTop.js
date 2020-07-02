import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

const AutoScrollTop = (props) => {
  const {children, history} = props;
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <>
      {children}
    </>
  );
};

export default withRouter(AutoScrollTop);
