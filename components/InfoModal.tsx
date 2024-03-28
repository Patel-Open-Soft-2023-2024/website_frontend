import React, { useCallback, useEffect, useState,useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovie from '@/hooks/useMovie';
import useVideoStore from "@/hooks/useVideoStore";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const {video:videoEl} =useVideoStore();
  const videoRef=useRef<HTMLVideoElement>(null);
  const { movieId } = useInfoModalStore();
  const { data } = useMovie(movieId);
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);
  
  const discardVideo=async()=>{
    if (videoRef!.current && data){
      videoRef.current.pause();
      videoEl?.play();
    }
  }

  const handleClose = useCallback(() => {
    setIsVisible(false);
    discardVideo();
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose,discardVideo]);

  useEffect(()=>{
    if (isVisible && videoRef!.current && data){
      videoEl && videoEl.pause();
      videoRef.current.play();
    }
  },[isVisible,videoRef,data])

  if (!visible || !data) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

          <div className="relative h-96">
            <video ref={videoRef} poster={data?.poster} loop src={data?.previewLink} className="w-full brightness-[60%] object-cover h-[120%] mask-video-gradient" />
            <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?._id} />
                <FavoriteButton movieId={data?._id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">
                New
              </p>
              <p className="text-white text-lg">
                {data?.languages}
              </p>
              <p className="text-white text-lg">
                {data?.genres?.map((genre:string)=><span key={genre} className="mr-2">{genre}</span>)}
              </p>
            </div>
            <p className="text-white text-lg">
              {data?.fullplot}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InfoModal;
