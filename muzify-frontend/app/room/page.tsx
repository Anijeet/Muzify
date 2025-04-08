/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight, Music, Plus, Sparkles } from "lucide-react";
import AudioVisualizer from "@/components/fancy/AudioVisulalizer";
import Navbar from "../components/Navbar";

const generateRoomId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let roomId = "";
  for (let i = 0; i < 9; i++) {
    if (i > 0 && i % 3 === 0) {
      roomId += "-";
    }
    roomId += characters[Math.floor(Math.random() * characters.length)];
  }
  return roomId;
};

const formatRoomId = (input: string) => {
  const cleanInput = input.replace(/-/g, "").slice(0, 9);
  return cleanInput.match(/.{1,3}/g)?.join("-") || "";
};

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const Page = () => {
  const [createRoomId, setcreateRoomId] = useState("");
  const [joinRoom, setJoinRoom] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  async function jointheRoom(joinRoomId: string) {
    if (!joinRoomId) {
      alert("Room ID cannot be empty!");
      return;
    }
    setIsJoining(true);
    // Simulate a short delay to show loading state
    setTimeout(() => {
      router.push(`/room/${joinRoomId}`);
    }, 500);
  }

  async function createtheRoom(createRoomId: string) {
    if (!createRoomId) {
      alert("Room ID cannot be empty!");
      return;
    }
    setIsCreating(true);
    try {
      const res = await axios.post("/api/room/create", {
        roomId: createRoomId,
      });
      if (!res) {
        console.log("Error while creating room");
      }
      router.push(`/room/${createRoomId}`);
    } catch {
      console.log("Error while creating room");
      setIsCreating(false);
    }
  }

  const buttonClasses = "relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-2 text-lg font-medium group/btn sm:w-auto w-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300";
  const buttonOverlayClasses = "absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300";

  return (
    <>
      <Navbar />
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 md:p-8"
         style={{
           background: 'linear-gradient(to bottom, #121212, #1a1a1a, #191414)'
         }}>
      <AudioVisualizer />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>
      </div>

      <motion.div 
        className="w-full flex flex-col items-center max-w-lg mx-auto space-y-8 md:space-y-2 relative z-10 px-4 sm:px-0"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="mt-14 text-center space-y-4 mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-funnel animate-neon text-white pb-2 leading-none lg:leading-none tracking-wider whitespace-nowrap">
            Music <span className="text-green-500">Stream</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-wider">
            Create or join your sonic experience
          </p>
        </div>

        <div className="space-y-12 w-full">
          <div className="group bg-black/50 backdrop-blur-lg p-6 rounded-3xl border border-green-900/20 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10">
            <h2 className="font-funnel text-2xl md:text-3xl text-white mb-6 flex items-center gap-3 group-hover:text-green-400 transition-colors duration-300">
              <Music className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              Join Room
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={joinRoom}
                  onChange={(e) => setJoinRoom(formatRoomId(e.target.value))}
                  placeholder="abc-def-ghi"
                  maxLength={11}
                  className="w-full bg-black/70 font-funnel backdrop-blur-xl border-2 border-green-900/30 rounded-2xl px-6 py-4 text-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500/50 focus:bg-black/80 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
              <button 
                className={`${buttonClasses} ${isJoining ? 'cursor-wait opacity-80' : ''}`} 
                onClick={() => jointheRoom(joinRoom)}
                disabled={isJoining}
              >
                <span className="relative z-10">{isJoining ? 'Joining...' : 'Join'}</span>
                {!isJoining && <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />}
                {isJoining && <div className="relative z-10 w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin ml-1"></div>}
                <div className={buttonOverlayClasses}></div>
              </button>
            </div>
          </div>

          <div className="group bg-black/50 backdrop-blur-lg p-6 rounded-3xl border border-green-900/20 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10">
            <h2 className="font-funnel text-2xl md:text-3xl text-white mb-6 flex items-center gap-3 group-hover:text-green-400 transition-colors duration-300">
              <Sparkles className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              Create Room
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
              <div className="relative flex-1 flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={createRoomId}
                    onChange={(e) => setcreateRoomId(formatRoomId(e.target.value))}
                    placeholder="abc-def-ghi"
                    className="w-full bg-black/70 font-funnel backdrop-blur-xl border-2 border-green-900/30 rounded-2xl px-6 py-4 text-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500/50 focus:bg-black/80 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
                <button 
                  onClick={() => setcreateRoomId(generateRoomId())}
                  className="aspect-square w-[60px] h-[60px] bg-black/70 backdrop-blur-xl border-2 border-green-900/30 rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:border-green-500/50 hover:scale-105 transition-all duration-300"
                >
                  <Plus size={24} className="text-green-400 transition-transform group-hover:rotate-180 duration-300" />
                </button>
              </div>
              <button 
                onClick={() => createtheRoom(createRoomId)} 
                className={`${buttonClasses} ${isCreating ? 'cursor-wait opacity-80' : ''}`}
                disabled={isCreating}
              >
                <span className="relative z-10">{isCreating ? 'Creating...' : 'Create'}</span>
                {!isCreating && <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />}
                {isCreating && <div className="relative z-10 w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin ml-1"></div>}
                <div className={buttonOverlayClasses}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-green-500/5 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-green-500/5 blur-3xl"></div>
        
        {/* Sound Wave Decoration */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-green-500 rounded-full"
              style={{
                height: `${Math.sin(i * 0.5) * 15 + 20}px`,
                animationDelay: `${i * 0.1}s`,
                animation: 'soundWave 1.5s ease-in-out infinite'
              }}
            ></div>
          ))}
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes soundWave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-neon {
          text-shadow: 0 0 10px rgba(30, 215, 96, 0.5), 
                       0 0 20px rgba(30, 215, 96, 0.3), 
                       0 0 30px rgba(30, 215, 96, 0.1);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
    </>
  );
};

export default Page;