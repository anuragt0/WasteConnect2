import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import all components here

import Sell from "./componentes/Sell";
import Buy from "./componentes/Buy";
import "./App.css";

function App() {
  return (
    <>
        <Router>
            {/* <Navbar/> */}
            <div>
                <Routes>
                    <Route exact path='/services/sell' element={<Sell/>}/>
                    <Route exact path='/services/buy' element={<Buy/>}/>
                </Routes>
            </div>
        </Router>
    </>
  );
}

export default App;
