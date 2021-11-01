import * as yup from 'yup';

/**
 * USER MODEL Validation Rules
 */

const firstName = yup
  .string()
  .required('First Name is required.')
  .min(3, 'First name should have atleast 3 characters.');

const lastName = yup.string().required('Last name is required.').min(3, 'Last name should have atleast 3 characters.');

const email = yup.string().required('Email is required.').email('This is invalid email.');

const password = yup
  .string()
  .required('Password is required.')
  .min(5, 'Password should have atleast 5 characters.')
  .max(256, 'Password should have atmost 256 characters.');

// User Registeration Validation Schema
export const UserRegisterationRules = yup.object().shape({
  email,
  firstName,
  lastName,
  password,
});

// User Authentication Validation Schema
export const UserAuthenticationRules = yup.object().shape({
  email,
  password,
});
