import * as Yup from 'yup';

export const validateObject = Yup.object().shape({
  autocomplete: Yup.string(),
  address: Yup.object()
    .required('Required'),
  house: Yup.string()
    .min(1, 'Correct building number is a must!')
    .required('Required'),
  apartment: Yup.number()
    .required('Required'),
  confirmation: Yup.boolean()
    .oneOf([true], 'Must Accept Privacy Policy')
});