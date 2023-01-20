import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('name required'),
  email: Yup.string().email('invalid email').required('email required'),
  password: Yup.string()
    .required('password required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'wrong password format',
    ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email required'),
  password: Yup.string().required('password required'),
});

export const addArtValidation = Yup.object().shape({
  title: Yup.string().required('title required'),
  description: Yup.string().required('description required'),
  image: Yup.string().required('image required'),
  category: Yup.string().required('category required'),
  subject: Yup.string().required('subject required'),
  medium: Yup.string().required('Medium required'),
  color: Yup.string().required('color required'),
  price: Yup.number().min(1, 'price required').required('price required'),
  size: Yup.object().shape({
    width: Yup.number().required('width required'),
    height: Yup.number().required('height required'),
  }),
});
