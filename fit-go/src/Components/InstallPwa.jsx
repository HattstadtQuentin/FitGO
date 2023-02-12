import React, { useEffect, useState } from "react";
import '../styles/Components/InstallPWA.scss';
import { motion } from "framer-motion";

export default function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {  
        setSupportsPWA(false);   
      } else {
        setSupportsPWA(true);
      }  
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

 

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      onClick={onClick}
    >
      Installez l'App !
    </motion.button>
  );
};
