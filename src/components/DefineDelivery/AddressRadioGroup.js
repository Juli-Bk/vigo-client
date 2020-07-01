import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  RadioGroup,
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import useStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';
import { connect} from 'react-redux';
import {setUserDeliveryAddress} from '../../redux/actions/user';
import CloseIcon from '@material-ui/icons/Close';

const AddressRadioGroup = (props) => {
  const {addresses, setUserDeliveryAddress} = props;

  const submitRadioGroupData = (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);

    setUserDeliveryAddress(values.radioGroup, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const initFormValues = {
    radioGroup: ''
  };
  const validateObject = Yup.object({
    radioGroup: Yup.string()
      .required('Please, choose one of these options')
  });
  const styles = useStyles();

  const adrList = addresses.map((address) => {
    const tags = [];
    let str = '';
    for (const [key, value] of Object.entries(address)) {
      if (key !== '_id') {
        str += `${key}: ${value}, `;
      }
    }
    tags.push(str);
    return tags;
  });
  const deleteAddress = (tags, tag) => {
    for (let i = tags.length; i--;) {
      if (tags[i] === tag) {
        tags.splice(i, 1);
      }
    }
  };

  // или
  // const removeAddress = (tags, tag) => {
  //   return tags.filter(function (el) { return el !== tag; });
  // };

  const radioBtns = adrList.map((tag, index) => {
    return <FormControlLabel
      className={styles.radioButton1}
      value={`${tag}`}
      key={index}
      name='radioGroup'
      id='radioOption1'
      control={<Radio/>}
      label={ <Typography className={styles.text} key={index}>{tag}
        <CloseIcon data-testid='deleteIcon'
          className={styles.closeIconAddress}
          onClick={deleteAddress}/> </Typography>}
    />;
  });

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={initFormValues}
        validationSchema={validateObject}
        onSubmit={submitRadioGroupData}>
        {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
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
                <Button
                  type='submit'
                  className={styles.button}
                  size='small'
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  variant='outlined'>Save
                </Button>
              </CardActions>
            </FormControl>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDeliveryAddress: data => dispatch(setUserDeliveryAddress(data))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(AddressRadioGroup));