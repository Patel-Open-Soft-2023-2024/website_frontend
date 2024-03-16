import Image from "next/image"
import bgphoto from "../../public/login_background.jpg"
import logo from "../../public/netflix_logo.svg"

export default function AuthLayout({children}){
    return (
        <div className="relative flex h-screen w-screen flx-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Image 
                src={bgphoto} 
                alt="background photo" 
                className="hidden sm:flex sm:object-cover -z-10 brightness-50"
                priority
                fill
            />

            <Image
                src={logo}
                alt="logo"
                height={120}
                width={120}
                priority
                className="absolute left-4 top-4 object-contain md:left-10 md:top-6"
            />
            {children}
        </div>
    )
}