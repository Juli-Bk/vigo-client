import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';

import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import useStyles from './ViewAsStyle';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ViewAsTheme';
import { connect } from 'react-redux';
import {setChosenView} from '../../redux/actions/actions';
import globalConfig from '../../globalConfig';

const ViewAs = (props) => {
  const {label, setView, view} = props;

  const styles = useStyles();

  const handleChange = (event, nextView) => {
    setView(nextView);
    localStorage.setItem('chosenView', nextView);
  };

  useEffect(() => {
    const chosenView = localStorage.getItem('chosenView') || globalConfig.viewOptions.module;
    setView(chosenView);
  }, [setView]);

  return (
    <Box className={styles.wrapper} component='div'>
      {label && <Typography className={styles.label} variant='caption'>View as:</Typography>}
      <ThemeProvider theme={theme}>
        <ToggleButtonGroup data-testid='toggleButtonGroup' orientation="horizontal" value={view} exclusive onChange={handleChange}>
          <ToggleButton value={globalConfig.viewOptions.module} aria-label={globalConfig.viewOptions.module}>
            <ViewModuleIcon className={styles.icons}/>
          </ToggleButton>
          <ToggleButton value={globalConfig.viewOptions.list} aria-label={globalConfig.viewOptions.list}>
            <FormatListBulletedIcon className={styles.icons}/>
          </ToggleButton>
        </ToggleButtonGroup>
      </ThemeProvider>
    </Box>
  );
};

ViewAs.propTypes = {
  label: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    view: store.productsOptions.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setView: (view) => dispatch(setChosenView(view))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ViewAs));