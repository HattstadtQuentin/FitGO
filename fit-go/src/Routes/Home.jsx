import React, {useState} from 'react';
import '../styles/Routes/Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsis, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";

export default function Home() {
	//Partie calcul des mois
	function getDaysInMonth(year, month) {
		return new Date(year, month, 0).getDate();
	}
	const current = new Date();

    const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const [month, setMonth] = useState(current.getMonth());
	const [year, setYear] = useState(current.getFullYear());


	var firstOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
	var divJours = [];

	const min = -1;
	const max = 3;
	const rand = min + Math.random() * (max - min);

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};
	const [modalOpen, setModalOpen] = useState(false);

	const close = () => {
		setModalOpen(false);
		console.log("Close modal");
	};
	const open = () => {
		setModalOpen(true);
		console.log("Open modal");
	};

	const onClickDivJour = (e) => {
		// if(modalOpen ? close() : open()
		console.log("Position y: " + e.clientY);
	};
	const onClickDivEvent = (e) => {
		// if(modalOpen ? close() : open()
		console.log("Position y EVENT: " + e.clientY);
	};

    const days = [
        "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"
    ]
    console.log(((firstOfMonth.getDay()-8)%7)*-1);

    for(var i = 0; i < 7; i++){
        divJours.push(
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
                layoutId={i}
                onClick={(e) => onClickDivJour(e)}
                key={i}
                className={`planningCardHeader`}
            >
                {days[i]}
            </motion.div>
        );
    }
    for (var i = 0; i <((firstOfMonth.getDay()-1)%7);i++) {
        divJours.push(
            <motion.div
                key={i+10}
                variants={item}
                className={`planningCardPlaceholder`}
            >
                &nbsp;
            </motion.div>
        );
    }
    for (var i = 0; i < getDaysInMonth(current.getFullYear(), month + 1); i++) {
        var monthDate = month < 10 ? "0" + (month + 1) : month + 1;
        divJours.push(
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={item}
                layoutId={i}
                onClick={(e) => onClickDivJour(e)}
                key={i+20}
                className={`planningCard`}
            >
                &nbsp;
            </motion.div>
        );
    }
    for (var i = 0; i <((firstOfMonth.getDay()-8)%7)*-1;i++) {
        divJours.push(
            <motion.div
                key={i+10}
                variants={item}
                className={`planningCardPlaceholder`}
            >
                &nbsp;
            </motion.div>
        );
    }

    return (
        <div className="Home">
            <div className='header'>
                    <div className="title">
                        Home
                    </div>
                    <FontAwesomeIcon icon={faBell} />
            </div>
            <div className='personBar'>
                    <img src="https://thispersondoesnotexist.com/image"/>
                    <div className='infos'>
                        <div className='top'>
                            <div className='name'>Hattstadt Quentin</div>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        <div className='bottom'>
                            <FontAwesomeIcon icon={faDumbbell} /> Scéance Pec • Hier
                        </div>
                    </div>
            </div>
            <div className='nextWorkoutContainer'>
                    <div className='nextWorkoutTitle'>
                        Prochaine Scéance
                    </div>
                    <div className='content'>
                        <div className='left'>
                            <img src="https://picsum.photos/100"/>
                            <div className='btnContainer'>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}>
                                        Commencer
                                </motion.button>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='infoCard'>
                                <div className='title'>5</div>
                                <div>Exercices</div>
                            </div>
                            <div className='infoCard'>
                                <div className='title'>1h32min</div>
                                <div>Durée</div>
                            </div>
                            <div className='infoCard'>
                                <div className='title'>260</div>
                                <div>Calories</div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='planning'>
                    <div className='planningTitle'>
                        Planning
                    </div>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="planningBody"
                    >
                        {divJours}
                    </motion.div>
            </div>
        </div>
    );
}