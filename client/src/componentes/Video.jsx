import React from 'react'
import ReactPlayer from "react-player/youtube";
import { useParams } from 'react-router-dom';


const Video = () => {
    const params = useParams();
    console.log("params", params.vdoSrc);
  return (
    <div>
        Video
        {/* return (
    <div className="player-wrapper" style={{}}>
      <ReactPlayer
        url={props.video.vdoSrc}
        controls={true}
        className="react-player"
        width="100%"
        height="100%"
        onDuration={handleDuration}
        onProgress={handleProgress}
        onPlay={handlePlay}
        onPause={handlePause}
      /> */}
    </div>
  );

}

export default Video