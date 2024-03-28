import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types';

const useMovies = () => {
  const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data :data as Movie[],
    error,
    isLoading
  }
};

export default useMovies;
