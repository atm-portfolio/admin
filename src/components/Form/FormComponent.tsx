import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form as RouterForm, useActionData } from 'react-router-dom';

import { FormProps, FormValues } from '../../types/form';
import { FormContext } from '../../context/FormContext';
import stateProvider from '../../utils/state';

import './FormComponent.scss';

const Form: React.FC<FormProps> = ({
  initialValues = {},
  children,
  onSubmit,
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length !== 0) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    if (event && 'target' in event) {
      const target = event.target as HTMLInputElement;
      setValues({ ...values, [target.name]: target.value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(values);
    }
  };

  const actionData = useActionData() as { error: string } | undefined;

  const isEmpty = Object.entries(values).every(([, value]) =>
    Array.isArray(value) ? value.length === 0 : value === ''
  );

  return (
    <FormContext.Provider value={{ ...values, handleChange }}>
      {!onSubmit ? (
        <RouterForm method="POST" id="form" replace>
          {children}
          <button
            className="submit"
            type="submit"
            disabled={isEmpty || stateProvider.isLoading}
          >
            Submit
          </button>
          {actionData && actionData.error ? (
            <p id="form-error" style={{ color: 'red' }}>
              {actionData.error}
            </p>
          ) : null}
        </RouterForm>
      ) : (
        <form onSubmit={handleSubmit} id="form">
          {children}
          <button
            className="submit"
            type="submit"
            disabled={isEmpty || stateProvider.isLoading}
          >
            Submit
          </button>
        </form>
      )}
    </FormContext.Provider>
  );
};

export default Form;
