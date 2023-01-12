import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './Components/NavBar.jsx';
import SearchFood from "./Routes/SearchFood.jsx";


export default function App(){

  return (
    <div>
      <Routes>
        <Route path="/food" element={<SearchFood />} />
      </Routes>
      <NavBar/>
    </div>
  );
};