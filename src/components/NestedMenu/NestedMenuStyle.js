import {makeStyles} from '@material-ui/core/styles';
import {fonts} from '../../styles/fonts/fontsKit';
import {colors} from '../../styles/colorKit';

const useStyles = makeStyles((theme) => {
  const height = 240;
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    vert: {
      flexGrow: 1,
      backgroundColor: colors.bgPrimary,
      display: 'flex',
      minHeight: height,
      padding: 25,
      [theme.breakpoints.down(1200)]: {
        padding: 12
      }
    },
    imageBox: {
      maxHeight: height - 50,
      overflow: 'hidden'
    },
    bannerImage: {
      height: height - 50,
      width: 'auto'
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`
    },
    tabPanelShadow: {
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0),' +
        ' 0px 0px 0px 0px rgba(0,0,0,0),' +
        ' 0px 0px 5px 0px rgba(0,0,0,0.1)'
    },
    topMenuLabel: {
      minHeight: '48px'
    },
    menuLinksBox: {
      padding: '10px 0 10px 20px',
      display: 'flex',
      flexDirection: 'column'
    },
    menuLink: {
      lineHeight: '0.7rem',
      fontSize: '0.6rem',
      fontWeight: '300',
      fontFamily: fonts.f2
    },
    popper: {
      zIndex: 10000000,
      transform: 'translate3d(0px, 48px, 0px)',
      top: 0,
      left: 0,
      right: 0
    },
    tabBox: {
      position: 'relative'
    },
    topMenuItemsPanel: {
      padding: 0
    }
  };
});
export default useStyles;