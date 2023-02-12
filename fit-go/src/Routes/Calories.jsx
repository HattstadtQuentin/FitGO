import React, {useState, useEffect } from 'react';
import '../styles/Routes/Calories.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Repas from '../Components/Repas';
import useUserStore from '../Stores/useUserStore';

import { toast } from 'react-toastify';



import { getRepasByDate } from '../Functions/HandlingCaloriesJsx';


export default function Calories() {
    const userId = useUserStore((state) => state.id);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const[date, setDate] = useState(new Date());

    const[breakfast, setBreakfast] = useState(null);
    const[dinner, setDinner] = useState(null);
    const[lunch, setLunch] = useState(null);
    const[snack, setSnack] = useState(null);


    const [totalCal, setTotalCal] = useState(0);
    const [totalGlu, setTotalGlu] = useState(0);
    const [totalProt, setTotalProt] = useState(0);
    const [totalLip, setTotalLip] = useState(0);
    const [tot, setTot] = useState(0);
    const [totalCalMAT, setTotalCalMAT] = useState(0);
    const [totalGluMAT, setTotalGluMAT] = useState(0);
    const [totalProtMAT, setTotalProtMAT] = useState(0);
    const [totalLipMAT, setTotalLipMAT] = useState(0);
    const [totalCalMID, setTotalCalMID] = useState(0);
    const [totalGluMID, setTotalGluMID] = useState(0);
    const [totalProtMID, setTotalProtMID] = useState(0);
    const [totalLipMID, setTotalLipMID] = useState(0);
    const [totalCalSOIR, setTotalCalSOIR] = useState(0);
    const [totalGluSOIR, setTotalGluSOIR] = useState(0);
    const [totalProtSOIR, setTotalProtSOIR] = useState(0);
    const [totalLipSOIR, setTotalLipSOIR] = useState(0);
    const [totalCalSNA, setTotalCalSNA] = useState(0);
    const [totalGluSNA, setTotalGluSNA] = useState(0);
    const [totalProtSNA, setTotalProtSNA] = useState(0);
    const [totalLipSNA, setTotalLipSNA] = useState(0);


    useEffect(() => {
        var tmpGLU = totalGluMAT + totalGluMID + totalGluSOIR + totalGluSNA;
        var tmpProt = totalProtMAT + totalProtMID + totalProtSOIR + totalProtSNA;
        var tmpLip = totalLipMAT + totalLipMID + totalLipSOIR + totalLipSNA;

        setTot(tmpGLU + tmpProt + tmpLip);
        setTotalCal(totalCalMAT + totalCalMID + totalCalSOIR + totalCalSNA);
        setTotalGlu(totalGluMAT + totalGluMID + totalGluSOIR + totalGluSNA);
        setTotalProt(totalProtMAT + totalProtMID + totalProtSOIR + totalProtSNA);
        setTotalLip(totalLipMAT + totalLipMID + totalLipSOIR + totalLipSNA);
    }, [totalCalMAT, totalGluMAT, totalProtMAT, totalLipMAT, totalCalMID, totalGluMID, totalProtMID, totalLipMID, totalCalSOIR, totalGluSOIR, totalProtSOIR, totalLipSOIR, totalCalSNA, totalGluSNA,totalProtSNA, totalLipSNA ])


    useEffect(() => {
        if(userId === null){
            toast.error("Vous devez être connecté pour acceder à cette fonctionnalité", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } else {
        getRepasByDate(new Date(date).toISOString(), userId).then((res) => {
            res.forEach(resu => {
                switch(resu.type) {
                    case "MATIN":
                        setBreakfast(resu);
                        break;
                    case "MIDI":
                        setLunch(resu);
                        break;
                    case "SOIR":
                        setDinner(resu);
                        break;
                    case "COLLATION":
                        setSnack(resu);
                        break;
                }
            });
        })
    }
    },[date]);

    const data = {
        datasets: [
        {
            data: [(totalLip * 100) / tot, (totalGlu * 100) / tot, (totalProt * 100) / tot],
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
            </div>
            <div className="StatsContainer">
                <div className='StatsGlobal'>
                    <div className='StatsCard'>
                        <div className='CardContent'>
                            {totalCal}
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
                            ? :(
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
                                {Math.round((totalGlu * 100) / tot)}%
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
                                    {Math.round((totalProt * 100) / tot)}%
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
                                    {Math.round((totalLip * 100) / tot)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='daySelector'>             
                <motion.div whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} 
                            onClick={() => {var tmpDate = new Date(date).setDate(new Date(date).getDate() - 1); setDate(tmpDate)}}className="left"><FontAwesomeIcon icon={faAngleLeft} /></motion.div>
                <div className="center">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    {new Date(date).toLocaleDateString("fr")}
                </div>
                <motion.div whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} 
                            onClick={() => {var tmpDate = new Date(date).setDate(new Date(date).getDate() + 1); setDate(tmpDate)}} className="right"><FontAwesomeIcon icon={faAngleRight}/></motion.div>
                
            </div>
            <div className='FoodContainer'>
                <Repas repas={breakfast} type="breakfast" date={new Date(date)} setTotalCal={setTotalCalMAT} setTotalGlu={setTotalGluMAT} setTotalProt={setTotalProtMAT} setTotalLip={setTotalLipMAT}/>
                <Repas repas={lunch} type="lunch" date={new Date(date)} setTotalCal={setTotalCalMID} setTotalGlu={setTotalGluMID} setTotalProt={setTotalProtMID} setTotalLip={setTotalLipMID}/>
                <Repas repas={dinner} type="dinner" date={new Date(date)} setTotalCal={setTotalCalSOIR} setTotalGlu={setTotalGluSOIR} setTotalProt={setTotalProtSOIR} setTotalLip={setTotalLipSOIR}/>
                <Repas repas={snack} type="snack" date={new Date(date)} setTotalCal={setTotalCalSNA} setTotalGlu={setTotalGluSNA} setTotalProt={setTotalProtSNA} setTotalLip={setTotalLipSNA}/>
            </div>
        </div>
    );
}