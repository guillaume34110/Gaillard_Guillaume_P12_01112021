import React, { useEffect, useRef, useState } from 'react';

const Radialprogress = ({userData}) => {
    const [sessionsData, setSessionsData] = useState()
    const circleRef = useRef()
    useEffect(() => {
       
        let bufferData 
        if (userData?.user.todayScore) bufferData = userData?.user.todayScore * 100 ;
        if (userData?.user.score) bufferData = userData?.user.score * 100 ;
        if (bufferData > 0){
            
        circleRef.current.style.strokeDashoffset =`calc(500 - (500 * ${bufferData}) / 100)`
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
