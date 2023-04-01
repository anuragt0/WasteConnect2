import React, { useEffect, useState } from 'react'
import logo from "./images1/wc.png";
import "../App.css";
const Navbar = () => {

    const [isLogggedin, setIsloggedin] = useState(false);

useEffect(() => {

    async function validateLogin(){
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/verify-token`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": localStorage.getItem("token")
                        },
                    }
                );
                const result = await response.json();
                console.log(result);
                setIsloggedin(result.success);


            } catch (error) {
                console.log(error.message);
            }
        }
        validateLogin();
}, [])


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
                  <a className="ic" href="/">
                    <i className="fa-solid fa-house-user"></i>
                     Home
                  </a>
                </li>
                <li>
                  <a href="/services/buy">
                    <i className="fa-solid fa-truck"></i>
                    Buy
                  </a>
                </li>
                <li>
                  <a href="/services/sell">
                    <i className="fa-solid fa-truck"></i>
                    Sell
                  </a>
                </li>
                <li>
                  <a href="/services">
                    <i className="fa-solid fa-briefcase"></i>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <i className="fa-solid fa-address-book"></i>
                   Contact
                  </a>
                </li>
                <div className="oth">
                
                 
                {!isLogggedin?
                    <><li>
                    <a className="login" href="/login">
                        Log In
                    </a>
                    </li>
                    <li>
                    <a className="signup" href="/register">
                        Register
                    </a>
                    </li></>
                : <li>
                    <a className="login" href="/" onClick={()=>{ 
                        localStorage.removeItem('token');

                    }}>
                        Logout
                    </a>
                    </li>
                }
                    
                
                </div>
                </ul>
            </nav>
        </div>
      </section>

            
    </>
  )
}

export default Navbar