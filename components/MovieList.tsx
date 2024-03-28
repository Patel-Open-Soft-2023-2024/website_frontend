'use client'
import React,{useEffect, useRef, useState} from 'react';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface MovieListProps {
  data: Movie[];
  title: string;
}

const useBreakPoints=()=>{
  const breakPoint=()=>[320,480,840,924,1250,1536].reduce((bp,b)=> window.innerWidth>b?bp+1:bp,0);
  const [count,setCount]=useState(breakPoint());
  useEffect(()=>{
    const setDynamicCount=()=> setCount(breakPoint());
    addEventListener("resize",setDynamicCount,{passive:true});
    return ()=>removeEventListener("resize",setDynamicCount)
  },[]);
  return count;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  } ``
  const rowRef=useRef<HTMLDivElement>(null);
  const totalCount=data.length;
  const [page,setPage]=useState(1);
  const pageSize=useBreakPoints();

  return (
    <div className="px-12 mt-4 space-y-8">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <TransitionGroup>
        <CSSTransition in={page%2==0} timeout={500} classNames="slide" nodeRef={rowRef}>
        <div 
          className="relative grid gap-2" 
          style={{gridTemplateColumns:`repeat(${pageSize},1fr)`}}
          ref={rowRef}
        >
          {page>1 && (
            <span onClick={()=>setPage(page-1)} className="absolute -left-2 -translate-x-full h-full" tabIndex={0} role="button" aria-label="See more titles">
            <img className="w-full h-full aspect-[4/3] object-cover transition delay-[500ms] duration-[200ms] opacity-100 group-hover:opacity-0 rounded-sm" alt="Movie" src={data[(page-1)*pageSize-1]?.poster}></img>
            <button className="absolute top-0 w-full h-full bg-black rounded-sm bg-opacity-50 z-20">
              <ChevronLeftIcon className='absolute right-0 -translate-y-1/2 w-12 h-12 text-white'/>
            </button>
          </span>
          )}
            {data.slice((page-1)*pageSize,page*pageSize).map((movie,i) => (
              <MovieCard key={movie._id} data={movie} align={i==pageSize-1?"origin-bottom-right":i==0?"origin-bottom-left":"origin-bottom"} />
            ))}
          {(page*pageSize<totalCount) &&(
            <span onClick={()=>setPage(page+1)} className="absolute -right-2 translate-x-full h-full" tabIndex={0} role="button" aria-label="See more titles">
              <img className="w-full h-full aspect-[4/3] object-cover transition delay-[500ms] duration-[200ms] opacity-100 group-hover:opacity-0 rounded-sm" alt="Movie" src={data[page*pageSize]?.poster}></img>
              <button className="absolute top-0 w-full h-full bg-black rounded-sm bg-opacity-50 z-20">
                <ChevronRightIcon  className='absolute left-0 -translate-y-1/2 w-12 h-12 text-white'/>
              </button>
            </span>
          )}
        </div>
        </CSSTransition>
        </TransitionGroup>
    </div>
  );
}

export default MovieList;
