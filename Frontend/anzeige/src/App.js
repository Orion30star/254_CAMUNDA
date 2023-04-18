import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    anzeigeContent: yup
    .string('Enter your anzeigeContent')
    .min(8, 'anzeigeContent should be of minimum 8 characters length')
    .required('anzeigeContent is required'),
});

const AnzeigeForm = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      anzeigeContent: 'Was ist Ihre Anzeige?',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="anzeigeContent"
          name="anzeigeContent"
          label="anzeigeContent"
          type="anzeigeContent"
          value={formik.values.anzeigeContent}
          onChange={formik.handleChange}
          error={formik.touched.anzeigeContent && Boolean(formik.errors.anzeigeContent)}
          helperText={formik.touched.anzeigeContent && formik.errors.anzeigeContent}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

ReactDOM.render(<AnzeigeForm />, document.getElementById('root'));
export default AnzeigeForm;