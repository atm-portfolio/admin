import { createContext } from 'react';

import { FormContextProps } from '../types/form';

export const FormContext = createContext<FormContextProps | undefined>(
  undefined
);
