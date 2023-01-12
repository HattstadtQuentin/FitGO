import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export default function GetFoodByName(foodName) {
    const [data, setData] = useState(null);

    function getRequest(foodName){
        if(foodName.foodName === ''){
            return null
        }
        return {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
            params: {
                query: foodName.foodName,
                offset: '0',
                number: '10',
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
        <div className="card text-center m-3">
            <div className="card-body">
                {
                    data != null && data.map((elem, i) => {     
                        console.log("Entered");         
                        return (<div key={i}>Food Data : {elem.id}</div>) 
                     })
                }
            </div>
        </div>
    );
}