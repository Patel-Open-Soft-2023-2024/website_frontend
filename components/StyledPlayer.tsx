'use client'
import { Movie } from "@prisma/client";
import React, { useRef, useEffect, useState } from "react"
import ReactPlayer from 'react-player';
import { CSSTransition } from "react-transition-group";
import { PauseIcon, PlayIcon ,SpeakerWaveIcon,SpeakerXMarkIcon} from "@heroicons/react/24/solid";
import useIdle from "@/hooks/useIdle";

interface StyledPlayerProps{
    data: Movie;
}
const StyledPlayer:React.FC<StyledPlayerProps>=({data})=>{
    const playerRef = useRef<ReactPlayer>(null);

    const [levels, setLevels] = React.useState([]);
    const [currentLevel, setCurrentLevel] = React.useState<number>(NaN);
    const [man, setMan] = React.useState(0);

    //@ts-ignore
    const onChangeBitrate = (event) => {
        //@ts-ignore
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        if (internalPlayer) {
            // currentLevel expect to receive an index of the levels array
            console.log("change bitrate", event.target.value);
            internalPlayer.currentLevel = event.target.value;
            // do smooth quality transition with hls.js
            // internalPlayer.nextLevel = event.target.value;
            console.log(internalPlayer);
            setCurrentLevel(event.target.value);
            setMan(1);
            // internalPlayer.currentLevel = event.target.value;
        }
    }
      //@ts-ignore
    const handleProgress = (quality) => {
        // console.log({quality});
          //@ts-ignore
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        if (internalPlayer) {
            // currentLevel expect to receive an index of the levels array
            if (man)
                setCurrentLevel(internalPlayer.nextLevel);
            else
                setCurrentLevel(internalPlayer.currentLevel);
        }
        if(playerRef.current){
            const frac=playerRef.current.getCurrentTime()/playerRef.current.getDuration();
            setDuration(playerRef.current.getDuration());
            setProgress(frac);
        }
    }

    const handleLoad = () => {
        //@ts-ignore
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        // console.log({internalPlayer});
        console.log("ready")
        if (internalPlayer) {
            // currentLevel expect to receive an index of the levels array
            setLevels(internalPlayer.levels);
            console.log({ L: internalPlayer.levels })
        }
    }
    
    //Styles
    
    //Controls
    const progressRef = useRef<HTMLInputElement>(null);
    const [progress,setProgress]=useState(0);
    const [duration,setDuration]=useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted,setMuted] = useState(false);
    
    const playbackRates=[0.5,0.75,1,1.25,1.5];
    const [playbackRate,setPlaybackRate]=useState(1);
    
    const [url, setUrl] = useState('');
    
    useEffect(() => {
        console.log('loaded')
        setUrl(data?.videoUrl);
    }, []);
    
    const isIdle = useIdle({timeToIdle: 2000})
    
    const controlRef=useRef(null);
    const [showControls, setShowControls] = React.useState(false);
    
    useEffect(()=>{
        console.log(isIdle);
        setShowControls(!isIdle);
    },[isIdle]);

    const [showBuffering, setShowBuffering] = React.useState(false);
    
    const bufferingRef=useRef(null);
    const BufferComponent=(
        <div className="fixed inset-0 grid place-items-center">
            <span className="loader"></span>
        </div>
    )

    const descRef=useRef(null);
    const DescriptionComponent=( 
        <div ref={descRef} className="fixed inset-0 bg-black bg-opacity-40 z-10 pointer-events-none">
            <div className="absolute left-[10%] top-[40%] ml-12 z-10">
                <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-7xl whitespace-nowrap font-bold drop-shadow-xl">
                  {data?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                  {data?.description}
                </p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 object-cover">
                <CSSTransition
                    in={!playing}
                    delay={2000}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                    nodeRef={descRef}
                >
                    {DescriptionComponent}
                </CSSTransition>
                <CSSTransition
                    in={showBuffering}
                    delay={2000}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                    nodeRef={bufferingRef}
                >
                    {BufferComponent}
                </CSSTransition>
                <ReactPlayer
                    url={url}
                    playing={playing}
                    controls={false}
                    muted={muted}
                    onBuffer={()=>setShowBuffering(true)}
                    onBufferEnd={()=>setShowBuffering(false)}
                    playbackRate={playbackRate}
                    onReady={handleLoad}
                    onError={(e) => console.log(e)}
                    width="100%"
                    height="100%"
                    playIcon={<PlayIcon className="w-6 h-6 text-white"/>}
                    onProgress={handleProgress}
                    ref={playerRef}
                />
                <CSSTransition
                    in={showControls}
                    delay={2000}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                    nodeRef={controlRef}
                >
                <div ref={controlRef} className="absolute w-full p-4 bottom-8 text-white">
                    <div className="flex items-center inset-x-0 gap-2">
                        <input className="flex-1" onInput={(e)=>progressRef.current && setProgress(Number(progressRef.current.value))} onChange={(e)=>playerRef.current && playerRef.current.seekTo(Number(e.target.value))} 
                        ref={progressRef} step={0.001} min={0} max={1} type="range" value={progress}/>
                        <span className="flex-0">{duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                        <button className="w-[50px]" onClick={()=>setPlaying(!playing)}>
                            {
                                playing?
                                <PauseIcon className="w-10  text-white"/>:
                                <PlayIcon className="w-10 text-white" />
                            }
                        </button>
                        <button className="w-[50px]" onClick={()=>setMuted(!muted)}>
                            {
                                muted?
                                <SpeakerXMarkIcon className="w-10 text-white" />:
                                <SpeakerWaveIcon className="w-10 text-white"/>
                            }
                        </button>
                        <h1 className="flex-1 font-bold text-2xl text-center">{data.title}</h1>

                        Quality:
                        <select className="bg-black" onChange={onChangeBitrate} defaultValue={currentLevel||"auto"}>
                            <option disabled value="auto">auto</option>
                            {levels.map(
                                (level, id) => 
                                <option key={id} value={id}>
                                    {/* @ts-ignore */}
                                    {level.bitrate}
                                </option>
                            )}
                        </select>

                        Playback Rate:
                        <select className="bg-black"  onChange={(e)=>setPlaybackRate(Number(e.target.value))} defaultValue={playbackRate}>
                            {playbackRates.map(
                                (rate, id) => 
                                <option key={id} value={rate}>
                                    {rate}
                                </option>
                            )}
                        </select>

                        {/* <span>{progress}</span> */}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default StyledPlayer;