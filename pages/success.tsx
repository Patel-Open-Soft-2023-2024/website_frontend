import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {CheckIcon} from '@heroicons/react/24/solid'

import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import dynamic from "next/dynamic";
import { axiosMainServerInstance } from "@/libs/axiosInstance";


const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [redeemKey,setRedeemKey]=useState<string|null>(null);
  const [msg,setMsg]=useState<string|null>(null);

  useEffect(()=>{
    if(typeof window === 'undefined')
        return;
    else{
        const param=new URL(location.href).searchParams.get("redeemKey");
        setRedeemKey(param);
    }
  },[])

  const redeem=()=>{
    axiosMainServerInstance.post("/redeem",{redeemKey}).then((res:any)=>{
        setMsg(res.data.msg);
        router.push("/");
    }).catch((err:any)=> setMsg(err.msg));
  }
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col text-white">
        <h1 className="text-3xl md:text-6xl text-white text-center">Plan Success</h1>
        <div>
            this is redeem key: {redeemKey}
        </div> 
        <button className="font-bold" onClick={redeem}>redeem now</button>
        <div>
            msg:{msg}
        </div>
      </div>
    </div>
  );
}

export default App;
