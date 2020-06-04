import useStyles from '../NestedMenu/NestedMenuStyle';
import React, {useCallback, useMemo, useState} from 'react';
import MenuPanel, {getMenuLink} from '../MenuPanel/MenuPanel';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';

const VerticalSubMenu = (props) => {
  const {categories} = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const links = useMemo(() => categories.map((root, index) => {
    return getMenuLink(root, index);
  }), [categories]);

  const subLinks = useMemo(() => categories.map((root, index) => {
    return <MenuPanel
      value={value}
      key={root.id}
      index={index}
      items={root.children}/>;
  }), [categories, value]);

  return (
    <Box className={classes.vert}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {links}
      </Tabs>
      {subLinks}
    </Box>
  );
};

VerticalSubMenu.propTypes = {
  categories: PropTypes.array.isRequired
};

export default React.memo(VerticalSubMenu);