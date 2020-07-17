import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CardActions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import useStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';
import {connect} from 'react-redux';
import {saveUserData, setUserDeliveryAddress} from '../../redux/actions/user';
import CloseIcon from '@material-ui/icons/Close';
import {setCompletedSteps, setSnackMessage} from '../../redux/actions/actions';
import globalConfig from '../../globalConfig';

const initFormValues = {
  radioGroup: ''
};
const validateObject = Yup.object({
  radioGroup: Yup.string()
    .required('Please, choose one of these options')
});

const AddressRadioGroup = (props) => {
  const {
    addresses = [], setUserDeliveryAddress, user,
    saveUserData, setSnackMessage, isAccount, setCompleted, activeStep
  } = props;

  const submitRadioGroupData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    setCompleted(activeStep);
    setUserDeliveryAddress(values.radioGroup, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const styles = useStyles();

  const adrList = addresses.map((address) => {
    let str = '';
    for (const [key, value] of Object.entries(address)) {
      if (key !== '_id') {
        str += `${key}: ${value}, `;
      }
    }
    return str.slice(0, -2);
  });

  const removeAddress = (addresses, index) => {
    const newAddresses = addresses.filter((el, i) => i !== index);

    const data = {
      id: user._id,
      addresses: newAddresses
    };

    saveUserData(data, (result) => {
      if (result && result.status === 200) {
        setSnackMessage(true, 'Your addresses are updated', globalConfig.snackSeverity.SUCCESS);
      } else {
        setSnackMessage(true, result.statusText, globalConfig.snackSeverity.ERROR);
      }
    });
  };

  const radioBtns = adrList.map((tag, index) => {
    return <FormControlLabel
      className={styles.radioButton1}
      value={`${tag}`}
      key={index}
      name='radioGroup'
      id='radioOption1'
      control={<Radio/>}
      label={<Typography className={styles.text} key={index}>{tag}
        <CloseIcon data-testid='deleteIcon'
          className={styles.closeIconAddress}
          onClick={() => removeAddress(addresses, index)}/> </Typography>}
    />;
  });

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={initFormValues}
        validationSchema={validateObject}
        onSubmit={submitRadioGroupData}>
        {({handleChange, values, handleSubmit, isSubmitting, errors}) => (
          <Form autoComplete='off' id='addressRadioGroup'>
            <FormControl>
              <RadioGroup id='radioGroup'
                value={values.radioGroup}
                name='formAddress'
                onChange={handleChange}>
                {radioBtns}
              </RadioGroup>
              <FormHelperText>{errors.radioGroup}</FormHelperText>
              <CardActions>
                {isAccount
                  ? null
                  : <Button
                    type='submit'
                    className={styles.button}
                    size='small'
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    variant='outlined'>Confirm
                  </Button>}
              </CardActions>
            </FormControl>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

const mapStateToProps = store => {
  return {
    user: store.user,
    activeStep: store.checkout.checkoutSteps.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDeliveryAddress: data => dispatch(setUserDeliveryAddress(data)),
    saveUserData: (data, callback) => dispatch(saveUserData(data, callback)),
    setSnackMessage: (open, message, severity) => dispatch(setSnackMessage(open, message, severity)),
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AddressRadioGroup));