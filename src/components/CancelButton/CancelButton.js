import React from 'react';
import useStyles from '../../styles/formStyle/formStyle';

import Button from '@material-ui/core/Button';

const CancelButton = (props) => {
  const {handleSubmit} = props;
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      type='submit'
      onClick={handleSubmit}
      size='large'
      variant='outlined'>
        Cancel
    </Button>
  );
};
export default React.memo(CancelButton);