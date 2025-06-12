import { createContext } from 'react';

import AppContextProps from '../types/app';

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default AppContext;
