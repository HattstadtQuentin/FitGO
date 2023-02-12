import React, {useState, useMemo, useEffect} from 'react';
import '../styles/Components/StartedActivity.scss';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBullseye, faHourglassHalf, faFireFlameCurved, faPlay, faPause, faFlagCheckered, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { getWorkoutById, getExerciceById } from '../Functions/HandlingWorkout';
import TimeConvertor from '../Functions/TimeConvertor';
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function StartedActivity({idProgramme, quit, running=false, time=0}) {
    const [workout, setWorkout] = useState(null);
    const [exercices, setExercices] = useState([]);

    const [fixUp, setFixUp] = useState(true);

    const [pendingSerie, setPendingSerie] = useState(0);
    const [pendingExercice, setPendingExercice] = useState(0);
    const ExerciceObj = (exoId, nom, nbSeries, cal, tempsRepos) => { return { exoId: exoId, nom: nom, nbSeries: nbSeries, cal: cal, tempsRepos: tempsRepos} }

    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepos, setIsRepos] = useState(false);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    const citation = [
        " Votre corps peut presque tout faire, c'est votre tête qui a besoin d'en être convaincue. ",
        " Même le dernier d'une course est devant ceux qui ne courent pas. ",
        " Marcher sur la lune est compliqué, pas marcher jusqu'à la salle. ",
        " Si tu te décourages, souviens toi pourquoi tu as commencé. ", 
        " Se convaincre que tu en es capable, c'est déjà la moitié du chemin. ",
        " Ce n'est pas la force du corps qui compte, mais la force de l'esprit. ",
        " Réveille-toi avec détermination, endors-toi avec satisfaction. ",
        " La difficulté n'est pas l'escalier, c'est la première marche. ",
        " C'est dans l'inconfort que l'on devient plus fort. "
    ]

    const [currentCitation, setCurrentCitation] = useState(citation[getRandomInt(citation.length)])

    useEffect(() => {
        if(!running) {
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
        }
      }, []);

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


    const handlePlay = () => {
        if(isRepos && isPlaying){
            setIsPlaying(false);
        } else if(isRepos && !isPlaying) {
            setIsPlaying(true);
        } else if(!isRepos && !isPlaying) {
            setIsPlaying(true);
            setIsRepos(true);
        }
    }

    const handleEndRepos = () => {
        setIsRepos(false);
        setIsPlaying(false);
        setCurrentCitation(citation[getRandomInt(citation.length)]);
        var actualSerie = pendingSerie + 1;
        var actualExercice = pendingExercice;
        if(actualSerie == exercices[pendingExercice].nbSeries){
            actualSerie = 0;
            actualExercice = pendingExercice + 1;
            if(actualExercice == workout.nbExo){
                actualExercice = 0;
                toast.success("Séance Terminée !", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                quit(null);
            }
        } 

        setPendingSerie(actualSerie);
        setPendingExercice(actualExercice);
    }

    const handleEndReposRun = () => {
        setIsRepos(false);
        setIsPlaying(false);
        toast.success("Séance Terminée !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
        quit(null);
    }

    return (
        <div className="startedActivity">
            { running &&
            <>
            <div className="headerStartedActivity">
                <motion.div className='back'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quit(null)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </motion.div>
                <div>RUNNING</div>
            </div>
            <div className='isRepos'>{isRepos ? "COURSE" : "DEPART"}</div>
            <motion.div className="exerciceContainer">
                <div className='titleExercice'>
                    COURSE <div><span className='current'>{pendingExercice + 1}</span><span>{' / ' + 1}</span></div>
                </div>
                <div className='exerciceContent'>
                    <div className='infoCard'>
                        <FontAwesomeIcon className='icon' icon={faBullseye} />
                        <div><span className='current'>{(pendingSerie + 1)}</span>{ ' / ' + (1)}</div>
                    </div>
                    <div className='infoCard'>
                        <FontAwesomeIcon className='icon' icon={faHourglassHalf} />
                        <TimeConvertor seconds={time}/>
                    </div>
                    <div className='infoCard'>
                        <FontAwesomeIcon className='icon' icon={faFireFlameCurved} /> 
                        <div>{0.1*time}kcal</div>
                    </div>
                </div>

            </motion.div>

            { isRepos && <CountdownCircleTimer
                className='countdown'
                isPlaying={isPlaying}
                duration={(time)}
                colors={['#D3F902']}
                colorsTime={[(time)]}
                strokeWidth={20}
                onComplete={handleEndReposRun}
            >
                {({ remainingTime }) => <div className="remainingTime">{remainingTime}</div>}
            </CountdownCircleTimer>
            }
            { !isRepos && <div
                className='citation'

            ><FontAwesomeIcon className='icon' icon={faQuoteLeft} />
            {currentCitation}
            <FontAwesomeIcon className='icon' icon={faQuoteRight} />
            </div>
            }
            
            <motion.button
                className='start'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}>
                    <FontAwesomeIcon icon={!isRepos ? faFlagCheckered : !isPlaying ? faPlay : faPause} />
            </motion.button>
            </>
            }
            {!running && workout !== null && workout !== undefined &&
            <>
            <div className="headerStartedActivity">
                <motion.div className='back'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => quit(null)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </motion.div>
                <div>{workout.nom}</div>
            </div>
            <div className='isRepos'>{isRepos ? "REPOS" : "ENTRAINEMENT"}</div>
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

            { isRepos && <CountdownCircleTimer
                className='countdown'
                isPlaying={isPlaying}
                duration={(exercices[0] ? exercices[0].tempsRepos : 0)}
                colors={['#D3F902']}
                colorsTime={[(exercices[0] ? exercices[0].tempsRepos : 0)]}
                strokeWidth={20}
                onComplete={handleEndRepos}
            >
                {({ remainingTime }) => <div className="remainingTime">{remainingTime}</div>}
            </CountdownCircleTimer>
            }
            { !isRepos && <div
                className='citation'

            ><FontAwesomeIcon className='icon' icon={faQuoteLeft} />
               {currentCitation}
               <FontAwesomeIcon className='icon' icon={faQuoteRight} />
            </div>
            }
            
            <motion.button
                className='start'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}>
                    <FontAwesomeIcon icon={!isRepos ? faFlagCheckered : !isPlaying ? faPlay : faPause} />
            </motion.button> 
        </>
        }
            
    </div> 
          
    );
}