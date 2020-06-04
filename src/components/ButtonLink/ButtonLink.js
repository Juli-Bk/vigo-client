import React from 'react';
import { Button } from '@material-ui/core';

import useStyle from './buttonLinkStyle';
import { PropTypes } from 'prop-types';

const ButtonLink = (props) => {
  const classes = useStyle();
  const {name} = props;

  const onClick = () => {
    console.log('open modal login');
  };

  return (
    <div className={classes.styleLink}>
      <Button className={classes.styleButton} onClick={onClick}>{name}</Button>
    </div>
  );
};

ButtonLink.propTypes = {
  name: PropTypes.string
};

export default React.memo(ButtonLink);