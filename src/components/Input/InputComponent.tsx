import React, { InputHTMLAttributes, useContext } from 'react';

import { convertToOptions } from '../../utils/input';

import { FormContext } from '../../context/FormContext';
import { InputProps } from '../../types/input';

import './InputComponent.scss';

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  details,
  maxLength,
  hidden,
  disabled,
  multiple,
  required,
  options,
  onChange,
}) => {
  const context = useContext(FormContext);

  const defaultValues = context
    ? (context as { [key: string]: string })[name]
    : undefined;

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    type,
    name,
    'aria-label': label,
    onChange: (event) =>
      onChange ? onChange(event) : context?.handleChange(event),
    defaultValue: defaultValues,
    autoComplete: type === 'password' ? 'current-password' : 'off',
    placeholder,
    maxLength,
    hidden,
    disabled,
  };

  const textAreaProps: InputHTMLAttributes<HTMLTextAreaElement> = {
    type,
    name,
    'aria-label': label,
    onChange: (event) => context?.handleChange(event),
    defaultValue: defaultValues,
    autoComplete: type === 'password' ? 'current-password' : 'off',
    placeholder,
    maxLength,
    hidden,
    disabled,
  };

  const selectProps = {
    name,
    multiple,
    required,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      return onChange ? onChange(event) : context?.handleChange(event);
    },
    disabled,
  };

  if (type === 'textarea') {
    return (
      <div className="textarea">
        <label htmlFor={name}>{label}:</label>
        <textarea {...textAreaProps} id="textarea" form="form" />
        {details && <span className="details">{details}</span>}
      </div>
    );
  }

  if (type === 'select') {
    const selectOptions = convertToOptions(defaultValues, options);

    return (
      <div className="select">
        <label htmlFor={name}>{label}:</label>
        <select
          {...selectProps}
          form="form"
          size={multiple ? 4 : 1}
          defaultValue={defaultValues}
        >
          {selectOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              onMouseDown={(e) => {
                e.preventDefault();
                (e.target as HTMLOptionElement).selected = !(
                  e.target as HTMLOptionElement
                ).selected;
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
        {details && <span className="details">{details}</span>}
      </div>
    );
  }

  return (
    <div className={`input ${hidden ? 'hidden' : ''}`}>
      <label htmlFor={name}>{label}:</label>
      <input {...inputProps} />
      {details && <span className="details">{details}</span>}
    </div>
  );
};

export default Input;
