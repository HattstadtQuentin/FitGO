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
import ProgramCreator from "./Routes/ProgramCreator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
  return (
    <div>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/activity" element={<Activity/>}/>
        <Route exact path="/program" element={<ProgramCreator/>}/>
        <Route exact path="/calories" element={<Calories/>}/>
        <Route path="/calories/food/:menu" element={<SearchFood />} />
        <Route path="/" element={<Home/>}/>
      </Routes>
      <NavBar/>
    </div>
  );
};