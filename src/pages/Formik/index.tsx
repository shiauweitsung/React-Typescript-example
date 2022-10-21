import React from 'react';
import { useFormik } from 'formik';
import InputField from 'components/InputField';
import validationSchema from './validate';

const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      import: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { errors, touched } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        type="text"
        field={formik.getFieldProps('import')}
        onChange={(e) => {
          formik.setFieldValue('import', e.target.value);
        }}
        value={formik.values.import}
        error={touched.import && errors.import ? errors.import : null}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={(e) => {
          formik.setFieldValue('firstName', e.target.value);
        }}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormikForm;
