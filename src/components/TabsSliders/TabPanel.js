import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const TabPanel = (props) => {
  const { width, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={width === 'xs' ? `vertical-tabpanel-${index}` : `simple-tabpanel-${index}`}
      aria-labelledby={width === 'xs' ? `vertical-tab-${index}` : `simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default React.memo(TabPanel);