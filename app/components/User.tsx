"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";

const User = () => {
  interface Stream {
    smallImg: string;
    url:string;
    userId:string;
    title:string;
    upvotes:number;
    haveUpvoted:boolean;
    id:string;
    
  }

  const [streams, setStreams] = useState<Stream[]>([])
  const [loading,setLoading]=useState(false)
  

  const INTERVAL_MS=1*1000

  async function refershStream(){
    
    const res= await axios.get('api/streams/my')
    console.log('data',res.data.streams)
    setStreams(res.data.streams)
    // console.log('streams',streams)
  }

  useEffect(() => {
    console.log('Updated streams:', streams);
}, [streams]);
  

  useEffect(()=>{
    refershStream();
    const interval= setInterval(() => {
      refershStream();
    }, INTERVAL_MS);
   
  },[])

  async function handleVote(id:string,isUpvote:boolean){
    await fetch(`/api/streams/${isUpvote ? "upvote" :"downvote" }`,{
      method:'POST',
      body:JSON.stringify({
        streamId:id
      })
    })
    refershStream()
  }
  

  return (
    <div className="ml-40 pt-5">
      <div className=" flex gap-40 text-white">
        <div className=" bg-gray-800 flex flex-col justify-center w-[500px] rounded-2xl p-3">
          <div className="flex text-white">
            <img
              className="h-20 rounded-2xl w-30"
              src="https://tse1.mm.bing.net/th?id=OIP.-8xk3avY6rXn2E0RgB0x-AHaFj&pid=Api&P=0&h=180"
              alt="my img..."
            />
            <div className="flex items-center justify-between w-80 ml-3">
              <div className="flex flex-col">
                <div className="text-lg font-semibold">Song of the day</div>
                <div className="text-lg">Untitled</div>
              </div>
              <div>
                <Button className="px-5 py-2 border-2 border-gray-500 hover:bg-gray-700">
                  Pay again
                </Button>
              </div>
            </div>
          </div>
          <div className="text-white mt-3 flex flex-col justify-center items-center">
            <h1 className="text-lg ">Up Votes</h1>
            <h1 className="text-sm text-gray-400">1000</h1>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-lg font-serif text-center flex">Top 2 upvoted</h1>
          <div className="gap-3 flex flex-col">
            <div className="flex text-white bg-slate-800 pr-32 rounded-xl p-3">
              <img
                className="h-16 rounded-2xl w-24"
                src="https://tse1.mm.bing.net/th?id=OIP.-8xk3avY6rXn2E0RgB0x-AHaFj&pid=Api&P=0&h=180"
                alt="my img..."
              />
              <div className="flex flex-col justify-center ml-3">
                <div className="text-lg">Untitled</div>
                <div className="text-sm text-gray-400">KR$NA</div>
              </div>
            </div>
            <div className="flex text-white bg-slate-800 pr-32 rounded-xl p-3">
              <img
                className="h-16 rounded-2xl w-24"
                src="https://tse1.mm.bing.net/th?id=OIP.-8xk3avY6rXn2E0RgB0x-AHaFj&pid=Api&P=0&h=180"
                alt="my img..."
              />
              <div className="flex flex-col justify-center ml-3">
                <div className="text-lg">Untitled</div>
                <div className="text-sm text-gray-400">KR$NA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 border-2 border-gray-600 bg-slate-800 rounded-2xl mt-5 w-[970px]">
        <h1 className="text-white p-3">Queue Songs</h1>
        {streams.map((stream)=>(
          <div className="flex border-b-2 p-3 border-gray-700">
          <div className="flex  text-white">
            <img
              className="h-10 rounded-2xl w-14"
              src={stream.smallImg}
              alt="my img..."
            />
            <div className="flex w-[700px] flex-col justify-center ml-3">
              <div className="text-md">{stream.title.split(/[-\/:]/)[0]}</div>
              <div className="text-sm text-gray-400">{stream.title.split(/[-\/:]/)[1]}</div>
            </div>
          </div>
          <div className="flex  items-center justify-center gap-2">
            {/* <h1 className="text-sm text-gray-300">{stream.upvotes}</h1> */}
            <Button onClick={()=>{handleVote(stream.id,stream.haveUpvoted ? false : true)}} className="bg-white text-black text-md hover:bg-gray-300 flex items-center">
             { stream.haveUpvoted? <BiDislike /> : <AiOutlineLike /> }
            </Button>
            {/* <Button onClick={downvote} className="bg-white text-black text-md hover:bg-gray-300 flex items-center">
              <BiDislike />
            </Button> */}
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default User;
