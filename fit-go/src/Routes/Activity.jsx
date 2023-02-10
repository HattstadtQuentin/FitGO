import React, {useState, useRef } from 'react';
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

import 'swiper/scss';
import 'swiper/scss/scrollbar';

export default function Activity() {
    const [swiperInfos, setSwiperInfos] = useState(null);
    const [indexActivity, setIndexActivity] = useState(0);
    const [timer, setTimer] = useState( 0, 0, 0 );

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

    const onChangeTimer = (hours, minutes, seconds) => {
        setTimer({ hours, minutes, seconds });
        if(hours === 0 && minutes === 0 && seconds === 0) {
            setIsGoodTimer(false);
        } else {
            setIsGoodTimer(true);
        }
      };

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
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={'seanceCard ' + ((selectedOption !== '' && selectedOption !== 'chest') ? 'hide' : '')}
                            >
                                <img src={ChestTraining} />
                                <div className='seanceInfos'>
                                    <div className='titleSeance'>Seance Pec / Triceps</div>
                                    <div className='desc'>5 exercices • 1h • 300kcal</div>
                                </div>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={'seanceCard ' + ((selectedOption !== '' && selectedOption !== 'back') ? 'hide' : '')}
                            >
                                <img src={BackTraining} />
                                <div className='seanceInfos'>
                                    <div className='titleSeance'>Seance Dos / Biceps</div>
                                    <div className='desc'>6 exercices • 1h20min • 270kcal</div>
                                </div>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={'seanceCard ' + ((selectedOption !== '' && selectedOption !== 'leg') ? 'hide' : '')}
                            >
                                <img src={LegTraining} />
                                <div className='seanceInfos'>
                                    <div className='titleSeance'>Seance Jambes</div>
                                    <div className='desc'>4 exercices • 40min • 400kcal</div>
                                </div>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={'seanceCard ' + ((selectedOption !== '' && selectedOption !== 'fullbody') ? 'hide' : '')}
                            >
                                <img src={FullBodyTraining} />
                                <div className='seanceInfos'>
                                    <div className='titleSeance'>Seance FullBody</div>
                                    <div className='desc'>7 exercices • 2h • 600kcal</div>
                                </div>
                            </motion.div>
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
                                    <input type="number" placeholder='0' onChange={e => onChangeTimer(e.target.value, timer[1], timer[2])}/>
                                    <p>h</p>
                                </div>
                                <div className='durationCard'>
                                    <input type="number" placeholder='0' onChange={e => onChangeTimer(timer[0], e.target.value, timer[2])}/>
                                    <p>m</p>
                                </div>
                                <div className='durationCard'>
                                    <input type="number" placeholder='0' onChange={e => onChangeTimer(timer[0], timer[1], e.target.value)}/>
                                    <p>s</p>
                                </div>
                            </div>
                        </div>
                        <motion.button className={!isGoodTimer ? 'notReady' : ''}
                            whileHover={timer === null ? '': { scale: 1.1 }}
                            whileTap={timer === null ? '' : { scale: 0.9 }}>
                                Go !
                        </motion.button>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
}