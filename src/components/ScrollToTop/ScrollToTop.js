import React from 'react';
import ScrollUpButton from 'react-scroll-up-button';
import useStyles from './ScrollToTopStyle';

const ScrollToTop = () => {
  const styles = useStyles();
  return (
    <ScrollUpButton className={styles.ScrollUpButton__Container} />
  );
};
export default React.memo(ScrollToTop);