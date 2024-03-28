import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
// import StyledPlayer from "@/components/StyledPlayer";
import dynamic from 'next/dynamic'
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

const DynamicStyledPlayer = dynamic(() => import("@/components/StyledPlayer"), {
    ssr: false,
})

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log("index",{ session });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}


const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
      </nav>
      <DynamicStyledPlayer data={{...data,videoUrl:"https://dge8ab9n7stt8.cloudfront.net/Video/sample.m3u8"}}/>
      {/* <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video> */}
    </div>
  )
}

export default Watch;
