import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  import: Yup.number().required(),
});

export default validationSchema;
