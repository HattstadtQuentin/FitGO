import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Routes/SearchFood.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faList, faHeart, faClockRotateLeft, faTrash, faSpoon } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import GetFoodByName from '../Hooks/GetFoodByName';
import ProgressBar from '../Components/ProgressBar';
import ModalAliment from '../Components/Modals/ModalAliment.jsx';
import {getRepasByDate, getAlimentsByRepas, deleteAliment} from '../Functions/HandlingCaloriesJsx';
import useUserStore from '../Stores/useUserStore';

function getFoodByName(foodName, setModalState) {
  return <GetFoodByName foodName={foodName} openModal={setModalState} />;
}

const testData = [
  { bgcolor: "#6a1b9a", completed: 60 },
  { bgcolor: "#00695c", completed: 30 },
  { bgcolor: "#ef6c00", completed: 53 },
];

export default function SearchFood() {
  const userId = useUserStore((state) => state.id);
  const [actualFoodData, setActualFoodData] = useState(null);
  const [favoriteFoodData, setFavoriteFoodData] = useState(null);
  const [historicFoodData, setHistoricFoodData] = useState(null);


  const [searchFoodName, setSearchFoodName] = useState('');
  const [foodName, setFoodName] = useState('');
  let { menu } = useParams();
  const [menuType, setMenuType ] = useState('');
  const [foodSearchType, setFoodSearchType] = useState('actual');

  const [isSearchOn, setIsSearchOn] = useState(false);

  const [modalState, setModalState] = useState([false, null]);

  function getGoodNamingMenu(){
    switch(menu) {
      case "breakfast": 
        return "MATIN";
      case "lunch": 
        return "MIDI";
      case "dinner": 
        return "SOIR";
      case "snack": 
        return "COLLATION";
      default: 
        return null;
    }
  }

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

const [fixUp, setFixUp] = useState(true);
const [aliments, setAliments] = useState([]);

const [hotReload, setHotReload] = useState(true);

    useEffect(() => {
      setAliments([]);
      getRepasByDate(new Date().toISOString(), userId).then((res) => {
        res.forEach(resu => {
          if(resu.type === getGoodNamingMenu()){
            getAlimentsByRepas(resu.idRepas).then((res) => {
              res.forEach(resu => {
                let alreadyIn = false;
                aliments.map(aliment => {
                    if(aliment.idAliment = res.idAliment){
                        alreadyIn = true;
                    }
                })
                if(!alreadyIn){
                  setAliments(prevAlims => [...prevAlims, resu]);
                  setFixUp(!fixUp);
                }
              });
            });
          }
        });
      })
      }, [hotReload]);

  useEffect(() => {
    getRepasByDate(new Date().toISOString(), userId).then((res) => {
      res.forEach(resu => {
        if(resu.type === getGoodNamingMenu()){
          getAlimentsByRepas(resu.idRepas).then((res) => {
            res.forEach(resu => {
              let alreadyIn = false;
              aliments.map(aliment => {
                  if(aliment.idAliment = res.idAliment){
                      alreadyIn = true;
                  }
              })
              if(!alreadyIn){
                setAliments(prevAlims => [...prevAlims, resu]);
                setFixUp(!fixUp);
              }
            });
          });
        }
      });
    })
  }, []);

  function removeDouble(){
    setTimeout(function () {
      var listAlim = []; 
      var newAlims = [];
      aliments.map((aliment, key) => {
        if(!listAlim.includes(aliment.idAliment) && aliment.idAliment != undefined){
          listAlim.push(aliment.idAliment);
          newAlims.push(aliment);
        }
      });
  
      setAliments(newAlims);
      console.log(newAlims);
    }, 200);
  }

  const inputRef = useRef();

  useEffect( () => {
    removeDouble();
}, [fixUp]);

const [totalCal, setTotalCal] = useState(0);
const [totalGlu, setTotalGlu] = useState(0);
const [totalProt, setTotalProt] = useState(0);
const [totalLip, setTotalLip] = useState(0);

  useEffect( () => {
      var tmpCal = 0;
      var tmpGlu = 0;
      var tmpProt = 0;
      var tmpLip = 0;

      aliments.map((aliment) => {
        tmpCal += aliment.calories;
        tmpGlu += aliment.glucides;
        tmpProt += aliment.proteines;
        tmpLip += aliment.lipides;
      });

      setTotalCal(tmpCal);
      setTotalGlu(tmpGlu);
      setTotalProt(tmpProt);
      setTotalLip(tmpLip);
  }, [aliments])

  const route = "/calories/" + menu;
  const GetFoodName = useMemo(() => getFoodByName(searchFoodName, setModalState), [searchFoodName]);
  return (
    
    <div className="searchFoodContainer">
      <NavLink className='back' to={isSearchOn ? "" : "/calories"} onClick={() => setIsSearchOn(false)}>&nbsp;</NavLink>
      <div className='header'>
        {menuType}
      </div>
      <div className='searchFoodContent'>
          <input
            className='searchFood'
            type="text" 
            ref={inputRef}
            value={foodName}
            placeholder="Aliments..."
            onChange={(e) => setFoodName(e.target.value)}
            onFocus={() => setIsSearchOn(true)} onBlur={(e) => e.target.value !== '' ? '' : setIsSearchOn(false)}
          />
          {isSearchOn &&  <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} onClick={() => {setSearchFoodName(foodName); inputRef.current.value = ''}}>
                              <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
                          </motion.button> }
      </div>
      {
        !isSearchOn && 
        <div className='InformationsContainer'>
          <div className='ApportContainer'>
            <div className='ApportTitle'>
              <div className='text'>
                Apport nutritionnel du repas
                <span className='data'>{totalCal}/600 kcal</span>
              </div>
              <ProgressBar bgcolor={"#fcbf49"} completed={({totalCal} * 100 ) / 600} />
            </div>
            <div className='ApportContent'>
              <div className='ApportCard'>
                <div>Glucides</div>
                <ProgressBar bgcolor={"#01E8D1"} completed={({totalGlu} * 100 ) / 326} />
                <div>{totalGlu}/326</div>
              </div>
              <div className='ApportCard'>
                <div>Protéines</div>
                <ProgressBar bgcolor={"#917FFC"} completed={({totalProt} * 100 ) / 130} />
                <div>{totalProt}/130</div>
              </div>
              <div className='ApportCard'>
                <div>Lipides</div>
                <ProgressBar bgcolor={"#ef476f"} completed={({totalLip} * 100 ) / 87} />
                <div>{totalLip}/87</div>
              </div>
            </div>
          </div>
          <div className='selectTypeInfos'>
            <div className={foodSearchType === 'actual' ? 'selectTypeInfosCard active' : 'selectTypeInfosCard'} onClick={() => setFoodSearchType('actual')}>
              <FontAwesomeIcon icon={faList} />
            </div>
            <div className={foodSearchType === 'recent' ? 'selectTypeInfosCard active' : 'selectTypeInfosCard'} onClick={() => setFoodSearchType('recent')}>
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </div>
          </div>
          {
            <div className='FoodList'>
              { foodSearchType === 'actual' && 
                <div className='FoodListTitle'>
                    VOTRE MENU DU JOUR
                </div>
              }
              { foodSearchType === 'recent' && 
                <div className='FoodListTitle'>
                    VOS REPAS RECENT
                </div>
              }
              <div className='FoodListContent'>
                  {aliments !== null && aliments.map((aliment, key) => {
                      return (
                        <div key={key} className='FoodListCard'>
                          <div className='CardInfos'>
                            <div className='CardTitle'>
                              {aliment.nom}
                            </div>
                            <div className='CardCalorie'>
                            <span>{aliment.calories}kcal</span>
                            </div>
                            <div className='CardQuantite'>
                              <FontAwesomeIcon className="searchIcon" icon={faSpoon} /> • {aliment.quantite}
                            </div>
                          </div>
                          <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }} onClick={() => {deleteAliment(aliment.idAliment); setHotReload(!hotReload);}} className='deleteBtn'>
                            <FontAwesomeIcon icon={faTrash} />
                          </motion.div>
                        </div>
                    );
                  })}
              </div>
            </div>
          }
        </div>
      }
      {
        isSearchOn && GetFoodName
      }
      {
        modalState[0] === true && <ModalAliment food={modalState[1]} typeRepas={getGoodNamingMenu()} exitMethod={setModalState} inputRef={inputRef}/>
      }

     
    </div>
  );
}