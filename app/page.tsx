import Image from "next/image";
import Appbar from "./components/Appbar";
import { MdPeopleAlt } from "react-icons/md";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen w-full relative z-0">
      <div className="ml-10 absolute top-0 left-1/3 -translate-x-1/3 w-[70%] h-[50vh] bg-gradient-to-b from-green-600 to-slate-400 rounded-b-full shadow-2xl shadow-black  backdrop-blur-lg flex flex-col justify-center items-center">
      <div className="text-white bg-black p-2 rounded-2xl text-md ">
        <span className="bg-white text-black px-2 rounded-lg  items-center">new</span> <span>Latest Algorithm just arrived</span>
      </div>
        <div className="text-4xl font-serif mt-8">Let's Your Fans Create the Environment</div>
        <div className="flex flex-col justify-center items-center mt-2 text-sm font-mono">
          <span>Empower your audience to curate your music stream</span>
          <span>Connect with fans like never before</span>
        </div>
        <div className="-mb-16 mt-5 ">
          <button className='p-2 mr-3 rounded-lg bg-gradient-to-b from-slate-500 via-green-400 to-green-600 text-lg font-semibold border-2 border-green-800 ' >Sign Up</button>
          <button className='p-2 bg-white text-black text-lg font-semibold border-2 border-green-800 hover:bg-gray-300 transition-all duration-300 rounded-lg '>Learn More</button>
        </div>
      </div>

      <div className="pt-[500px] flex flex-col text-white justify-center items-center ">
        <h1 className="text-2xl font-bold">Key Features</h1>
        <div className="flex gap-40 mt-10">
          <div className="flex mt-8 flex-col items-center">
            <span className="text-yellow-500 text-5xl" ><MdPeopleAlt/></span>
            <span className="text-lg font-semibold">Fan Interaction</span>
            <span className="text-sm ">Lets Fan choose there music</span>
          </div>
          <div className="flex mt-8 flex-col items-center">
            <span className="text-yellow-500 text-5xl" ><MdPeopleAlt/></span>
            <span className="text-lg font-semibold">Ultra Music Experience</span>
            <span className="text-sm ">Lets Fan choose there music</span>
          </div>
          <div className="flex mt-8 flex-col items-center">
            <span className="text-yellow-500 text-5xl" ><MdPeopleAlt/></span>
            <span className="text-lg font-semibold">Fan Interaaction</span>
            <span className="text-sm ">Lets Fan choose there music</span>
          </div>
        </div>
      </div>
      
      <Appbar/>
    

      
    </div>
  );
}
