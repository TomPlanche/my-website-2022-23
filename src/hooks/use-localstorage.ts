/**
 * @file use-localstorage.ts
 * @description A hook to use localstorage.
 */

import { useState } from 'react';

const useLocalstorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
    setStoredValue(value);
  }

  return [storedValue, setValue];
}

export default useLocalstorage;

/**
 * End of file src/hooks/use-localstorage.ts
 */
