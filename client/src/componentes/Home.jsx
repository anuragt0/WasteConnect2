import React from 'react'
import "../App.css";
import RS from "../componentes/images1/RS.png";
import SP from "../componentes/images1/SP.png";
import BP from "../componentes/images1/BP.png";
import WR from "../componentes/images1/WR.png";
import fb from "../componentes/images1/facebook.png";
import insta from "../componentes/images1/instagram.png";
import twit from "../componentes/images1/twitter.png";
import location from "../componentes/images1/location.png";
import gmail from "../componentes/images1/gmail.png";
import phone from "../componentes/images1/phone.png";
import "../css/contact.css";

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
       <p className="hed">Sell Your Product</p>
       <div className="line">
       </div>
       <p className="desc">Farm direct marketing involves selling a <b/>product from the farm <br/>directly to customers. Often,<br/> the farmer receives a price similar to what <br/>the grocery store charges. This method of <br/>marketing is more entrepreneurial or business-like<br/> than wholesale marketing.<br/>This method of marketing is more entrepreneurial<br/> or business-like than wholesale marketing.</p>
       <div className="btn">
        Check It
       </div>
      </div>
      <div className="inner-box">
      <img src={SP} style={{height:"30rem",width:"38rem"}}></img>
      </div>
    </div>
    <div className="page3">
    
      <div className="outer-box">
       <p className="hed">Buy Your Product</p>
       <div className="line">
       </div>
       <p className="desc1">Farm direct marketing involves selling a <b/>product from the farm <br/>directly to customers. Often,<br/> the farmer receives a price similar to what <br/>the grocery store charges. This method of <br/>marketing is more entrepreneurial or business-like<br/> than wholesale marketing.<br/>This method of marketing is more entrepreneurial<br/> or business-like than wholesale marketing.</p>
       <div className="btn">
        Check It
       </div>
      </div>
      <div className="inner-box">
      <img src={BP} style={{height:"30rem",width:"38rem"}}></img>
      </div>
    </div>
    <div className="page2">
    
      <div className="outer-box">
       <p className="hed">Find Machines Around You</p>
       <div className="line">
       </div>
       <p className="desc">Farm direct marketing involves selling a <b/>product from the farm <br/>directly to customers. Often,<br/> the farmer receives a price similar to what <br/>the grocery store charges. This method of <br/>marketing is more entrepreneurial or business-like<br/> than wholesale marketing.<br/>This method of marketing is more entrepreneurial<br/> or business-like than wholesale marketing.</p>
       <div className="btn">
        Check It
       </div>
      </div>
      <div className="inner-box">
      <img src={RS} style={{height:"30rem",width:"38rem"}}></img>
      </div>
    </div>
    <div className="page3">
    
      <div className="outer-box">
       <p className="hed">Get Latest Weather Updates</p>
       <div className="line">
       </div>
       <p className="desc1">Farm direct marketing involves selling a <b/>product from the farm <br/>directly to customers. Often,<br/> the farmer receives a price similar to what <br/>the grocery store charges. This method of <br/>marketing is more entrepreneurial or business-like<br/> than wholesale marketing.<br/>This method of marketing is more entrepreneurial<br/> or business-like than wholesale marketing.</p>
       <div className="btn">
        Check It
       </div>
      </div>
      <div className="inner-box">
      <img src={WR} style={{height:"30rem" ,    width:"38rem"}}></img>
      </div>
    </div>
    <div className="block">
     <h1>Contact Us</h1> 
    </div>
    <div className="page4" id='contact'>
      <section className="contactS" >
    <div className="container4">
        <div className="contactinfo">

            <h2 className="h2c">Contact Us</h2>
            <ul className="info">
              <li>
                <span><img src={location}/></span>
                <span>Address
            </span>
              </li>
              <li>
                <span><img src={gmail}/></span>
                <span>ngo123@gmail.com</span>
              </li>
              <li>
                <span><img src={phone}/></span>
                <span>+91 1234567890</span>
              </li>
            </ul>

            <ul className="social1">
              <li>
                <a href="#">
                  <img src={fb}  style={{height:"40.5px", width:"40.5px", marginTop:"2px",marginRight:"1rem"}}/>
                </a>
              </li>
              <li><a href="#"><img src={insta} style={{height:"35px", width:"35px", marginTop:"5px", marginRight:"1rem"}}/></a></li>
              <li><a href="#"><img src={twit} style={{height:"42.8px", width:"42.8px", marginTop:"1.5px"}}/></a></li>
            </ul>
        </div>
    <div className="contactform">
          <h2>Send A Message</h2>
          <div className="formBox">
            <div className="inputBox w50">
              <input type="text" name="" required />
              <span>FIRST NAME</span>
            </div>
            <div className="inputBox w50">
              <input type="text" name="" required />
              <span>EMAIL ADDRESS</span>
            </div>
            <div className="inputBox w50">
              <input type="text" name="" required />
              <span>PHONE NUMBER</span>
            </div>
            <div className="inputBox w100">
              <textarea name="" required></textarea>
              <span>Write Your Message Here...</span>
            </div>
            <div className="inputBox w100">
              <input type="Submit" value="Send"/>
            </div>
          </div>
      </div>
      </div>
      </section>
      </div>
    </>
  )
}

export default Home