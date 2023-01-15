import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBowlFood, faFireFlameCurved, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import '../styles/Components/NavBar.scss';

export default function NavBar() {
  return (
    <div>
      <div className="NavBar">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}><FontAwesomeIcon icon={faHouse} /></NavLink>
          <NavLink to="/program"><FontAwesomeIcon icon={faFireFlameCurved} /></NavLink>
          <NavLink to="/calories"><FontAwesomeIcon icon={faBowlFood} /></NavLink>
      </div>
      <div className='blackFade'>&nbsp;</div>
    </div>
  );
}