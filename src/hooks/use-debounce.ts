/**
 * @file use-debounce.ts
 * @description A hook to debounce a value.
 */

// IMPORTS ===================================================================================================  IMPORTS
import { useState, useEffect } from 'react';
// END IMPORTS ==========================================================================================   END IMPORTS

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export default useDebounce;

/**
 * End of file src/hooks/use-debounce.ts
 */
