import React, { useState,useEffect,useCallback,useRef } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useVideoStore from "@/hooks/useVideoStore";
import { CSSTransition } from 'react-transition-group';

interface MovieCardProps {
  data: MovieInterface;
  align:string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data,align }) => {
  const router = useRouter();
  const [showVideo,setShowVideo]=useState(false);
  const videoRef=useRef<HTMLVideoElement>(null);
  const { openModal } = useInfoModalStore();
  const {video:videoEl} =useVideoStore();

  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

  const loadVideo=async ()=>{
    if (videoRef!.current && data){
      videoEl && videoEl.pause();
      videoRef.current.play();
      console.log("playing",data.title);
    }
  }
  const discardVideo=async()=>{
    if (videoRef!.current && data){
      videoRef.current.pause();
      console.log("discard",data.title);
      videoEl?.play();
    }
  }
  const info= (
    <>
      <div className="flex flex-row items-center gap-2">
        <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
          <PlayIcon className="text-black w-4 lg:w-5" />
        </div>
        <FavoriteButton movieId={data.id} />
        <div onClick={() => openModal(data?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
          <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-5" />
        </div>
      </div>
      <p className="text-green-400 font-semibold mt-3">
        New <span className="text-white">2023</span>
      </p>
      <div className="flex flex-row mt-2 gap-2 items-center"> 
        <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
      </div>
      <div className="flex flex-row items-center gap-2 mt-2 text-[8px] text-white lg:text-sm">
        <p>{data.genre}</p>
      </div>
    </>
  )
   
  return (
    <div className="group bg-zinc-900 col-span relative">
      <img onMouseEnter={loadVideo} className="w-full aspect-[4/3] object-cover transition duration-[200ms] opacity-100 group-hover:opacity-0 rounded-sm" alt="Movie" src={data?.thumbnailUrl}></img>
      <div onMouseLeave={discardVideo} className={`absolute top-0 left-0 z-10 opacity-0 pointer-events-none invisible sm:visible w-full scale-100 group-hover:-translate-y-[10vh] group-hover:pointer-events-auto group-hover:scale-[1.25] group-hover:opacity-100 transition duration-[300ms] ${align}`}>
        <video ref={videoRef} poster={data?.thumbnailUrl} className="w-full aspect-[4/3] object-cover rounded-t-md cursor-pointer" loop src={data?.videoUrl} preload="none"></video>
        <div className="z-10 bg-neutral-800 p-2 lg:p-4 absolute w-full shadow-md rounded-b-md">
          {info}
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
