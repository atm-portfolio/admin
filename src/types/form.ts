import { ChangeEvent } from 'react';

export interface FormContextProps {
  initialValues?: FormValues;
  handleChange: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  [key: string]: FormValues[keyof FormValues] | object;
}

export interface FormValues {
  [key: string]: string | number | boolean | readonly string[] | undefined;
}

export interface FormProps {
  isLoading?: boolean;
  initialValues?: FormValues;
  children: React.ReactNode;
  onSubmit?: (data: {
    [key: string]: string | number | readonly string[] | boolean | undefined;
  }) => void;
}
