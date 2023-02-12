import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpoon } from '@fortawesome/free-solid-svg-icons';
import translate from "translate";
import { motion } from "framer-motion";

translate.engine = "deepl";
translate.key = "1fa8e4f5-5dc6-492e-276b-3b7d9118994e:fx";


export default function GetFoodByName({foodName, openModal}) {
    const [data, setData] = useState(null);

    function getRequest(foodName){
        if(foodName === ''){
            return null
        }
        return {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
            params: {
                query: foodName,
                offset: '0',
                number: '10',
                minCarbs: '10',
                maxCarbs: '100',
                minProtein: '10',
                maxProtein: '100',
                minCalories: '50',
                maxCalories: '800',
                minFat: '10',
                maxFat: '100',
            },
            headers: {
                'X-RapidAPI-Key': 'a49309afffmsh5e1ded6328b12bap12e906jsn679848e14fd8',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
    }

    const options = useMemo(() => getRequest(foodName), [foodName]); 

    useEffect(() => {
        if(options !== null){
            axios.request(options).then(response => {
                setData(response.data.results);
            }).catch(error => {
                console.error(error);
            }); 
        }
    }, [options]);

    return (
        <div className="FoodListContent">
            {
                data != null && data.map((elem, i) => {       
                    return (<div key={i} className='FoodListCard'>
                    <div className='CardInfos'>
                        <div className='CardTitle'>
                        {elem.title}
                        </div>
                        <div className='CardCalorie'>
                            <span>{Math.round(elem.nutrition.nutrients[0].amount)}kcal</span>
                        </div>
                        <div className='CardQuantite'>
                        <FontAwesomeIcon className="searchIcon" icon={faSpoon} /> • {Math.round(elem.nutrition.nutrients[3].amount)}g gluc. • {Math.round(elem.nutrition.nutrients[2].amount)}g prot. • {Math.round(elem.nutrition.nutrients[1].amount)}g lip.
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} 
                            className='deleteBtn' onClick={() => { openModal([true, elem])}}>
                        <FontAwesomeIcon icon={faPlus} />
                    </motion.div>
                    </div>) 
                    })
            }
        </div>
    );
}