import React from "react";
import { useNavigate } from "react-router-dom";
const Services = () => {
  const navigate = useNavigate();

  return (
    <>
    <div style={{textAlign: "center"}}>
      <h1 className="my-3">Our Services</h1>
      <div className="card my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Sell</h5>
          <p className="card-text">
          Turn your farm residues into cash with our user-friendly platform. Sell your surplus products hassle-free and connect with buyers in just a few clicks.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/services/sell");
            }}
          >
            Sell Now
          </button>
        </div>
      </div>
      <div className="card my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Buy</h5>
          <p className="card-text">
          Find a reliable source of high-quality crop residues for your industrial needs. Browse our diverse selection of farm products and connect with trusted sellers to purchase in bulk. Streamline your supply chain and improve your bottom line with us.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/services/buy");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="card my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Rental Services</h5>
          <p className="card-text">
          Need help cutting or processing crop residues? Search for rental services near you with our easy-to-use platform. Connect with local providers who offer equipment and services to help you manage your farm waste efficiently. Save time and resources while minimizing your environmental impact today.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/services/rental-service");
            }}
          >
            Search Now
          </button>
        </div>
      </div>

      <div className="card my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Weather updates</h5>
          <p className="card-text">
            Stay prepared for any weather with our up-to-date forecasts and real-time weather updates. Whether you're planning a day out or need to stay informed for work, our reliable weather information will help you make informed decisions. Get the latest weather updates and forecasts today.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/services/weather-updates");
            }}
          >
            Get Weather Updates
          </button>
        </div>
      </div>
      <div className="card my-5 mx-3">
        <div className="card-body">
          <h5 className="card-title">Goverment Schemes</h5>
          <p className="card-text">
            Browse all Goverment related Schemes and make most out of them .
          </p>
          <a href={"https://agricoop.nic.in/en/Major#gsc.tab=0"}>Browse Schemes</a>
        </div>
      </div>
    </div>

      
    </>
  );
};

export default Services;
