import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBowlFood, faFireFlameCurved, faUserGear } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Components/Modals/ModalAliment.scss';

export default function ModalAliment({foodName, exitMethod}) {
  return (
    <div className='modal' onClick={() => exitMethod([false, null])}>
        <div className='modalCard' onClick={e => e.stopPropagation()}>
            <div className='modalContent'>
                <div className='modalTitle'>
                    Ajout d'un Aliment
                </div>
                <div className='foodName'>
                    {foodName}
                </div>
            </div>

            <div className='modalFooter'>
                <div className='btnContainer'>
                    <button className='annulerBtn' onClick={() => exitMethod([false, null])}>Annuler</button>
                    <button className='ajouterBtn'>Ajouter</button>
                </div>
            </div>
        </div>
    </div>
  );
}


