import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed  p-6 flex flex-col border-l-2   right-0 h-screen w-80">
      <div>
        <Textarea
          className="h-40 m-3 -mt-2 bg-gray-800 text-lg text-white placeholder:text-center placeholder:justify-center"
          placeholder="Add link of the song "
        />
      </div>
      <Button className="bg-white ml-3 w-full text-black">
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
