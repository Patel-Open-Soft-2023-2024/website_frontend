'use client'
import React,{useEffect, useRef, useState} from 'react';
import { Movie } from '@/types';
import useMovieList from '@/hooks/useMovieList';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import useSearchStore, { useAutoComplete, useDeepSearch } from '@/hooks/useSearchStore';


// const useBreakPoints=()=>{
//   const breakPoint=()=>[320,480,840,924,1250,1536].reduce((bp,b)=> window.innerWidth>b?bp+1:bp,0);
//   const [count,setCount]=useState(breakPoint());
//   useEffect(()=>{
//     const setDynamicCount=()=> setCount(breakPoint());
//     addEventListener("resize",setDynamicCount,{passive:true});
//     return ()=>removeEventListener("resize",setDynamicCount)
//   },[]);
//   return count;
// }

const SearchResults: React.FC = () => {
const {query,deepQuery} = useSearchStore();
const searchResults = useAutoComplete(query);
// const deepSearchResults = useDeepSearch(deepQuery);
  if(!searchResults) return null;
  return (
    <div className="px-12 mt-4 space-y-8">
        {query},{deepQuery}
        {JSON.stringify(searchResults)}
    </div>
  );
}

export default SearchResults;
