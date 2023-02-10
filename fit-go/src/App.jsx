import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import "./styles/App.scss";

import NavBar from './Components/NavBar.jsx';
import SearchFood from "./Routes/SearchFood.jsx";
import Calories from "./Routes/Calories.jsx";
import Home from "./Routes/Home";
import Activity from "./Routes/Activity";


export default function App(){

  return (
    <div>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/activity" element={<Activity/>}/>
        <Route exact path="/calories" element={<Calories/>}/>
        <Route path="/calories/food/:menu" element={<SearchFood />} />
      </Routes>
      <NavBar/>
    </div>
  );
};