import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Routes/SearchFood.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faList, faHeart, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

import GetFoodByName from '../Hooks/GetFoodByName';
import ProgressBar from '../Components/ProgressBar';

function getFoodByName(foodName) {
  return <GetFoodByName foodName={foodName}/>;
}

const testData = [
  { bgcolor: "#6a1b9a", completed: 60 },
  { bgcolor: "#00695c", completed: 30 },
  { bgcolor: "#ef6c00", completed: 53 },
];

export default function SearchFood() {
  const [searchFoodName, setSearchFoodName] = useState('');
  const [foodName, setFoodName] = useState('');
  let { menu } = useParams();
  const [menuType, setMenuType ] = useState('');
  const [foodSearchType, setFoodSearchType] = useState('actual');

  const [isSearchOn, setIsSearchOn] = useState(false);

  useEffect(() => {

    switch(menu) {
      case "breakfast": 
        setMenuType('Petit dejeuner');
        return;
      case "lunch": 
        setMenuType('Dejeuner');
        return;
      case "dinner": 
        setMenuType('Diner');
        return;
      case "snack": 
        setMenuType('Snack');
        return;
      default: 
        return;
    }
}, [menu]);


  const GetFoodName = useMemo(() => getFoodByName(searchFoodName), [searchFoodName]);
  return (
    
    <div className="searchFoodContainer">
      <NavLink className='back' to="/calories">&nbsp;</NavLink>
      <div className='header'>
        {menuType}
      </div>
      <div className='searchFoodContent'>
          <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
          <input
            className='searchFood'
            type="text" 
            value={foodName}
            placeholder="Aliments..."
            onChange={(e) => setFoodName(e.target.value)}
            onFocus={() => setIsSearchOn(true)} onBlur={() => setIsSearchOn(false)}
          />
          {/* <button onClick={() => setSearchFoodName(foodName)}>RECHERCHER</button> */}
      </div>
      {
        !isSearchOn && 
        <div className='InformationsContainer'>
          <div className='ApportContainer'>
            <div className='ApportTitle'>
              <div className='text'>
                Apport nutritionnel journalier
                <span className='data'>403/2605 kcal</span>
              </div>
              <ProgressBar bgcolor={"#fcbf49"} completed={20} />
            </div>
            <div className='ApportContent'>
              <div className='ApportCard'>
                <div>Glucides</div>
                <ProgressBar bgcolor={"#01E8D1"} completed={0} />
                <div>0/326 kcal</div>
              </div>
              <div className='ApportCard'>
                <div>Protéines</div>
                <ProgressBar bgcolor={"#917FFC"} completed={50} />
                <div>45/130 kcal</div>
              </div>
              <div className='ApportCard'>
                <div>Lipides</div>
                <ProgressBar bgcolor={"#ef476f"} completed={30} />
                <div>25/87 kcal</div>
              </div>
            </div>
          </div>
          <div className='selectTypeInfos'>
            <div className={foodSearchType === 'actual' ? 'selectTypeInfosCard active' : 'selectTypeInfosCard'} onClick={() => setFoodSearchType('actual')}>
              <FontAwesomeIcon icon={faList} />
            </div>
            <div className={foodSearchType === 'favorite' ? 'selectTypeInfosCard active' : 'selectTypeInfosCard'} onClick={() => setFoodSearchType('favorite')}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className={foodSearchType === 'recent' ? 'selectTypeInfosCard active' : 'selectTypeInfosCard'} onClick={() => setFoodSearchType('recent')}>
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </div>
          </div>
        </div>
      }


    </div>
  );
}