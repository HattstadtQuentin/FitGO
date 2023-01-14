import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import "./styles/App.scss";

import NavBar from './Components/NavBar.jsx';
import SearchFood from "./Components/SearchFood.jsx";
import Calories from "./Routes/Calories.jsx";


export default function App(){

  return (
    <div>
      <Routes>
        <Route exact path="/calories" element={<Calories/>}/>
        <Route path="/calories/food" element={<SearchFood />} />
      </Routes>
      <NavBar/>
    </div>
  );
};