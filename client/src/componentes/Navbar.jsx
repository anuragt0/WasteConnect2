import React from 'react'
import logo from "./images1/wc.png";
import "../App.css";
const Navbar = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <figure>
              <img className="logo1" src={logo} alt="logo"/>
            </figure>
          </div>

          <div className="social">
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-linkedin icon"></i>
            <i className="fab fa-youtube icon"></i>
          </div>
        </div>

        <div className="secNav">
            <nav className="NavbarItems">
              <ul className="nav-menu">
                <li>
                  <a className="ic" href="#">
                    <i className="fa-solid fa-house-user"></i>
                     Home
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-truck"></i>
                    Buy
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-truck"></i>
                    Sell
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-briefcase"></i>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-address-book"></i>
                   Contact
                  </a>
                </li>
                <div className="oth">
                <li>
                  <a className="login" href="#">
                   
                    Log In
                  </a>
                </li>
                <li>
                  <a className="signup" href="#">
                    
                    Sign Up
                  </a>
                </li>
                </div>
                </ul>
            </nav>
        </div>
      </section>

            
    </>
  )
}

export default Navbar