import React, {useState, useMemo, useEffect} from 'react';
import '../styles/Components/StartedActivity.scss';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBullseye, faHourglassHalf, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { getWorkoutById, getExerciceById } from '../Functions/HandlingWorkout';
import TimeConvertor from '../Functions/TimeConvertor';

export default function StartedActivity({idProgramme, quit}) {
    const [workout, setWorkout] = useState(null);
    const [exercices, setExercices] = useState([]);

    const [fixUp, setFixUp] = useState(true);

    const [pendingSerie, setPendingSerie] = useState(0);
    const [pendingExercice, setPendingExercice] = useState(0);
    const ExerciceObj = (exoId, nom, nbSeries, cal, tempsRepos) => { return { exoId: exoId, nom: nom, nbSeries: nbSeries, cal: cal, tempsRepos: tempsRepos} }

    useEffect(() => {
        getWorkoutById(idProgramme)
          .then((res) => {
            setWorkout(res);
            Object.keys(res).map((keyname, value) => {
                if(keyname == 'exo1' || keyname == 'exo2' || keyname == 'exo3' || keyname == 'exo4' || keyname == 'exo5' || keyname == 'exo6' || keyname == 'exo7' || keyname == 'exo8' || keyname == 'exo9' || keyname == 'exo10')
                {
                    if(res[keyname] !== null){
                        getExerciceById(res[keyname]).then((res) => {
                            if(res != null)
                            {
                                let alreadyIn = false;
                                exercices.map(exercice => {
                                    
                                    if(exercice.exoId = res.idExercice){
                                        alreadyIn = true;
                                    }
                                })
                                if(!alreadyIn){
                                    setExercices(prevExo => [...prevExo, ExerciceObj(res.idExercice, res.nom, res.nbSeries, res.cal, res.tempsRepos)]);
                                    setFixUp(!fixUp);
                                } 
                            }
                        });
                    }
                }
            });
          });
      }, []);

      function getUnique(array, key) {
        if (typeof key !== 'function') {
          const property = key;
          key = function(item) { return item[property]; };
        }
        return Array.from(array.reduce(function(map, item) {
          const k = key(item);
          if (!map.has(k)) map.set(k, item);
          return map;
        }, new Map()).values());
      }

    useEffect(() => {
        const uniqueIds = [];
        const uniqueExercices = exercices.filter(element => {
            const isDuplicate = uniqueIds.includes(element.exoId);
          
            if (!isDuplicate) {
              uniqueIds.push(element.exoId);
          
              return true;
            }
          
            return false;
        });

        if(uniqueIds != []){
            setExercices(uniqueExercices);
        }
    }, [fixUp]);
    return (
        workout !== null && workout !== undefined &&
       <div className="startedActivity">
            <div className="headerStartedActivity">
                <motion.div className='back'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quit(null)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </motion.div>
                <div>{workout.nom}</div>
            </div>
            <motion.div className="exerciceContainer">
                <div className='titleExercice'>
                    {exercices[0] ? exercices[0].nom : "ZEBI"} <div><span className='current'>{pendingExercice + 1}</span><span>{' / ' + workout.nbExo}</span></div>
                </div>
                <div className='exerciceContent'>
                    <div className='infoCard'>
                        <FontAwesomeIcon className='icon' icon={faBullseye} />
                        <div><span className='current'>{(pendingSerie + 1)}</span>{ ' / ' + (exercices[0] ? exercices[0].nbSeries : "ZEBI")}</div>
                    </div>
                    <div className='infoCard'>
                        <FontAwesomeIcon className='icon' icon={faHourglassHalf} />
                        <TimeConvertor seconds={exercices[0] ? exercices[0].tempsRepos : 0}/>
                    </div>
                    <div className='infoCard'>
                        <FontAwesomeIcon className='icon' icon={faFireFlameCurved} /> 
                        <div>{exercices[0] ? exercices[0].cal : "ZEBI"}kcal</div>
                    </div>
                </div>

            </motion.div>
       </div>     
    );
}