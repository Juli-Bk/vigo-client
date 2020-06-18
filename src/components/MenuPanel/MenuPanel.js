import useStyles from '../NestedMenu/NestedMenuStyle';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import MenuLink from '../MenuLink/MenuLink';

const applyProps = (item, index) => {
  return {
    id: `nav-link-${item.name}-${index}`
  };
};

export const getMenuLink = (item, index, className) => {
  const href = `/products/filter?categoryId=${item.id}`;
  return <MenuLink
    label={item.name}
    className={className}
    key={item.id}
    href={href}
    categoryId={item.id}
    {...applyProps(item, index)}
  />;
};

const MenuPanel = (props) => {
  const classes = useStyles();
  const {children, value, index, items = [], containerClassName, ...other} = props;
  let item;

  if (items.length) {
    item = <Box
      component='ul'
      className={classes.menuLinksBox}>
      {
        items.map((item, index) => {
          return <Box
            key={item.id + `${index}`}
            component='li'>
            {getMenuLink(item, index, classes.menuLink)}
          </Box>;
        })
      }
    </Box>;
  } else {
    item = <Box p={3}>{children}</Box>;
  }

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      className={containerClassName}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && item}
    </Box>
  );
};

MenuPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  items: PropTypes.array,
  containerClassName: PropTypes.string
};

export default React.memo(MenuPanel);