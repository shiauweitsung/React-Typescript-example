import { ClassAttributes, InputHTMLAttributes } from 'react';
import { FieldInputProps } from 'formik';

type IInputFieldProps = {
  field: FieldInputProps<string>;
  error?: string | null;
} & InputHTMLAttributes<HTMLInputElement> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;

export const InputField = ({ field, error, ...props }: IInputFieldProps) => {
  return (
    <div>
      <input {...field} {...props} />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;
