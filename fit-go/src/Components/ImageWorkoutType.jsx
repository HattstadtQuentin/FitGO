import React from "react";
import { motion } from "framer-motion";
import ChestTraining from "../styles/Images/chest_training.jpg";
import BackTraining from "../styles/Images/back_training.jpg";
import LegTraining from "../styles/Images/leg_training.jpg";
import FullBodyTraining from "../styles/Images/fullbody_training.jpg";

export default function ImageWorkoutType({type}) {
    const chooseImageType = () => {
        switch(type) {
            case 'fullbody':
                return FullBodyTraining;
            case 'upperbody':
                return ChestTraining
            case 'push':
                return ChestTraining;
            case 'pull':
                return BackTraining;
            case 'legs':
                return LegTraining;
            case 'lowerbody':
                return LegTraining;   
            default:
                return FullBodyTraining;
        }
    }


  return (
    <img src={chooseImageType()} />
  );
};

export function getImageWorkoutTypeSrc(type) {
    switch(type) {
        case 'fullbody':
            return FullBodyTraining;
        case 'upperbody':
            return ChestTraining
        case 'push':
            return ChestTraining;
        case 'pull':
            return BackTraining;
        case 'legs':
            return LegTraining;
        case 'lowerbody':
            return LegTraining;   
        default:
            return FullBodyTraining;
    }
}
