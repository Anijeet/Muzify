
import Appbar from "./components/Appbar";
import { MdPeopleAlt } from "react-icons/md";
import { signIn } from "next-auth/react";
import HeroSection from "./components/HeroSection";
import Redirect from "./components/Redirect";

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen w-full relative z-0">
      <Redirect/>
      <Appbar/>
      <HeroSection/>
      
      
    </div>
  );
}
