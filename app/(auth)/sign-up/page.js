"use client"
import React from "react";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

export default function SignUp(){
    return (
        <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
            <form>
                <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
                <div className="space-y-4 mt-5">
                    <input 
                        placeholder="Email" 
                        type="email" 
                        className="bg-[#333] placeholder:text-sm w-full inline-block outline-none rounded-sm px-6 py-4 text-gray-500 placeholder-gray-400 "
                    />
                    <button type="submit" className="w-full bg-[#E50914] py-3 px-7 rounded-md font-bold text-lg">Sign Up</button>
                </div>
            </form>
            <div className="text-gray-500 text-sm mt-2">
                Already have an account?{" "}
                <Link href="/login" className="text-white hover:underline">
                    Log in now!
                </Link>
            </div>

            <div className="flex w-full justify-center items-center gap-x-3 mt-6">
                <button className="hover:opacity-50">
                    <Link href="/">
                        <GithubIcon/>
                    </Link>
                </button>
                <button className="hover:opacity-50">
                    <Link href="/">
                        <GithubIcon/>
                    </Link>
                </button>
            </div>
        </div>
    )
}