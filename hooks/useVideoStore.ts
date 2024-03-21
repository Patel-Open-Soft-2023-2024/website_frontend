import { create } from 'zustand';

export interface VideoStoreInterface {
  title:string;
  video:HTMLVideoElement|null;
  muted:boolean;
  setVideo:(video:HTMLVideoElement,title:string)=>{}
}

const useVideoStore = create<VideoStoreInterface>((set) => ({
  video:null,
  title:"",
  muted:true,
  setVideo:(video: HTMLVideoElement,title) => set({video,title}),
  setMuted:(muted:boolean)=>set({muted})
}));

export default useVideoStore;