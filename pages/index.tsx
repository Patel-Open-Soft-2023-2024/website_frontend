import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import {axiosMainServerInstance} from "@/libs/axiosInstance";
import useSearchStore from "@/hooks/useSearchStore";
import SearchResults from "@/components/SearchResults";
import useFavorites from "@/hooks/useFavorites";
import useProfiles from "@/hooks/useProfiles";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const sections=await axiosMainServerInstance("/home");
  return {
    props: {
      sections:sections.data as string[]
    },
  };
}

const Home = (props:any) => {
  const sections=props.sections as string[];
  const { data: profiles } = useProfiles();
  const { data: favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  const {query,deepQuery} = useSearchStore();
  console.log("favs",favorites);
  const Browse = (
    <>
      <Billboard />
      <div className="pb-40">
        {sections.map((section)=><MovieList key={section} title={section} />)}
      </div>
    </>
  );
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      {(query||deepQuery)?<SearchResults />: Browse}
    </>
  );
};

export default Home;
