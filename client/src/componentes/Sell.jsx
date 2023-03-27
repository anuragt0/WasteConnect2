import React, { useEffect, useState } from 'react'

const Sell = () => {
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [filer, setFilter] = useState("");
    useEffect(() => {
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
        setFilter(event.target.value);
        const newOrders = [];
        for(let i = 0; i<orders.length; i++){
            if(orders[i].residue_type.toLowerCase().includes(event.target.value)){
                newOrders.push(orders[i]);
            }
        }
        setOrders2(newOrders)
    }

    return (
        <>
            <div style={{ textAlign: "center", "margin": "10%" }}>

                <h2>Find a buyer in a blink of eye</h2>

                <hr />

                {/* Filter */}
                <div className="input-group mb-3" style={{ textAlign: "center" }} >
                    <input type="text" className='mx-3' placeholder='Filter by residue type' onChange={handleChange} />

                </div>

                <table className="table table-hover">
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
                                    <tr>
                                        <th scope='row'>{num++}</th>
                                        <td>{order.buyer_name}</td>
                                        <td>{order.residue_type}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.valid_upto}</td>
                                        <td style={{ color: "green" }}>{order.status}</td>
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
