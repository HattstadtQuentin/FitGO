import React from 'react';
import '../styles/Routes/Calories.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPlus, faMugSaucer, faBurger, faHotdog, faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";


export default function Calories() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        datasets: [
        {
            data: [10, 60, 30],
            backgroundColor: [
            '#01E8D1',
            '#917FFC',
            '#ef476f',
            ],
            borderWidth: 0,
            cutout: 50
        },
        ],
    };

    return (
        <div className="Calories">
            <div className="Header">
                <div className="title">
                    Calories
                </div>
                <details className="custom-select">
                    <summary className="radios">
                        <input type="radio" name="item" id="default" title="24 Heures" checked/>
                        <input type="radio" name="item" id="item1" title="7 jours"/>
                        <input type="radio" name="item" id="item2" title="1 mois"/>
                    </summary>
                    <ul className="list">
                        <li>
                            <label htmlFor="default">
                                24 Heures
                            </label>
                        </li>
                        <li>
                            <label htmlFor="item1">
                                7 jours
                            </label>
                        </li>
                        <li>
                            <label htmlFor="item2">
                                1 mois
                            </label>
                        </li>
                    </ul>
                </details>
            </div>
            <div className="StatsContainer">
                <div className='StatsGlobal'>
                    <div className='StatsCard'>
                        <div className='CardContent'>
                            0
                        </div>
                        <div className='CardTitle'>
                            Consommées
                        </div>
                    </div>
                    <div className='StatsCard big'>
                        <div className='CardContent'>
                            2605
                        </div>
                        <div className='CardTitle'>
                            Kcal restantes
                        </div>
                    </div>
                    <div className='StatsCard'>
                        <div className='CardContent'>
                            0
                        </div>
                        <div className='CardTitle'>
                            Brûlées
                        </div>
                    </div>
                </div>
                <div className='StatsDetail'>
                    <div className='StatsTitle'>
                        <div className='title'>
                            Apport nutritionnel journalier
                        </div>
                        <div className='content'>
                            Macronutriments consomés (Glucides, Protéines, Lipides)
                        </div>
                    </div>
                    <div className='Stats'>
                        <div className='Chart'>
                            <Doughnut data={data} />
                        </div>
                        <div className='ChartLabel'>
                            <div className='label'>
                                <div className='labelContainer'>
                                    <div className='color'>&nbsp;</div>
                                    <div className='text'>
                                        Glucides
                                    </div>
                                </div>
                                <div className='percentage'>
                                    60%
                                </div>
                            </div>
                            <div className='label'>
                                <div className='labelContainer'>
                                    <div className='color'>&nbsp;</div>
                                    <div className='text'>
                                        Protéines
                                    </div>
                                </div>
                                <div className='percentage'>
                                    30%
                                </div>
                            </div>
                            <div className='label'>
                                <div className='labelContainer'>
                                    <div className='color'>&nbsp;</div>
                                    <div className='text'>
                                        Lipides
                                    </div>
                                </div>
                                <div className='percentage'>
                                    10%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='daySelector'>
                <FontAwesomeIcon icon={faCalendarDays} />
                Aujourd'hui, 14 JANV.
            </div>
            <div className='FoodContainer'>
                <NavLink to = "food/breakfast">
                <div className='petitDejContainer foodCard'>
                    <FontAwesomeIcon className="primaryIcon" icon={faMugSaucer} />
                    <div className='informationsContainer'>
                        <div className='title'>
                            Petit dejeuner
                        </div>
                        <div className='description'>
                            Recommandés: 500 kcal
                        </div>
                    </div>
                    <div className='plusBtn'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                </NavLink>
                <NavLink to = "food/lunch">
                <div className='dejeunerContaier foodCard'>
                    <FontAwesomeIcon className="primaryIcon" icon={faBurger} />
                    <div className='informationsContainer'>
                        <div className='title'>
                            Dejeuner
                        </div>
                        <div className='description'>
                            Recommandés: 1500 kcal
                        </div>
                    </div>
                    <div className='plusBtn'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                </NavLink>
                <NavLink to = "food/dinner">
                <div className='dinerContainer foodCard'>
                    <FontAwesomeIcon className="primaryIcon" icon={faHotdog} />
                    <div className='informationsContainer'>
                        <div className='title'>
                            Diner
                        </div>
                        <div className='description'>
                            Recommandés: 900 kcal
                        </div>
                    </div>
                    <div className='plusBtn'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                </NavLink>
                <NavLink to = "food/snack">
                <div className='snackContainer foodCard'>
                    <FontAwesomeIcon className="primaryIcon" icon={faAppleWhole} />
                    <div className='informationsContainer'>
                    <div className='title'>
                            Snack
                        </div>
                        <div className='description'>
                            Recommandés: 200 kcal
                        </div>
                    </div>
                    <div className='plusBtn'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                </NavLink>
            </div>
        </div>
    );
}