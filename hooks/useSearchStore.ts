import { create } from 'zustand';
import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

export interface SearchStoreInterface{
    query:string;
    deepQuery:string;
    setDeepQuery:(query:string)=>void;
    setQuery:(query:string)=>void;
}

const timeout=null;
const useSearchStore = create<SearchStoreInterface>((set) => ({
    query :"",
    deepQuery:"",
    setQuery:(query:string)=>{
        set({query})
        timeout && clearTimeout(timeout);
        setTimeout(()=>set({deepQuery:query}),300)
    },
    setDeepQuery:(deepQuery:string)=>set({deepQuery}),
}));

export const useAutoComplete= (query:string)=>{
    const { data, error, isLoading } = useSwr(`/api/search/autocomplete/${query}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data :data as Autocomplete[],
        error,
        isLoading
      }
}
export const useDiverseSearch= (query:string)=>{
    const { data, error, isLoading } = useSwr(`/api/search/fast/${query}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data :data as DiverseSearch[],
        error,
        isLoading
      }
}
export const useDeepSearch= (query:string)=>{
    const { data, error, isLoading } = useSwr(`/api/search/deep/${query}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data :data as SemanticSearch[],
        error,
        isLoading
      }
}

export default useSearchStore;