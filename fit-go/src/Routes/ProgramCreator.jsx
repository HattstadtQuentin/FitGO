import React, {useState, useRef, useEffect} from 'react';
import '../styles/Routes/ProgramCreator.scss';
import { motion } from "framer-motion";
import RunningImage from "../styles/Images/running_person.jpg";
import ChestTraining from "../styles/Images/chest_training.jpg";
import BackTraining from "../styles/Images/back_training.jpg";
import LegTraining from "../styles/Images/leg_training.jpg";
import FullBodyTraining from "../styles/Images/fullbody_training.jpg";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import MuscuProgram from '../Components/MuscuProgram';
import Exercice from '../Components/Exercice';
import TimeConvertor from '../Functions/TimeConvertor';
import { getWorkouts, createWorkout, deleteWorkout, getExercices } from '../Functions/HandlingWorkout';
import { getImageWorkoutTypeSrc } from '../Components/ImageWorkoutType';
import { toast } from 'react-toastify';
import StartedActivity from '../Components/StartedActivity';

export default function ProgramCreator() {
    const [startedActivity, setStartedActivity] = useState(null);

    const [workouts, setWorkouts] = useState(null);
    const [exercices, setExercices] = useState(null);

    const [hotReload, setHotReload] = useState(true);

    useEffect(() => {
        getWorkouts()
          .then((res) => {
            setWorkouts(res.data);
          });
        getExercices()
          .then((res) => {
            setExercices(res.data);
          });
      }, [hotReload]);

    const options = [
    {
        label: 'Push',
        value: 'push',
    },
    {
        label: 'Pull',
        value: 'pull',
    },

    {
        label: 'Legs',
        value: 'legs',
    },
    {
        label: 'Upper Body',
        value: 'upperbody',
    },
    {
        label: 'Lower Body',
        value: 'lowerbody',
    },
    {
        label: 'Full Body',
        value: 'fullbody',
    },
    ];

    const select = useRef(null);
    const [selectedOption, setSelectedOption] = useState('Type de seance');
    const handleChangeStep = step => {
        setStep(step);
    }

    const [step, setStep] = useState(1);
    const [isModalActive, setIsModalActive] = useState(false);

    const [seanceName, setSeanceName] = useState('');
    const [seanceType, setSeanceType] = useState('');

    const [isGoodStep1, setIsGoodStep1] = useState(false);
    const [isGoodStep2, setIsGoodStep2] = useState(false);
    const [exoSelected, setExoSelected] = useState([]); 

    useEffect(() => {   
        if(seanceName !== '' && seanceType !== 'Type de seance'){
            setIsGoodStep1(true);
        } else {
            setIsGoodStep1(false);
        }
        if(exoSelected && exoSelected.length > 0) {
            setIsGoodStep2(true);
        } else {
            setIsGoodStep2(false);
        }
    }, [seanceName, seanceType, exoSelected]);

    useEffect(() => {   
    }, [exoSelected]);

    const ExerciceObj = (exoId, nom, nbSeries, cal, duree) => { return { exoId: exoId, nom: nom, nbSeries: nbSeries, cal: cal, duree: duree} }

    const handleSelectExo = (exoId, nom, nbSeries, cal, duree, state) => {
        if(step == 2){
            if(state === false){
                setExoSelected(prevExoSelected => prevExoSelected.filter((exoSelected) => exoSelected.exoId !== exoId));
            } else {
                setExoSelected(prevExoSelected => [...prevExoSelected, ExerciceObj(exoId, nom, nbSeries, cal, duree)]);
                
            }
        }
    }

    const getCreatedWorkoutInfos = () => {
        var totalDuration = 0;
        var totalCal = 0;
        exoSelected.map(exercice => {
            totalDuration += exercice.duree;
            totalCal += exercice.cal;
        });

        return { nbExo: exoSelected.length, duration: totalDuration, cal: totalCal};
    }

    const handleCreateWorkout = () => {
        createWorkout(seanceName, seanceType, getCreatedWorkoutInfos().nbExo, getCreatedWorkoutInfos().duration, getCreatedWorkoutInfos().cal, exoSelected[0].exoId, exoSelected[1]? exoSelected[1].exoId : null, exoSelected[2]? exoSelected[2].exoId : null, exoSelected[3]? exoSelected[3].exoId : null, exoSelected[4]? exoSelected[4].exoId : null, exoSelected[5]? exoSelected[5].exoId : null, exoSelected[6]? exoSelected[6].exoId : null, exoSelected[7]? exoSelected[7].exoId : null, exoSelected[8]? exoSelected[8].exoId : null, exoSelected[9]? exoSelected[9].exoId : null,).then(() => {
            setIsModalActive(false);
            setStep(1);
            setHotReload(!hotReload);
            setExoSelected([]);
            setSeanceName('');
            setSeanceType('');
            toast.success("Séance Crée !", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        });
        }
    
        const handleDeleteWorkout = (idProgramme, setHotReloadChild, hotReload) => {
            deleteWorkout(idProgramme).then(() => {
                setHotReloadChild(!hotReload);
                toast.success("Séance Supprimé !", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            });
            }

    return (
        <div className="Program">
            <div className='header'>
                    <div className="title">
                        Gestion Programmes
                    </div>
                    <motion.div className='plusIcon' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={() => setIsModalActive(true)}><FontAwesomeIcon icon={faPlus} /></motion.div>
                    
            </div>
            <div className='trier'>
                <div className='titleTrier'>Trier par</div>
                <select
                    ref={select}
                    defaultValue={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                >
                    <option className='.select-items' value='Type de seance' disabled hidden style={{ fontFamily: 'Arial' }}>Type de seance</option>
                    {options.map(o => (
                    <option className='.select-items' key={o.value} value={o.value} style={{ fontFamily: 'Arial' }}>{o.label}</option>
                    ))}
                </select>
                <motion.div className='seeLess' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} onClick={() => {select.current.selectedIndex = 0; setSelectedOption('Type de seance')}}>
                    <FontAwesomeIcon  className="trash" icon={faTrashCan}  onClick={() => {select.current.selectedIndex = 0; setSelectedOption('Type de seance')}}/>
                </motion.div>
            </div>
            <Scrollbars style={{ height: "90%", width: "90%" }}>
                {workouts !== null && workouts.map((workout, key) => {
                    return (
                        <MuscuProgram key={key} idProgramme={workout.idProgramme} title={workout.nom} nbExos={workout.nbExo} cal={workout.cal} duration={workout.duree} image={getImageWorkoutTypeSrc(workout.type)} expanded={false} visible={true} global={workout.global} handleDelete={handleDeleteWorkout} setHotReload={setHotReload} hotReload={hotReload} startActivity={setStartedActivity} />
                    );
                })}
            </Scrollbars>

            {isModalActive &&
                <div className='modalBackground' onClick={() => setIsModalActive(false)}>
                    <div className='modalCreate' onClick={(e) =>  e.stopPropagation()}>
                        <div className='modalTitle'>
                            CREER TA SEANCE 
                        </div>
                        <div className='steps'>
                            <div className='step activated'>
                                1
                            </div>
                            <div className={"ligne " + ( step >= 2 ? "activated" : "")} ><div className={"ligne-content " + ( step == 1 ? "current" : "")}>&nbsp;</div></div>
                            <div className={"step " + ( step >= 2 ? "activated" : "")} >
                                2
                            </div>
                            <div className={"ligne " + ( step >= 3 ? "activated" : "")} ><div className={"ligne-content " + ( step == 2 ? "current" : "")}>&nbsp;</div></div>
                            <div className={"step " + ( step >= 3 ? "activated" : "")}>
                                3
                            </div>
                        </div>

                        {
                            step == 1 &&
                            <div className='step'>
                                <div className='titleStep'>
                                    Informations Générale
                                </div>
                                <div className='contentStep'>
                                    <div class='inputWrapper'>
                                        <div className='inputContainer'>
                                            <input value={seanceName} type="text" placeholder='Nom de la seance' onChange={e => setSeanceName(e.target.value)}/>
                                        </div>

                                        <div className='inputContainer'>
                                            <select
                                                ref={select}
                                                value={seanceType}
                                                onChange={e => setSeanceType(e.target.value)}
                                            >
                                                <option className='.select-items' value='' selected disabled hidden>Type de seance</option>
                                                {options.map(o => (
                                                <option className='.select-items' key={o.value} value={o.value} style={{ fontFamily: 'Arial' }}>{o.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='btnContainer'>
                                        <motion.button
                                            className='before'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsModalActive(false)}
                                        >
                                                Annuler
                                        </motion.button>
                                        <motion.button
                                            className={!isGoodStep1 ? 'notReady' : ''}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => isGoodStep1 ? setStep(2) : null}
                                        >
                                                Suivant
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            step == 2 &&
                            <div className='step'>
                                <div className='titleStep titleStep2'>
                                    Ajout d'exercices
                                </div>
                                <div className='contentStep contentStep2'>
                                    <div class='inputWrapper inputWrapper2'>
                                        <div className='inputContainer'>
                                            <input type="text" placeholder='Rechercher un exercice'/>
                                        </div>
                                    </div>
                                    <Scrollbars style={{ height: "90%", width: "100%", marginTop: "-10%" }}>
                                        {exercices !== null && exercices.map((exercice, key) => {
                                            return (
                                                 <Exercice key={key} id={exercice.idExo} title={exercice.nom} nbSerie={exercice.nbSeries} cal={exercice.cal} duration={(exercice.tempsRepos * 3 ) * exercice.nbSeries} image={ChestTraining} visible={true} handleSelected={handleSelectExo} recap={false}/>
                                            );
                                        })}
                                    </Scrollbars>
                                    <div className='btnContainer'>
                                        <motion.button
                                            className='before'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setStep(1)}
                                        >
                                                Retour
                                        </motion.button>
                                        <motion.button
                                            className={!isGoodStep2 ? 'notReady' : ''}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => isGoodStep2 ? setStep(3) : null}
                                        >
                                                Suivant
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            step == 3 &&
                            <div className='step'>
                                <div className='titleStep titleStep2'>
                                    Recapitulatif
                                </div>
                                <div className='contentStep contentStep2'>
                                    <div class='statsWrapper'>
                                        <div className='statsContainer'>
                                            <div className='statsTitle'>
                                                {getCreatedWorkoutInfos().nbExo}
                                            </div>
                                            <div className='statsDesc'>
                                                Exercices
                                            </div>
                                        </div>
                                        <div className='statsContainer'>
                                            <div className='statsTitle'>
                                                <TimeConvertor seconds={getCreatedWorkoutInfos().duration}/>
                                            </div>
                                            <div className='statsDesc'>
                                                Durée
                                            </div>
                                        </div>
                                        <div className='statsContainer'>
                                            <div className='statsTitle'>
                                                {getCreatedWorkoutInfos().cal}
                                            </div>
                                            <div className='statsDesc'>
                                                Calories
                                            </div>
                                        </div>
                                    </div>
                                    <Scrollbars style={{ height: "80%", width: "100%"}}>
                                        {exoSelected.map((exercice, key) => {
                                            return (
                                                 <Exercice key={key} id={exercice.exoId} title={exercice.nom} nbSerie={exercice.nbSeries} cal={exercice.cal} duration={exercice.duree} image={ChestTraining} visible={true} handleSelected={handleSelectExo} recap={true}/>
                                            );
                                        })}
                                    </Scrollbars>
                                    <div className='btnContainer'>
                                        <motion.button
                                            className='before'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setStep(2)}
                                        >
                                                Retour
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handleCreateWorkout}
                                        >
                                                Créer
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>        
            }
            {
                startedActivity !== null && <StartedActivity idProgramme={startedActivity} quit={setStartedActivity}/>
            }
        </div>
    );
}