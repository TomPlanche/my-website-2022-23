/**
 * @file use-debounce.ts
 * @description A hook to debounce a value.
 */

// IMPORTS ===================================================================================================  IMPORTS
import {useState, useEffect, SetStateAction, Dispatch} from 'react';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
type T_useDebounce = <Type>(value: Type, delay: number) => [Type, Dispatch<SetStateAction<Type>>]
// END VARIABLES =======================================================================================  END VARIABLES
const useDebounce: T_useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return [debouncedValue, setDebouncedValue]
}

export default useDebounce;

/**
 * End of file src/hooks/use-debounce.ts
 */
