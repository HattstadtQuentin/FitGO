import React, {useState, useEffect } from 'react';
import '../styles/Components/Repas.scss';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown, faPlus, faMugSaucer, faBurger, faHotdog, faAppleWhole, faSpoon, faTrash } from '@fortawesome/free-solid-svg-icons';

import { getAlimentsByRepas } from '../Functions/HandlingCaloriesJsx';

export default function Repas({repas, type, date, setTotalCal, setTotalGlu, setTotalProt, setTotalLip}) {
    
    const [isExpanded, setIsExpanded] = useState(false);

    const [fixUp, setFixUp] = useState(true);
    const [aliments, setAliments] = useState([]);

    const [hotReload, setHotReload] = useState(true);

    useEffect(() => {
        if(repas !== null){
            setAliments([]);
            getAlimentsByRepas(repas.idRepas).then((res) => {
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
      }, [hotReload]);

  useEffect(() => {
    if(repas !== null){
        getAlimentsByRepas(repas.idRepas).then((res) => {
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
  }, [repas]);

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
    }, 200);
  }


  useEffect( () => {
    removeDouble();
}, [fixUp]);

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
},[aliments]);

    function getIcon(){
        switch(type) {
            case "breakfast": 
                return faMugSaucer;
            case "lunch": 
                return faBurger;
            case "dinner": 
                return faHotdog;
            case "snack": 
                return faAppleWhole;
            default: 
                return null;
            }
    }

    function getTitle(){
        switch(type) {
            case "breakfast": 
                return "Petit Dejeuner";
            case "lunch": 
                return "Dejeuner";
            case "dinner": 
                return "Diner";
            case "snack": 
                return "Snack";
            default: 
                return null;
            }
    }

    function getRecommande(){
        switch(type) {
            case "breakfast": 
                return "Recommandés: 500 kcal";
            case "lunch": 
                return "Recommandés: 1500 kcal";
            case "dinner": 
                return "Recommandés: 900 kcal";
            case "snack": 
                return "Recommandés: 200 kcal";
            default: 
                return null;
            }
    }

    useEffect(() => {
        console.log(aliments);
    }, [isExpanded])

    return (
        
        // <NavLink to = "food/lunch">
            <div className={'dejeunerContaier foodCard ' + (isExpanded ? ' expanded' : '')}>
                <div className="topContainer">
                    <FontAwesomeIcon className="primaryIcon" icon={getIcon()} />
                    <div className='informationsContainer'>
                        <div className='title'>
                            {getTitle()}
                        </div>
                        <div className='description'>
                            {getRecommande()}
                        </div>
                    </div>
                    <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} 
                            className='plusBtn'
                            onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <FontAwesomeIcon icon={isExpanded ? faAngleDown : faAngleRight} />
                    </motion.div>

                </div>
                {isExpanded ? aliments !== null && aliments.map((aliment, key) => {
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
                  }) : null}
                  {
                    isExpanded ?  (date.toLocaleDateString() === new Date().toLocaleDateString()) ?  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="addingMore"
                    onClick={() =>  window.location.href=('/calories/food/'+type)}
                  >
                    Ajout
                  </motion.button> : null : null
                  }
            </div>
    );
}