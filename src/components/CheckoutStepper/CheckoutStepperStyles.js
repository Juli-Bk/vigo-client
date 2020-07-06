import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';

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
  }
}));

export default useStyles;