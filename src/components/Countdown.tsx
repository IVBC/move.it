import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';


let countdownTimeout: NodeJS.Timeout;

const START_TIME = 10;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);


  const [time, setTime] = useState(START_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  
  const minutes = Math.floor( time / 60 ),
        seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');



  const percentTime =  Math.round(time * 100) / (START_TIME);
  
  function getColor(value) {
    //value from 0 to 1
    var hue = ((value) * 120).toString(10);
    return ["hsl(", hue, ",100%,45%)"].join("");
  }

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(START_TIME);
  } 

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
        disabled
        className={styles.countdownButton}
      >
        Ciclo encerrado
        <img src='icons/check_circle.svg' alt="Ciclo encerrado"/>
        <div className={styles.progressBarButtonContainer}>
          <div/>
        </div>
      </button>
      ) : (
        <>
          { isActive ? (
            <>
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
                <div className={styles.progressBarButtonContainer}>
                  <div style={{ width: `${percentTime}%`, backgroundColor: getColor(percentTime/100)}} />
                </div>
              </button>
              
            </>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}

      
    </div>
  )
}