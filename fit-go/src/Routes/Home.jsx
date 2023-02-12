import React, {useState, useEffect, useRef } from 'react';
import '../styles/Routes/Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsis, faDumbbell, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { getUsers } from '../Functions/FetchData';
import InstallPWA from '../Components/InstallPwa';
import { connect, register } from '../Functions/HandlingConnection';
import useUserStore from '../Stores/useUserStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hashSync, compareSync, getRounds  } from "bcrypt-ts";
 

export default function Home() {
    const setUserPersistant = useUserStore((state) => state.setUser);
    const tmp = useUserStore((state) => state.id);
    const User = (id, email) => { return { id: id, email: email } }
    const [user, setUser] = useState(User(useUserStore((state) => state.id), useUserStore((state) => state.email)));

    const handleUpdateUser = (id, email) => {
        setUserPersistant(id, email);
        setUser(User(id, email));
        console.log("updated");
    }

    useEffect(() => {
        console.log(tmp);
    },[tmp]);


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


	var firstOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
	var divJours = [];

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};


	const onClickDivJour = (e) => {
		// if(modalOpen ? close() : open()
	};

    const days = [
        "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"
    ]

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
                key={i+50}
                variants={item}
                className={`planningCardPlaceholder`}
            >
                &nbsp;
            </motion.div>
        );
    }

    const [isModalActive, setIsModalActive] = useState(false);
    const [isLogin, setIsLogin] = useState(useUserStore((state) => state.id) !== null);
    const [isConnecting, setIsConnecting] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const emailInputRef = useRef();
    const mdpInputRef = useRef();
    const handleConnection = () => {
        const email = emailInputRef.current.value;
        const mdp = mdpInputRef.current.value;
        if(email !== '' && mdp !== '')
        {
            connect(email).then((res) => {
                if(res === undefined){
                    toast.error("Aucun compte existant", {
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
                    console.log(getRounds(res.mdp));
                    if(compareSync(mdp, res.mdp))
                    {   
                        handleUpdateUser(res.idUser, email);
                        setIsLogin(true);
                        setIsModalActive(false);
                        toast.success("Connecté !", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'dark',
                        });
                    }
                    else {
                        toast.error("Mot de passe incorrect", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'dark',
                        });
                    }
                }
            });
        } else {
            toast.error("Tout les champs ne sont pas renseignés", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }

    const handleRegister = () => {
        const email = emailInputRef.current.value;
        const mdp = mdpInputRef.current.value;
        if(email !== '' && mdp !== '')
        {
            connect(email).then((res) => {
                if(res === undefined){
                    register(emailInputRef.current.value,  hashSync(mdp, 8)).then((res) => {
                        handleUpdateUser(res.id, email);
                        setIsLogin(true);
                        setIsModalActive(false);
                        toast.success("Inscription réussie !", {
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
                } else {
                    toast.error("Pseudo déjà utilisé", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    });
                }
            });
        } else {
            toast.error("Tout les champs ne sont pas renseignés", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }

    const handleDisconnect = () => {
        handleUpdateUser(null, null);
        setIsLogin(false);
        setIsModalActive(false);
        toast.success("Deconnecté !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    }

    return (
        <div className="Home">
            <div className='header'>
                    <div className="title">
                        Home
                    </div>
                    <InstallPWA />
            </div>
            { isLogin &&
                <div className='personBar'>
                    
                        <img src="https://thispersondoesnotexist.com/image"/>
                        <div className='infos'>
                            <div className='top'>
                                <div className='name'>{user.email}</div>
                                <motion.button
                                    className='settingsBtn'
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsModalActive(true)}
                                >
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </motion.button>
                            </div>
                            <div className='bottom'>
                                <FontAwesomeIcon icon={faDumbbell} /> Scéance Pec • Hier
                            </div>
                        </div>
                    
                </div>
            }
            { !isLogin &&
                <div className='personBar'>
                    
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsModalActive(true)}
                        >
                                <FontAwesomeIcon icon={faRightToBracket} />
                        </motion.button>
                        <div className='infos'>
                            <div className='top'>
                                <div className='name'>Connecter vous</div>
                            </div>
                            <div className='bottom'>
                                Pour sauvegarder vos données
                            </div>
                        </div>
                    
                </div>
            }
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
            {isModalActive &&
                <div className='modalBackground' onClick={() => setIsModalActive(false)}>
                    <div className='modalCreate' onClick={(e) =>  e.stopPropagation()}>
                    { !isLogin && isConnecting &&
                        <div className='login'>
                            <div className='titleLogin'>
                                Se connecter
                            </div>
                            <div className='contentLogin'>
                                <div className='inputWrapper'>
                                    <div className='inputContainer'>
                                        <input ref={emailInputRef} value={loginEmail} type="text" placeholder='Pseudo' onChange={e => setLoginEmail(e.target.value)}/>
                                    </div>
                                    <div className='inputContainer'>
                                        <input ref={mdpInputRef} value={loginPassword} type="password" placeholder='Mot de passe' onChange={e => setLoginPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className='subtitle'>Vous n'avez pas de compte ? <motion.p whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsConnecting(false)}>S'incrire</motion.p></div>
                                <div className='btnContainer'>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleConnection}
                                    >
                                            Connection
                                    </motion.button>
                                </div>
                        </div>
                    </div>
                    }
                    { !isLogin && !isConnecting &&
                        <div className='login'>
                            <div className='titleLogin'>
                                S'incrire
                            </div>
                            <div className='contentLogin'>
                                <div className='inputWrapper'>
                                    <div className='inputContainer'>
                                        <input ref={emailInputRef} value={loginEmail} type="text" placeholder='Pseudo' onChange={e => setLoginEmail(e.target.value)}/>
                                    </div>
                                    <div className='inputContainer'>
                                        <input ref={mdpInputRef} value={loginPassword} type="password" placeholder='Mot de passe' onChange={e => setLoginPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className='subtitle'>Vous avez déjà un compte ? <motion.p whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsConnecting(true)}>Connexion</motion.p></div>
                                <div className='btnContainer'>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleRegister}
                                    >
                                            S'inscrire
                                    </motion.button>
                                </div>
                        </div>
                    </div>
                    }
                    { isLogin &&
                        <div className='settings'>
                            <div className='settingsTitle'>
                                Paramètres
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDisconnect}
                            >
                                    Deconnexion <FontAwesomeIcon icon={faRightFromBracket} />
                            </motion.button>
                        </div>
                    }
                    </div>
                </div>        
            }
        </div>
    );
}