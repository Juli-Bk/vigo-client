import {withStyles} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {ThemeProvider} from '@material-ui/core';
import theme from '../FiltersTree/FiltersTreeTheme';
import TransitionComponent from '../TransitionComponent/TransitionComponent';
import TreeItem from '@material-ui/lab/TreeItem';
import React from 'react';

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3
    }
  },
  label: {
    '&:hover': {
      backgroundColor: 'none',
      color: colors.noticeColor
    }
  },
  content: {
    flexDirection: 'row-reverse',
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  selected: {},
  expanded: {},
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: 'none'
    },
    '&:focus > $content': {
      backgroundColor: 'none'
    },
    '&$selected > $content': {
      backgroundColor: 'none'
    },
    '&:focus > $content $label': {
      backgroundColor: 'none'
    },
    '&:hover > $content $label': {
      backgroundColor: 'none'
    },
    '&$selected > $content $label': {
      backgroundColor: colors.listColor
    },
    '&$selected > $content $label:hover': {
      backgroundColor: colors.listColor
    },
    '&$selected:focus > $content $label': {
      backgroundColor: colors.listColor
    }
  }
}))(
  (props) =>
    <ThemeProvider theme={theme}>
      <TreeItem {...props} TransitionComponent={TransitionComponent}/>
    </ThemeProvider>
);

export default React.memo(StyledTreeItem);