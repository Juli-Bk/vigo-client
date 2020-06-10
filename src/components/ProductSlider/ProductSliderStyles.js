import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
  },
  '@global': {
    '.image-gallery .image-gallery-left-nav .image-gallery-svg, .image-gallery .image-gallery-right-nav .image-gallery-svg': {
      width: '.8rem',
      height: '1.6rem',
      padding: '0 .6rem',
      strokeWidth: 1.5,
      [theme.breakpoints.up(724)]: {
        width: '1.5rem',
        height: '3rem'
      },
      '&:focus, &:visited, &:hover, &:focus-within, &:active': {
        outline: 'none',
        color: colors.noticeColor
      },
      '.image-gallery-icon:focus': {
        outline: 'none !important'
      }
    },
    '@media (min-width: 768px)': {
      '.image-gallery .image-gallery-icon:hover': {
        color: colors.noticeColor
      }
    },
    '.image-gallery .image-gallery-thumbnail.active, .image-gallery .image-gallery-thumbnail:hover, .image-gallery .image-gallery-thumbnail:focus': {
      outline: 'none',
      border: `3px solid ${colors.noticeColor}`
    }
  },
  slider: {
    '@global video': {
      width: '100%',
      height: 'inherit'
    },
    '@global .fullscreen .image-gallery-image': {
      height: '100vh'
    },
    '@global .image-gallery-right-nav': {
      right: 0,
      [theme.breakpoints.up(500)]: {
        right: 20
      }
    },
    '@global .image-gallery-left-nav': {
      left: 0,
      [theme.breakpoints.up(500)]: {
        left: 20
      }
    },
    '@global .image-gallery-left-nav .image-gallery-svg, .image-gallery-right-nav .image-gallery-svg': {
      width: 30,
      height: 60
    },
    '@global .image-gallery-fullscreen-button': {
      right: 30,
      [theme.breakpoints.up(500)]: {
        right: 30
      }
    },
    '@global .image-gallery-fullscreen-button .image-gallery-svg, .image-gallery-play-button .image-gallery-svg': {
      width: 24,
      height: 24
    },
    '@global .false-play-button': {
      position: 'relative',
      '&::after': {
        position: 'absolute',
        content: '""',
        top: '37%',
        left: '42%',
        width: 0,
        height: 0,
        borderTop: '12.5px solid transparent',
        borderBottom: '12.5px solid transparent',
        borderLeft: '20px solid white'
      }
    }
  }
})
);

export default useStyles;