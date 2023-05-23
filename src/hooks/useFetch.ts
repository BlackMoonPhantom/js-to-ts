import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

export const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse<T> = await axios.get(`${baseURL}${url}`);
        setData(response.data);
      } catch (error) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};