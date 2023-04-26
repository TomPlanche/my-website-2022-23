/**
 * @file useFetch.ts
 * @description A custom hook to fetch data from an API.
 */

// IMPORTS ===================================================================================================  IMPORTS
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// END IMPORTS ==========================================================================================   END IMPORTS

const useFetch = (url: string) => {
  // States
  const [fetchedData, setFetchedData] = useState<object>({
    data: [],
    isLoading: true,
    error: false,
  });

  const cancelToken = axios.CancelToken.source();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url, { cancelToken: cancelToken.token });

      const data = await response.data;

      if (data) {
        setFetchedData({
          data: data.results ? data.results : data,
          isLoading: false,
          error: false
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        setFetchedData({ data: [], isLoading: false, error: true });
      }

      setFetchedData({ data: [], isLoading: false, error: true });
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {
      cancelToken.cancel();
    };
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;

  return { data, isLoading, error };
}

export default useFetch;

/**
 * End of file src/hooks/use-fetch.ts
 */
