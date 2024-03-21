import React,{useEffect, useState} from 'react';
import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

const useBreakPoints=()=>{
  const breakPoint=()=>[320,480,840,924,1250,1536].reduce((bp,b)=> innerWidth>b?bp+1:bp,0);
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
  }
  const totalCount=data.length;
  const [page,setPage]=useState(1);
  const pageSize=useBreakPoints();
  return (
    <div className="px-12 mt-4 space-y-8">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="relative grid gap-2" style={{gridTemplateColumns:`repeat(${pageSize},1fr)`}}
        >
          {page>1 && (
          <span onClick={()=>setPage(page-1)} className="absolute left-0 -translate-x-full bg-white rounded-md bg-opacity-20 w-20 h-full z-20" tabIndex={0} role="button" aria-label="See more titles"><b className="indicator-icon icon-rightCaret"></b></span>
          )}
          {data.slice((page-1)*pageSize,(page)*pageSize).map((movie,i) => (
            <MovieCard key={movie.id} data={movie} align={i==pageSize-1?"origin-bottom-right":i==0?"origin-bottom-left":"origin-bottom"} />
          ))}
          {(page*pageSize<totalCount) &&(
            <span onClick={()=>setPage(page+1)} className="absolute right-0 translate-x-full bg-white rounded-md bg-opacity-20 w-20 h-full z-20" tabIndex={0} role="button" aria-label="See more titles"><b className="indicator-icon icon-rightCaret"></b></span>
          )}
        </div>
    </div>
  );
}

export default MovieList;
