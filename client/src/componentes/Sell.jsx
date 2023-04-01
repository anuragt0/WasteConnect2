import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";


const Sell = () => {

    const navigate = useNavigate();
    const ref = useRef(null);
    const refClose = useRef(null);
    const ref2 = useRef(null);
    const refClose2 = useRef(null);
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    //used in modal for placing sell request
    const [newOrder, setNewOrder] = useState({});
    const [userDoc, setUserDoc] = useState({});

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

        async function getAllBuyOrders() {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/buy-orders`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const result = await response.json();
                // console.log(result);
                setOrders(result.buyOrders);
                setOrders2(result.buyOrders);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllBuyOrders();
    }, []);

    let num = 1;
    const handleChange = (event)=>{
        const newOrders = [];
        for(let i = 0; i<orders.length; i++){
            if(orders[i].residue_type.toLowerCase().includes(event.target.value)){
                newOrders.push(orders[i]);
            }
        }
        setOrders2(newOrders)
    }

    function onAddChange(e) {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    console.log(newOrder);
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    console.log("RECEIVED");
    const d = new Date();
    const date = d.getDate() + "-" + d.getMonth()+"-" + d.getFullYear();

    newOrder.date_of_order = date;

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/sell-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(newOrder),
        }
      );

      const data = await response.json();
      console.log("data ", data);
      setNewOrder({});

      refClose.current.click();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSell = async (buyer_id)=>{
    console.log(buyer_id);
    try {
        const bodyy = {
            userId: buyer_id
        }
      const response = await fetch(
        `http://localhost:5000/api/user/get-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(bodyy),
        }
      );

      const data = await response.json();
      console.log(data);
      setUserDoc(data.userDoc);

      console.log("here");

      ref2.current.click();


    } catch (error) {
      console.log(error.message);
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
                Place your sell order
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
                    Residue type <span style={{color: "red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="residue_type"
                    name="residue_type"
                    minLength={1}
                    onChange={onAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity (in quintol)<span style={{color: "red"}}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    onChange={onAddChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="valid_upto" className="form-label">
                    Valid upto(dd-mm-yy)<span style={{color: "red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="valid_upto"
                    name="valid_upto"
                    onChange={onAddChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="info" className="form-label">
                    Additional Info.<span style={{color: "red"}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="info"
                    name="info"
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
                onClick={handlePlaceOrder}
                type="button"
                className="btn btn-primary"
              >
                Place your sell order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const Modal2 = (
    <>
      <button
        ref={ref2}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal3"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Information of <span style={{color: "green"}}> Verified</span> Buyer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
            <p> <span style={{fontWeight: "bold"}}>Name</span> : <span style={{color: "#0B2447"}}>{userDoc.name!==undefined?userDoc.name: "NA"}</span></p>
              <p><span style={{fontWeight: "bold"}}>UserId</span>: <span style={{color: "#0B2447"}}>{userDoc.userId!==undefined?userDoc.userId: "NA"}</span> </p>
              <p><span style={{fontWeight: "bold"}}>Phone</span>: <span style={{color: "#0B2447"}}>{userDoc.phone!==undefined?userDoc.phone: "NA"}</span> </p>
              <p><span style={{fontWeight: "bold"}}>email</span>: <span style={{color: "#0B2447"}}>{userDoc.email!==undefined?userDoc.email: "NA"}</span></p>
              <p><span style={{fontWeight: "bold"}}>Info</span>: <span style={{color: "#0B2447"}}>{userDoc.info!==undefined?userDoc.info: "NA"}</span> </p>
              <p><span style={{fontWeight: "bold"}}>Address</span>: <span style={{color: "#0B2447"}}>{userDoc.address!==undefined?userDoc.address: "NA"}</span> </p>
              <p><span style={{fontWeight: "bold"}}>City</span>: <span style={{color: "#0B2447"}}>{userDoc.city!==undefined?userDoc.city: "NA"}</span> </p>
              <p><span style={{fontWeight: "bold"}}>Pincode</span>: <span style={{color: "#0B2447"}}>{userDoc.pincode!==undefined?userDoc.pincode: "NA"}</span> </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose2}
              >
                Close
              </button>
              <button
                onClick={()=>{ref2.current.click()}}
                type="button"
                className="btn btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );


    return (
        <>
        {Modal}
        {Modal2}
            <div style={{ textAlign: "center", "margin": "10%" }}>

                <h2>SELL your product</h2>

                <hr />
                <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Can't find?
                    </button>
                </p>
                <div class="collapse my-3" id="collapseExample">
                    <div class="card card-body">
                        <div>
                            <h4>Still can't find your desired seller? <span style={{color:"green", fontWeight: "bold"}}>Place a buy order</span>.</h4>
                            <h5>Info: You'll will be notified once a Buyer wants to reach you.</h5>
                            <button className='btn btn-primary' onClick={() => ref.current.click()}>Place order</button>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="input-group mb-3" style={{ textAlign: "center" }} >
                    <input type="text" className='mx-3' placeholder='Filter by residue type' onChange={handleChange} />
                </div>

                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th scope="col">Sr. number</th>
                            <th scope="col">Buyer Name</th>
                            <th scope="col">Residue</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Valid upto</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders2.map((order) => {
                                return (
                                    <tr className='my-3' >
                                        <th scope='row'>{num++}</th>
                                        <td>{order.buyer_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
                                        <button className="btn btn-primary" style={{color:"white", backgroundColor: "blue"}} onClick={()=>{handleSell(order.buyer_id)}}>Sell</button>
                                    </tr>
                                )
                            })
                        }
                        {
                            orders2.map((order) => {
                                return (
                                    <tr className='my-3' >
                                        <th scope='row'>{num++}</th>
                                        <td>{order.buyer_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
                                        <button className="btn btn-primary" style={{color:"white", backgroundColor: "blue"}} onClick={()=>{handleSell(order.buyer_id)}}>Sell</button>
                                    </tr>
                                )
                            })
                        }
                        {
                            orders2.map((order) => {
                                return (
                                    <tr className='my-3' >
                                        <th scope='row'>{num++}</th>
                                        <td>{order.buyer_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
                                        <button className="btn btn-primary" style={{color:"white", backgroundColor: "blue"}} onClick={()=>{handleSell(order.buyer_id)}}>Sell</button>
                                    </tr>
                                )
                            })
                        }
                        {
                            orders2.map((order) => {
                                return (
                                    <tr className='my-3' >
                                        <th scope='row'>{num++}</th>
                                        <td>{order.buyer_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
                                        <button className="btn btn-primary" style={{color:"white", backgroundColor: "blue"}} onClick={()=>{handleSell(order.buyer_id)}}>Sell</button>
                                    </tr>
                                )
                            })
                        }
                        {
                            orders2.map((order) => {
                                return (
                                    <tr className='my-3' >
                                        <th scope='row'>{num++}</th>
                                        <td>{order.buyer_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
                                        <button className="btn btn-primary" style={{color:"white", backgroundColor: "blue"}} onClick={()=>{handleSell(order.buyer_id)}}>Sell</button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                
            </div>
        </>

    )
}

export default Sell
