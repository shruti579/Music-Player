import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider=(props)=>{

    const audioRef=useRef();

    const seekBg=useRef();
    const seekBar=useRef();

    const [track,setTrack]=useState(songsData[1]);
    const [playStatus,setPlayStatus]=useState(false);
    const [time,setTime]=useState({
        currentTime:{
            second:"0",
            minute:"0"
        },
        totalTime:{
            second:"0",
            minute:"0"
        }
        
     })

    const play=()=>{
        audioRef.current.play();
        setPlayStatus(true) 
    } 
    const pause=()=>{
        audioRef.current.pause();
        setPlayStatus(false) 
    } 

    const playWithId= async(id)=>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }   

    const previous= async(id)=>{
        if(track.id>0){
            await setTrack(songsData[track.id-1])
            await audioRef.current.play()
            setPlayStatus(true);
        }
    }

    const next= async(id)=>{
        if(track.id< songsData.length-1){
            await setTrack(songsData[track.id+1])
            await audioRef.current.play()
            setPlayStatus(true);
        }
    }

    const seekSong= async(e)=>{
       // console.log(e)
        audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth*audioRef.current.duration))

    }



    useEffect(()=>{
        setTimeout(() => {
            
            audioRef.current.ontimeupdate=()=>{
                seekBar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"

                setTime({ 
                    currentTime:{
                    second: Math.floor(audioRef.current.currentTime%60),
                    minute: Math.floor(audioRef.current.currentTime/60)
                },
                totalTime:{
                    second: Math.floor(audioRef.current.duration%60),
                    minute: Math.floor(audioRef.current.duration/60)
                }
                
            })
            }
        }, 1000);
    },[audioRef])


    //VOLUME CONTROL 

    const [volume, setVolume] = useState(1); // Default volume is 1 (100%)
    const [isMuted, setIsMuted] = useState(false); // Default is not muted

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (!isMuted) {
          audioRef.current.volume = newVolume;
        }
    }

    const toggleMute = () => {
        if (isMuted) {
          setIsMuted(false);
          audioRef.current.volume = volume; // Restore previous volume
        } else {
          setIsMuted(true);
          audioRef.current.volume = 0; // Mute the audio
        }
      };

    const contextValue={
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        volume,
        handleVolumeChange,
        isMuted,
        toggleMute
     }

     return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
     )
}

export default PlayerContextProvider;