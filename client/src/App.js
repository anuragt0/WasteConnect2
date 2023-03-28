import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import all components here
import Navbar from "./componentes/Navbar";
import Home from "./componentes/Home";
import Sell from "./componentes/Sell";
import Buy from "./componentes/Buy";
import Services from "./componentes/Services";
import Login from './componentes/Login';
import Register from './componentes/Register';
import "./App.css";

function App() {
  return (
    <>
        <Router>
            <Navbar/>
            <div>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/services/sell' element={<Sell/>}/>
                    <Route exact path='/services/buy' element={<Buy/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/register' element={<Register/>}/>
                    <Route exact path='/services' element={<Services/>}/>
                </Routes>
            </div>
        </Router>
    </>
  );
}

export default App;
