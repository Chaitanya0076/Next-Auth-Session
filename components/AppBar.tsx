import Image from "next/image";
import { AppbarAuth } from "./ui/AppBarAuth";

export default function AppBar(){
    return <nav className="flex h-15 backdrop-filter backdrop-blur-lg bg-opacity-80 bg-clip-padding border-b-2 justify-between p-2 items-center">
        <div className="flex justify-center mx-3 items-center">
            <Image src="globe.svg" alt="browser-img" width={20} height={20}/>
            <div className="font-bold mx-3">Browse</div>
        </div>
        <div className="flex justify-center font-bold items-center">
            <a href="/about" className="mx-3 p-2 text-black cursor-pointer">About</a>
            <AppbarAuth/>
        </div>
    </nav>
}