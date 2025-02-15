import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const Sidebar = () => {
  const [inputLink,setInputLink]=useState("")
  const [loading,setLoading]=useState(false)


  async function addSong(e:React.FormEvent){
    if(inputLink.length===0){
      alert("Please enter a link")
    }
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/streams',{
      method: 'POST',
      body: JSON.stringify({
        creatorId:"b8637442-9bdb-44e1-aad2-5b1fba0b63c7",
        url:inputLink
      })
    })
    setLoading(false)
    setInputLink('')
  }

  return (
    <div className="fixed  p-6 flex flex-col border-l-2   right-0 h-screen w-80">
      <div>
        <Textarea value={inputLink} onChange={(e)=>{setInputLink(e.target.value)}}
          className="h-40 m-3 -mt-2 bg-gray-800 text-lg text-white placeholder:text-center placeholder:justify-center"
          placeholder="Add link of the song "
        />
      </div>
      <Button onClick={addSong} className={`bg-white ml-3 w-full hover:bg-gray-300 text-black ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
        Add to the queue
      </Button>
      <h1 className="text-lg text-white font-semibold m-3">Now Playing</h1>
      <div className=" bg-gray-800 rounded-2xl p-3">
        <div className="flex text-white">
          <img
            className="h-20 rounded-2xl w-30"
            src="https://tse1.mm.bing.net/th?id=OIP.-8xk3avY6rXn2E0RgB0x-AHaFj&pid=Api&P=0&h=180"
            alt="my img..."
          />
          <div className="flex flex-col justify-center ml-3">
            <div className="text-lg">Untitled</div>
            <div className="text-sm text-gray-400">KR$NA</div>
          </div>
        </div>
        <div className="text-white border-t-2 border-gray-500 mt-3 flex flex-col justify-center items-center">
          <h1 className="text-lg ">Up Votes</h1>
          <h1 className="text-sm text-gray-400">1000</h1>
        </div>
      </div>
      <h1 className="text-lg text-white font-semibold m-3">Most upvoted for next</h1>
      <div className="flex bg-gray-800 rounded-2xl p-3 items-center justify-center">
        <img className="h-40 rounded-2xl w-52" src="https://tse1.mm.bing.net/th?id=OIP.-8xk3avY6rXn2E0RgB0x-AHaFj&pid=Api&P=0&h=180" alt="" />
      </div>
      
    </div>
  );
};

export default Sidebar;
