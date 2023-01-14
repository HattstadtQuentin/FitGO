import React from 'react';
import '../styles/Routes/Calories.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


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
                <details class="custom-select">
                    <summary class="radios">
                        <input type="radio" name="item" id="default" title="24 Heures" checked/>
                        <input type="radio" name="item" id="item1" title="7 jours"/>
                        <input type="radio" name="item" id="item2" title="1 mois"/>
                    </summary>
                    <ul class="list">
                        <li>
                            <label for="default">
                                24 Heures
                            </label>
                        </li>
                        <li>
                            <label for="item1">
                                7 jours
                            </label>
                        </li>
                        <li>
                            <label for="item2">
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
                            Macronutriments consomés (Glucides, Proteines, Lipides)
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
            <div className='FoodContainer'>

            </div>
        </div>
    );
}