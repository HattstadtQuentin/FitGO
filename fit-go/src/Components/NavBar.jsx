import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBowlFood, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import '../styles/Components/NavBar.scss';

export default function NavBar() {
  return (
    <div className="NavBar">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}><FontAwesomeIcon icon={faHouse} /></NavLink>
        <NavLink to="/program"><FontAwesomeIcon icon={faFireFlameCurved} /></NavLink>
        <NavLink to="/food"><FontAwesomeIcon icon={faBowlFood} /></NavLink>
    </div>
  );
}