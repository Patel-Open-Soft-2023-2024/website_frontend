import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  console.log(data);
  data && (data.previewLink = "https://dge8ab9n7stt8.cloudfront.net/Video/preview_Road_House.mp4")

  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;
