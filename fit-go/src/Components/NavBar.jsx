import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBowlFood, faFireFlameCurved, faDumbbell, faChartPie, faPlay } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import FitGo from "../styles/Images/FitGo.png";
import '../styles/Components/NavBar.scss';

export default function NavBar() {
  return (
    <div>
      <div className="NavBar">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}><FontAwesomeIcon icon={faHouse} /></NavLink>
          <NavLink to="/statistic" className={({ isActive }) => isActive ? 'active' : ''}><FontAwesomeIcon icon={faChartPie} /></NavLink>
          <NavLink to="/activity" className={({ isActive }) => isActive ? 'active play' : 'play'}><img src={FitGo} alt="FitGo Logo"/></NavLink>
          <NavLink to="/program" className={({ isActive }) => isActive ? 'active' : ''}><FontAwesomeIcon icon={faDumbbell} /></NavLink>
          <NavLink to="/calories" className={({ isActive }) => isActive ? 'active' : ''}><FontAwesomeIcon icon={faBowlFood} /></NavLink>
      </div>
      <div className='blackFade'>&nbsp;</div>
    </div>
  );
}