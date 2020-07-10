import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1),
    backgroundColor: colors.borderLight,
    color: colors.fontOncard
  },
  instructions: {
    padding: 20
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  disabled: {
    marginTop: '1.25rem',
    color: colors.fontSecondary,
    fontWeight: 700,
    border: `.125rem solid ${colors.thinLine}`,
    fontFamily: fonts.f2,
    textTransform: 'uppercase'
  }
}));

export default useStyles;