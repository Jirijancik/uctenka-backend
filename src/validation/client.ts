import * as yup from 'yup';

/**
 * Client MODEL Validation Rules
 */
const accountBalance = yup.number().required('Account balance is required.');
const city = yup.string().required('City  is required.');
const country = yup.string().required('Country balance is required.');
const currency = yup.string().required('Currency is required.');
const email = yup.string().required('Email is required.').email('This is invalid email.');
const mobilePhone = yup.number().required('Mobile phone number is required.');
const name = yup.string().required('Name is required.').min(3, 'Last name should have atleast 3 characters.');
const postcode = yup.number().required('Postcode  is required.');
const street = yup.string().required('Street balance is required.');
const unifiedVatNumber = yup.number().required('Unified Vat Number is required.').min(3, 'Last name should have atleast 3 characters.');

// Client Creation Validation Schema
export const ClientCreationRules = yup.object().shape({
  accountBalance,
  city,
  country,
  currency,
  email,
  mobilePhone,
  name,
  postcode,
  street,
  unifiedVatNumber,
});
