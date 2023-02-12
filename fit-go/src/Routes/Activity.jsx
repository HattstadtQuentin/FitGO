import React, {useState, useRef, useEffect } from 'react';
import '../styles/Routes/Activity.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import DumbellImage from "../styles/Images/musculation_dumbell.jpg";
import RunningImage from "../styles/Images/running_person.jpg";
import ChestTraining from "../styles/Images/chest_training.jpg";
import BackTraining from "../styles/Images/back_training.jpg";
import LegTraining from "../styles/Images/leg_training.jpg";
import FullBodyTraining from "../styles/Images/fullbody_training.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { getWorkouts } from '../Functions/HandlingWorkout';
import ImageWorkoutType from '../Components/ImageWorkoutType';
import TimeConvertor from '../Functions/TimeConvertor'; 
import StartedActivity from '../Components/StartedActivity';

import 'swiper/scss';
import 'swiper/scss/scrollbar';

export default function Activity() {
    const [startedActivity, setStartedActivity] = useState(null);
    const [swiperInfos, setSwiperInfos] = useState(null);
    const [indexActivity, setIndexActivity] = useState(0);
    const [timer, setTimer] = useState( 0, 0, 0 );
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        getWorkouts()
          .then((res) => {
            setWorkouts(res.data);
          });
      }, []);

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
    const [selectedOption, setSelectedOption] = useState('')

    const [isGoodTimer, setIsGoodTimer] = useState(false);

    
    const hourRef = useRef();
    const minuteRef = useRef();
    const secondRef = useRef();

    const onChangeTimer = () => {
        if(hourRef.current.value === '' && minuteRef.current.value === '' && secondRef.current.value === '') {
            setIsGoodTimer(false);
        } else {
            var tmp = (hourRef.current.value !== '' ? parseInt(hourRef.current.value  , 10 )*3600 : 0) + (minuteRef.current.value  !== '' ? parseInt(minuteRef.current.value , 10 )*60 : 0) + (secondRef.current.value !== '' ? parseInt(secondRef.current.value , 10 ) * 1 : 0);
            setTime(tmp);
            setIsGoodTimer(true);
        }
      };

    const handleStartRunning = () => {
        if(isGoodTimer )
         {
            setIsRunning(true); 
            setStartedActivity(0); 
        }
    }

    return (
        <div className="Activity">
            <div className='title'>FitGO</div>
            <div className='pagination'>
                <div className={`circle ${indexActivity === 0 ? 'active' : ''}`}>
                    &nbsp;
                </div>
                <div className={`circle ${indexActivity === 1 ? 'active' : ''}`}>
                    &nbsp;
                </div>
            </div>
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={setSwiperInfos}
                onSlideChange={() => setIndexActivity(swiperInfos.realIndex)}
                >
                <SwiperSlide className="musculation">
                    <div className='top'>
                        <div className='titleTop'>
                            MUSCULATION
                            <div className='additionalInfos'>
                                ≈ 1h • 300kcal • Moyen
                            </div>
                        </div>
                        <div className='imgContainer'>
                            <img src={DumbellImage} />
                        </div>
                    </div>
                    <div className='bottom'>
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
                            <FontAwesomeIcon onClick={() => {select.current.selectedIndex = 0; setSelectedOption('')}} className="trash" icon={faTrashCan} />
                        </div>
                        <Scrollbars className="seanceList" style={{ height: "90%" }}>
                            {workouts !== null && workouts.map((workout, key) => {
                                return (
                                    <motion.div
                                    key={key}
                                    whileTap={{ scale: 0.9 }}
                                    className={'seanceCard ' + ((selectedOption !== '' && selectedOption !== 'chest') ? 'hide' : '')}
                                    onClick={() => setStartedActivity(workout.idProgramme)}
                                    >
                                        <ImageWorkoutType type={workout.type} />
                                        <div className='seanceInfos'>
                                            <div className='titleSeance'>{workout.nom}</div>
                                            <div className='desc'>{workout.nbExo} exercices • <TimeConvertor seconds={workout.duree}/> • {workout.cal}kcal</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </Scrollbars>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="musculation">
                    <div className='top'>
                        <div className='titleTop'>
                            RUNNING
                            <div className='additionalInfos'>
                                ≈ 30min • 350kcal • Forte
                            </div>
                        </div>
                        <div className='imgContainer'>
                            <img src={RunningImage} />
                        </div>
                    </div>
                    <div className='bottomRunning'>
                        <div className='timerInputContainer'>
                            <div className='titleTimer'>
                                Durée
                            </div>
                            <div className='durationChoose'>
                                <div className='durationCard'>
                                    <input ref={hourRef} type="number" placeholder='0' onChange={e => onChangeTimer()}/>
                                    <p>h</p>
                                </div>
                                <div className='durationCard'>
                                    <input ref={minuteRef} type="number" placeholder='0' onChange={e => onChangeTimer()}/>
                                    <p>m</p>
                                </div>
                                <div className='durationCard'>
                                    <input ref={secondRef} type="number" placeholder='0' onChange={e => onChangeTimer()}/>
                                    <p>s</p>
                                </div>
                            </div>
                        </div>
                        <motion.button className={!isGoodTimer ? 'notReady' : ''}
                            whileHover={timer === null ? '': { scale: 1.1 }}
                            whileTap={timer === null ? '' : { scale: 0.9 }}
                            onClick={handleStartRunning}>
                                Go !
                        </motion.button>
                    </div>
                </SwiperSlide>
            </Swiper>
            {
                startedActivity !== null && <StartedActivity idProgramme={startedActivity} quit={setStartedActivity} running={isRunning} time={time} setRunning={setIsRunning}/>
            }                    
        </div>
    );
}