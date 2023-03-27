import React from 'react'
import "../App.css";
import RS from "../componentes/images1/RS.png";

const Home = () => {
  return (
    <>
    <div className="h">
    <div className="border">

</div>
   <div className="left">
    <h1>WasteConnect India</h1>
    <p>"Linking farmers and <br/> industries for sustainable <br/> waste management"</p>
   </div>

   <div className="right">
      <h2>News/Alerts</h2>
   </div>
   <div className="services">
      <h1>OUR SERVICES</h1>
    </div>
</div>

    <div className="page2">
    
      <div className="outer-box">
       <p>Rental Services</p>
       <div className="line">

       </div>
      </div>
      <div className="inner-box">
      <img src={RS} style={{height:"30rem",width:"38rem"}}></img>
      </div>
    </div>
    </>
  )
}

export default Home