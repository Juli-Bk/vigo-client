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
  ThemeProvider
} from '@material-ui/core';
import useStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';

const AddressRadioGroup = (props) => {
  const {value, submitRadioGroupHandler} = props;

  const submitRadioGroupData = (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);

    submitRadioGroupHandler(values, () => {
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

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={initFormValues}
        validationSchema={validateObject}
        onSubmit={submitRadioGroupData}>
        {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
          <Form autoComplete='off' id='addressRadioGroup'>
            <FormControl>
              <RadioGroup id='radioGroup' value={values.radioGroup} name='formAddress'
                onChange={handleChange}>
                <FormControlLabel value={value} name='radioGroup' id='radioOption1' color='default'
                  control={<Radio/>} label={value}/>
                <FormControlLabel value={value} name='radioGroup' id='radioOption2' color='default'
                  control={<Radio/>} label='Address 2'/>
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
export default React.memo(AddressRadioGroup);