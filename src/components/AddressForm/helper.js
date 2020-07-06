import * as Yup from 'yup';
import config from '../../globalConfig';

export const validateObject = Yup.object().shape({
  autocomplete: Yup.string(),
  house: Yup.string()
    .min(1, 'Enter correct building number')
    .required('Required'),
  apartment: Yup.string()
    .min(1, 'Enter correct apartment number'),
  postalCode: Yup.string()
    .matches(config.postalCode, 'Please, use XXXXX format')
    .required('Required'),
  confirmation: Yup.boolean()
    .oneOf([true], 'Please, accept privacy policy')
});