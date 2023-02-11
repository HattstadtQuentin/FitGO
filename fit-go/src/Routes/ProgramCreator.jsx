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

export default function ProgramCreator() {
    const options = [
    {
        label: 'Pec / Triceps',
        value: 'chest',
    },
    {
        label: 'Dos / Biceps',
        value: 'back',
    },
    {
        label: 'Jambes',
        value: 'leg',
    },
    {
        label: 'FullBody',
        value: 'fullbody',
    },
    ];

    const select = useRef(null);
    const [selectedOption, setSelectedOption] = useState('');
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
        if(seanceName !== '' && seanceType !== ''){
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
        console.log(exoSelected);
    }, [exoSelected]);



    const handleSelectExo = (exoId, state) => {
        if(state === false){
            setExoSelected(prevExoSelected => prevExoSelected.filter((exoSelected) => exoSelected !== exoId));
        } else {
            setExoSelected(prevExoSelected => [...prevExoSelected, exoId]);
        }
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
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                >
                    <option className='.select-items' value='' selected disabled hidden>Type de seance</option>
                    {options.map(o => (
                    <option className='.select-items' key={o.value} value={o.value} style={{ fontFamily: 'Arial' }}>{o.label}</option>
                    ))}
                </select>
                <motion.div className='seeLess' whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}>
                    <FontAwesomeIcon onClick={() => {select.current.selectedIndex = 0; setSelectedOption('')}} className="trash" icon={faTrashCan} />
                </motion.div>
            </div>
            <Scrollbars style={{ height: "90%", width: "90%" }}>
                <MuscuProgram title={"Seance Pec / Triceps"} nbExos={5} cal={300} duration={1} image={ChestTraining} expanded={false} visible={true}/>
                <MuscuProgram title={"Seance Dos / Biceps"} nbExos={6} cal={270} duration={1.20} image={BackTraining} expanded={false} visible={true}/>
                <MuscuProgram title={"Seance Jambes"} nbExos={4} cal={400} duration={.40} image={LegTraining} expanded={false} visible={true}/>
                <MuscuProgram title={"Seance FullBody"} nbExos={7} cal={600} duration={2} image={FullBodyTraining} expanded={false} visible={true}/>
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
                                        <Exercice id={1} title={"Tirage Nuque"} nbSerie={5} cal={300} duration={20} image={ChestTraining} visible={true} handleSelected={handleSelectExo} recap={false}/>
                                        <Exercice id={2} title={"Developpé Couché"} nbSerie={4} cal={270} duration={40} image={BackTraining} visible={true} handleSelected={handleSelectExo} recap={false}/>
                                        <Exercice id={3} title={"Presse Jambe"} nbSerie={4} cal={400} duration={30} image={LegTraining} visible={true} handleSelected={handleSelectExo} recap={false}/>
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
                                            onClick={() => setStep(3)}
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
                                                5
                                            </div>
                                            <div className='statsDesc'>
                                                Exercices
                                            </div>
                                        </div>
                                        <div className='statsContainer'>
                                            <div className='statsTitle'>
                                                2h
                                            </div>
                                            <div className='statsDesc'>
                                                Durée
                                            </div>
                                        </div>
                                        <div className='statsContainer'>
                                            <div className='statsTitle'>
                                                320
                                            </div>
                                            <div className='statsDesc'>
                                                Calories
                                            </div>
                                        </div>
                                    </div>
                                    <Scrollbars style={{ height: "80%", width: "100%"}}>
                                        <Exercice id={1} title={"Tirage Nuque"} nbSerie={5} cal={300} duration={20} image={ChestTraining} visible={true} handleSelected={handleSelectExo} recap={true}/>
                                        <Exercice id={2} title={"Developpé Couché"} nbSerie={4} cal={270} duration={40} image={BackTraining} visible={true} handleSelected={handleSelectExo} recap={true}/>
                                        <Exercice id={3} title={"Presse Jambe"} nbSerie={4} cal={400} duration={30} image={LegTraining} visible={true} handleSelected={handleSelectExo} recap={true}/>
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
                                            onClick={() => setStep(2)}
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
        </div>
    );
}