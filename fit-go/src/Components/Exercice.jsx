import React, {useState, useEffect} from 'react';
import '../styles/Components/Exercice.scss';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Exercice({id, title, nbSerie, cal, duration, image, visible, handleSelected, recap}) {
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {   
        handleSelected(id, isAdded);
    }, [isAdded]);

    return (
        <motion.div
        className={"exoCard " + (visible ? "" : "hide ") + (!recap ? "" : "recap")}
        >
            <img src={image} />
            <div className={'exoInfos ' }>
                <div className='exoTitle'>{title}</div>
                <div className='desc'>{nbSerie} series • {duration}min • {cal}kcal</div>
            </div>
            {!recap &&
            <motion.div className='add' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={() => setIsAdded(!isAdded)}><FontAwesomeIcon icon={isAdded ? faCheck : faPlus} /></motion.div>
                                }
        </motion.div>
                
    );
}