import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBowlFood, faFireFlameCurved, faUserGear } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Components/Modals/ModalAliment.scss';
import { motion } from 'framer-motion';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'rc-slider/assets/index.css';
import { getRepasByDate, createRepas, createAliment} from '../../Functions/HandlingCaloriesJsx';
import useUserStore from '../../Stores/useUserStore';

export default function ModalAliment({food, typeRepas, exitMethod, inputRef}) {
    
  const userId = useUserStore((state) => state.id);
  const [sliderValue, setSliderValue] = useState(1);

  useEffect(() => {
    console.log(userId);
  }, []);

  const handleAddAliment = () => {
    if(userId === null){
        toast.error("Vous devez être connecté pour acceder à cette fonctionnalité", {
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
        getRepasByDate((new Date().toISOString()), userId).then((res) => {
            var alreadyExist = null;
            if(res === null){
                createRepas(typeRepas, userId).then(() => {
                    getRepasByDate((new Date().toISOString()), userId).then((res) => {
                        res.forEach(resu => {
                            if(resu.type === typeRepas)
                            {
                                alreadyExist = resu.idRepas;
                            }
                        });
                        createAliment(food.title, Math.round(food.nutrition.nutrients[0].amount),  Math.round(food.nutrition.nutrients[3].amount), Math.round(food.nutrition.nutrients[2].amount), Math.round(food.nutrition.nutrients[1].amount),alreadyExist, sliderValue).then(() =>{
                            toast.success("Aliment ajouté", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'dark',
                            });
                            inputRef.current.blur();
                            exitMethod([false, null]);
                        });
                    });
                });
            } else {
                res.forEach(resu => {
                    if(resu.type === typeRepas)
                    {
                        alreadyExist = resu.idRepas;
                    }
                });
                if(alreadyExist === null){
                    createRepas(typeRepas, userId).then(() => {
                        getRepasByDate((new Date().toISOString()), userId).then((res) => {
                            res.forEach(resu => {
                                if(resu.type === typeRepas)
                                {
                                    alreadyExist = resu.idRepas;
                                }
                            });
                            createAliment(food.title, Math.round(food.nutrition.nutrients[0].amount),  Math.round(food.nutrition.nutrients[3].amount), Math.round(food.nutrition.nutrients[2].amount), Math.round(food.nutrition.nutrients[1].amount),alreadyExist, sliderValue).then(() =>{
                                toast.success("Aliment ajouté", {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'dark',
                                });
                                inputRef.current.blur();
                                exitMethod([false, null]);
                            });
                        });
                    });
                } else {
                    createAliment(food.title, Math.round(food.nutrition.nutrients[0].amount),  Math.round(food.nutrition.nutrients[3].amount), Math.round(food.nutrition.nutrients[2].amount), Math.round(food.nutrition.nutrients[1].amount),alreadyExist, sliderValue).then(() =>{
                        toast.success("Aliment ajouté", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'dark',
                        });
                        inputRef.current.blur();
                        exitMethod([false, null]);
                    });
                }
            }
        });
    }
  }

  return (
    <div className='modal' onClick={() => exitMethod([false, null])}>
        <div className='modalCard' onClick={e => e.stopPropagation()}>
            <div className='modalContent'>
                <div className='modalTitle'>
                    {food.title}
                </div>
                <div className='quantity'>
                    <div className='quantityTitle'>Quantité</div>
                    <div className='quantitySliderContainer'><Slider min={1} max={20} onChange={setSliderValue} className='quantitySlider' /><span>{sliderValue}</span></div>
                </div>
            </div>

            <div className='modalFooter'>
                <div className='btnContainer'>
                    <motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}className='annulerBtn' onClick={() => exitMethod([false, null])}>Annuler</motion.button>
                    <motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}className='ajouterBtn' onClick={() => handleAddAliment()}>Ajouter</motion.button>
                </div>
            </div>
        </div>
    </div>
  );
}


