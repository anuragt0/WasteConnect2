import React, { useEffect, useState, useRef } from 'react'

const Sell = () => {
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
        async function getAllSellOrders() {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/sell-orders`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const result = await response.json();
                console.log(result);
                setOrders(result.sellOrders);
                setOrders2(result.sellOrders);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllSellOrders();
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
            // "auth-token": localStorage.getItem("token"),
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODA0MjU3ODUsInBlcnNvbiI6eyJtb25nb0lkIjoiNjQyMjgxODI5ODY5ZWE1NjY5MTA5YzYwIn0sImlhdCI6MTY3OTk4NjU4NX0.NWHhLBpo8FsB6yq5lCI_iY532ZRhQEHIw7wKo5_-7ME",
          },
          body: JSON.stringify(newOrder),
        }
      );

      const data = await response.json();
      console.log(data);

      refClose.current.click();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleBuy = async (seller_id)=>{
    console.log(seller_id);
    try {
        const bodyy = {
            userId: seller_id
        }
      const response = await fetch(
        `http://localhost:5000/api/user/get-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyy),
        }
      );

      const data = await response.json();
      console.log(data);
      setUserDoc(data.userDoc);

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
                Add a new vertical
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
              <p>Name: {userDoc.name!==undefined?userDoc.name: "NA"}</p>
              <p>UserId: {userDoc.userId!==undefined?userDoc.userId: "NA"}</p>
              <p>phone: {userDoc.phone!==undefined?userDoc.phone: "NA"}</p>
              <p>email: {userDoc.email!==undefined?userDoc.email: "NA"}</p>
              <p>aadhaar: {userDoc.aadhaar!==undefined?userDoc.aadhaar: "NA"}</p>
              <p>address: {userDoc.address!==undefined?userDoc.address: "NA"}</p>
              <p>city: {userDoc.city!==undefined?userDoc.city: "NA"}</p>
              <p>pincode: {userDoc.pincode!==undefined?userDoc.pincode: "NA"}</p>
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
                onClick={handlePlaceOrder}
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

                <h2>Find a Seller in a blink of eye</h2>

                <hr />

                {/* Filter */}
                <div className="input-group mb-3" style={{ textAlign: "center" }} >
                    <input type="text" className='mx-3' placeholder='Filter by residue type' onChange={handleChange} />
                </div>

                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th scope="col">Sr. number</th>
                            <th scope="col">Seler Name</th>
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
                                        <td>{order.seller_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
                                        <button class="btn btn-primary" style={{color:"white", backgroundColor: "blue"}} onClick={()=>{handleBuy(order.seller_id)}}>Buy</button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <h4>Still can't find your desired Seller? Place a sell order.</h4>
                <h5>Info: You'll will be notified once a Seller wants to reach you.</h5>
                <button className='btn btn-primary' onClick={()=>ref.current.click()}>Place order</button>
            </div>
        </>

    )
}

export default Sell
