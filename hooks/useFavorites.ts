import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types';

const useMovies = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data :data as Movie[],
    error,
    isLoading,
    mutate
  }
};

export default useMovies;
