import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/radial-progress.css'
/**
 * 
 * this component generate a radial progress chart
 */
const Radialprogress = ({userData}) => {
    const [sessionsData, setSessionsData] = useState()
    const circleRef = useRef()
    /**
     * useEffect with userData event to re render
     */
    useEffect(() => {
       
        let bufferData 
        if (userData?.user.todayScore) bufferData = userData?.user.todayScore * 100 ;
        if (userData?.user.score) bufferData = userData?.user.score * 100 ;
        if (bufferData > 0){ 
        circleRef.current.style.strokeDashoffset =`calc(500 - (500 * ${bufferData}) / 100)` //draw red cicle
        }
        setSessionsData(bufferData)

    }, [userData])

    return (
        <div className = "radial-progress">
             <p className = "score">Score</p>
             <div className="percent ring-style">
                    <svg>
                        <circle ref = {circleRef} cx="-80" cy="80" r="80"></circle>
                    </svg>
                      <div className = "in-circle">
                          <h2>{sessionsData}%</h2>
                          <p> de votre objectif</p>
                      </div>
                    </div>
        </div>
    );
}

export default Radialprogress;

Radialprogress.propTypes = { //https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs
   /**
     * data for current user  */
    userData: PropTypes.shape({
        user : PropTypes.shape({
            todayScore : PropTypes.number,
            score : PropTypes.number
        })
    })
  };