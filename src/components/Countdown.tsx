import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
 const {
  minutes,
  seconds,
  hasFinished,
  isActive,
  percentTime,
  startCountdown,
  resetCountdown,
} = useContext(CountdownContext)



  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


  function getColor(value) {
    //value from 0 to 1
    var hue = ((value) * 120).toString(10);
    return ["hsl(", hue, ",100%,45%)"].join("");
  }

  
  

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