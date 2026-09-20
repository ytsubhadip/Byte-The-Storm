import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home"
import Dashboard  from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    

      <Routes>
        <Route path="/" element={
          <>
             <Navbar/>
            <Home />
          </>
         
          } />
        <Route path="/dashboard" element={
          <>
           <Dashboard />
          </>
          } />

      </Routes>


    </BrowserRouter>
  );
}

export default App;