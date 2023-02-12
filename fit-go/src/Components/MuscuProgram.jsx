import React, {useState} from 'react';
import '../styles/Components/MuscuProgram.scss';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import TimeConvertor from '../Functions/TimeConvertor';

export default function MuscuProgram({idProgramme, title, nbExos, cal, duration, image, expanded, visible, global, handleDelete, setHotReload, hotReload, startActivity}) {
    const [isExpanded, setIsExpanded] = useState(expanded);
    return (
        isExpanded ?
        <div className={"workoutContainer " + (visible ? "" : "hide")}>
            <motion.div className='seeLess' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={() => setIsExpanded(false)}><FontAwesomeIcon icon={faAngleDown} /></motion.div>
            <div className='nextWorkoutTitle'>
                {title}
            </div>
            <div className='content'>
                <div className='left'>
                    <img src={image}/>
                    <div className='btnContainer'>
                        { global === 'N' &&
                            <motion.button
                                className='edition'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(idProgramme, setHotReload, hotReload)}>
                                    Supprimer
                            </motion.button>
                        }
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startActivity(idProgramme)}>
                                Lancer
                        </motion.button>
                    </div>
                </div>
                <div className='right'>
                    <div className='infoCard'>
                        <div className='title'>{nbExos}</div>
                        <div>Exercices</div>
                    </div>
                    <div className='infoCard'>
                        <div className='title'><TimeConvertor seconds={duration}/></div>
                        <div>Durée</div>
                    </div>
                    <div className='infoCard'>
                        <div className='title'>{cal}</div>
                        <div>Calories</div>
                    </div>
                </div>
            </div>
        </div> : 

        <motion.div
        className={"seanceCard " + (visible ? "" : "hide")}
        >
            <img src={image} />
            <div className='seanceInfos'>
                <div className='titleSeance'>{title}</div>
                <div className='desc'>{nbExos} exercices • <TimeConvertor seconds={duration}/> • {cal}kcal</div>
            </div>
            <motion.div className='seeMore' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={() => setIsExpanded(true)}><FontAwesomeIcon icon={faAngleRight} /></motion.div>
        </motion.div>
                
    );
}