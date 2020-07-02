import { setCurrentPage, toggleMenuOpen } from '../../redux/actions/actions';
import { setCategoryId } from '../../redux/actions/categories';
import {connect} from 'react-redux';
import React, {useCallback} from 'react';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

const MenuLink = (props) => {
  const {history, href, setCategoryId, categoryId, setCurrentPage, staticContext, toggleMenuOpen, ...rest} = props;

  const handleHover = useCallback((event) => {
    event.isSimulated = true;
    event.currentTarget.click(event);
  }, []);

  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        if (event.isSimulated !== undefined) {
          history.push(href);
          setCategoryId(categoryId);
          setCurrentPage(1);
          toggleMenuOpen(false);
        }
      }}
      onMouseOver={handleHover}
      {...rest}
    />
  );
};

MenuLink.propTypes = {
  history: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  toggleMenuOpen: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenuOpen: isOpen => dispatch(toggleMenuOpen(isOpen)),
    setCategoryId: categoryId => dispatch(setCategoryId(categoryId)),
    setCurrentPage: number => dispatch(setCurrentPage(number))
  };
};

export default connect(null, mapDispatchToProps)(React.memo(withRouter(MenuLink)));