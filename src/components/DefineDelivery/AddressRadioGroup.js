import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  RadioGroup,
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  CardContent,
  FormControlLabel,
  Radio,
  Card, ThemeProvider
} from '@material-ui/core';
import useStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';

const AddressRadioGroup = (props) => {
  const {adr, submitRadioGroupHandler} = props;

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
      <Card>
        <CardContent>
          <Formik
            initialValues={initFormValues}
            validationSchema={validateObject}
            onSubmit={submitRadioGroupData}>
            {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
              <Form autoComplete='off' id='addressRadioGroup'>
                <FormControl>
                  <RadioGroup id='radioGroup' value={values.radioGroup} name='formAddress'
                    onChange={handleChange}>
                    <FormControlLabel value={adr} name='radioGroup' id='radioOption1' color='default'
                      control={<Radio/>} label='Address 1'/>
                    <FormControlLabel value={adr} name='radioGroup' id='radioOption2' color='default'
                      control={<Radio/>} label='Address 2'/>
                  </RadioGroup>
                  <FormHelperText>{errors.radioGroup}</FormHelperText>
                  <CardActions>
                    <Button
                      type='submit'
                      className={styles.button}
                      size='large'
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      variant='outlined'>
                    </Button>
                  </CardActions>
                </FormControl>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default React.memo(AddressRadioGroup);