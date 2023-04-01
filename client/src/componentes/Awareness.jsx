import React from 'react'
import { useNavigate } from 'react-router-dom';

const Awareness = () => {
    const navigate = useNavigate();

    function youtubeParser(vdoSrc) {
        var regExp =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = vdoSrc.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
      }
      
      function getVideoThumbnail(vdoSrc) {
        const vdoCode = youtubeParser(vdoSrc);
        const vdoThumbnail = `https://img.youtube.com/vi/${vdoCode}/hqdefault.jpg`;
      
        return vdoThumbnail;
      }

      const handleWatch = (vdoSrc)=>{
        navigate(vdoSrc)
      }
      

    
  return (
    <div>
        <h1 style={{color:"green"}}>Be Smart, Be aware.</h1>
        <div className="row">
                
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://youtu.be/jZMUccBbB6Y")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                        <a href={"https://youtu.be/jZMUccBbB6Y"}>Watch</a>
                    </div>
                </div>
            </div>   
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://www.youtube.com/watch?v=a_WCn1xNzik")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://www.youtube.com/watch?v=a_WCn1xNzik"}>Watch</a>
                    </div>
                </div>
            </div>   
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://www.youtube.com/watch?v=yRp4Xv_uifk")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://www.youtube.com/watch?v=yRp4Xv_uifk"}>Watch</a>
                    </div>
                </div>
            </div>   
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://youtu.be/7FKdw5_wQh4")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://youtu.be/7FKdw5_wQh4"}>Watch</a>
                    </div>
                </div>
            </div>   
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://youtu.be/owERgzo9xDA")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://youtu.be/7FKdw5_wQh4"}>Watch</a>
                    </div>
                </div>
            </div>   
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://youtu.be/ymCQWxwatuk")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://youtu.be/ymCQWxwatuk"}>Watch</a>
                    </div>
                </div>
            </div>   
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://youtu.be/6_nWF77HVj0")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://youtu.be/6_nWF77HVj0"}>Watch</a>
                    </div>
                </div>
            </div> 
            <div className="card" style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                <img src={getVideoThumbnail("https://youtu.be/itiokWfoD8A")} className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="btn-toolbar">
                    <a href={"https://youtu.be/itiokWfoD8A"}>Watch</a>
                    </div>
                </div>
            </div> 
              
            </div>

    </div>
  )
}

export default Awareness