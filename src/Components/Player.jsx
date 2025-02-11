import React, { useContext } from "react";
import { assets } from "../assets/assets";
import{PlayerContext} from '../Context/PlayerContext'
const Player = () => {
  const {track,seekBar,seekBg,playStatus,play,pause,time,previous,next,seekSong,volume,handleVolumeChange,isMuted,toggleMute}=useContext(PlayerContext);
  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex item-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt=""/>
          <img  onClick={previous}className="w-4 cursor-pointer" src={assets.prev_icon} alt=""/>
          {playStatus
          ?<img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt=""/>
        : <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt=""/>
        }
         
          
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt=""/>
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt=""/>
        </div>
        <div className="flex items-center gap-4"> 
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
           <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full"/>
          </div>
          <p>{isNaN(time.totalTime.minute)?"00":time.totalTime.minute}:{isNaN(time.totalTime.second)?"00":time.totalTime.second}</p>
          
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
         <img  className="w-4" src={assets.play_icon} alt=""/>
         <img  className="w-4" src={assets.mic_icon} alt=""/>
         <img  className="w-4" src={assets.queue_icon} alt=""/>
         <img  className="w-4" src={assets.speaker_icon} alt=""/>

           {/* Volume Control */}
         <img onClick={toggleMute} className="w-4 cursor-pointer" src={isMuted ? "/mute1.png" : "/volume.png"} alt=""/> 
 
        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 bg-green-800 h-1 rounded"
        />
         {/* <img  className="w-4" src={assets.volume_icon} alt=""/> */}
         {/* <div className="w-20 bg-slate-50 h-1 rounded">

         </div> */}
         <img  className="w-4" src={assets.mini_player_icon} alt=""/>
         <img  className="w-4" src={assets.zoom_icon} alt=""/>
      </div>
    </div>
  );
};

export default Player;
