import { useMemo, useEffect, useRef, useState } from 'react';

import AppContext from '../context/AppContext';
import { apiBaseUrl } from '../utils/constants';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const intervalId = useRef<number | null>(null);
  const abortControllerRef = useRef(new AbortController());

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(
    'Please wait while we are waking the server...'
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortControllerRefCurrent = abortControllerRef.current;
    const fetchData = async () => {
      try {
        await fetch(`${apiBaseUrl}/status`, {
          signal: abortControllerRefCurrent.signal,
        });
        setMessage(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Server returned an error... Please refresh this page.');
      }
    };

    fetchData();

    intervalId.current = window.setInterval(() => fetchData(), 600000);

    return () => {
      if (intervalId.current !== null) {
        window.clearInterval(intervalId.current);
      }
      if (abortControllerRefCurrent.signal.aborted) {
        abortControllerRefCurrent.abort();
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      message,
      open,
      setIsLoading,
      setMessage,
      setOpen,
    }),
    [open, message, isLoading]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
