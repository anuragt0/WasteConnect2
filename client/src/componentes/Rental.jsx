import { React, useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";

const Rental = () => {
    const navigate = useNavigate();
    const [rentalServices, setRentalServices] = useState([]);
    const [newRentalService, setNewRentalService] = useState({});
    const ref = useRef(null);
    const refClose = useRef(null);

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
                if(result.success===false)
                    navigate('/login');
                
                console.log(result);


            } catch (error) {
                console.log(error.message);
            }
        }
        validateLogin();
        const getAllRentalServices = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/get-rental-services`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const result = await response.json();
                // console.log("rentalServices: ", result.allServices);
                setRentalServices(result.allServices);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllRentalServices();
    }, [])

    function onAddChange(e) {
        setNewRentalService({ ...newRentalService, [e.target.name]: e.target.value });

        console.log(newRentalService);
      }

      async function handleAddRentalService(e) {
        e.preventDefault();
        console.log("RECEIVED");
    
        try {
          const response = await fetch(
            `http://localhost:5000/api/user/add-rental-service`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
              body: JSON.stringify(newRentalService),
            }
          );

          const data = await response.json();
          console.log("data ", data);
          setNewRentalService({});
    
          refClose.current.click();
          if(data.success)
            window.location.reload();
            else
                alert("Please enter valid details")
        } catch (error) {
          console.log(error.message);
          alert(error.message)
        }
      }
    

    const Modal = (
        <>
          <button
            ref={ref}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
          >
            Launch demo modal
          </button>
    
          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add a rental service
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    {/* <i className="fa-solid fa-xmark"></i> */}
                  </button>
                </div>
                <div className="modal-body">
                  {/* Form */}
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="residue_type" className="form-label">
                        Machine type <span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="machine_type"
                        name="machine_type"
                        minLength={1}
                        onChange={onAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="residue_type" className="form-label">
                        Description <span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        minLength={1}
                        onChange={onAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">
                        Image Source<span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="imgSrc"
                        name="imgSrc"
                        onChange={onAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="valid_upto" className="form-label">
                        Location<span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        onChange={onAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="info" className="form-label">
                        Rate(in ₹/hour)<span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="rate"
                        name="rate"
                        onChange={onAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="info" className="form-label">
                        Phone<span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        onChange={onAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="info" className="form-label">
                        Email<span style={{color: "red"}}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={onAddChange}
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleAddRentalService}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add rental service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );


    return (
        <div style={{marginTop:"5%"}}>
        {Modal}
        <div style={{textAlign:"center"}}>
            <h1>Available Rental Services</h1>

            <button className='btn btn-primary my-3' onClick={()=>{ref.current.click()}}>Add Rental Service</button>

        </div>
            <div className="row">
                {
                    rentalServices.map((service) => {
                        return (
                                <div className="card" id={service._id} style={{ width: "22rem", border: "1px solid", display: "inline-block", padding: "20px", margin: "40px" }}>
                                    <img src={service.imgSrc} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-title"> <b>Machine: </b> {service.machine_type}</p>
                                        <p className="card-text"><b>Description: </b>{service.description}</p>
                                        <p className="card-text"><b>Owner: </b>{service.owner}</p>
                                        <p className="card-text"><b>Rate: </b>{service.rate} ₹/hour</p>
                                        <p className="card-text"><b>Location: </b>{service.location}</p>
                                        <p className="card-text"><b>Phone: </b>{service.phone}</p>
                                        <p className="card-text"><b>email: </b>{service.email}</p>

                                        <div className="btn-toolbar">
                                            <button type="button" className="btn btn-primary mx-3 my-3 mx-auto">More Info</button>
                                        </div>
                                    </div>
                                </div>   
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Rental
