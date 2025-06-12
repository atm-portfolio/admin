import { ChangeEvent } from 'react';

export interface OptionProps {
  _id: string;
  name: string;
}

export interface InputProps {
  label: string;
  name: string;
  type:
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'password'
    | 'checkbox'
    | 'radio'
    | 'select';
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  details?: string;
  maxLength?: number;
  hidden?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  required?: boolean;
  options?: OptionProps[] | undefined;
  onChange?: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}
