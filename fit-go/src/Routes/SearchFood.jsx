import React, { useState, useMemo } from 'react';
import '../App.css';

import GetFoodByName from '../Hooks/GetFoodByName';

function getFoodByName(foodName) {
  return <GetFoodByName foodName={foodName}/>;
}

export default function SearchFood() {
  const [searchFoodName, setSearchFoodName] = useState('');
  const [foodName, setFoodName] = useState('');

  const GetFoodName = useMemo(() => getFoodByName(searchFoodName), [searchFoodName]);
  return (
    <div className="App">
      <div className='searchFoodContent'>
          <input
            className='searchFood'
            type="text" 
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <button onClick={() => setSearchFoodName(foodName)}></button>
        </div>
      <header className="App-header">
       
        
        
        Result {foodName} :  {GetFoodName}
      </header>
    </div>
  );
}