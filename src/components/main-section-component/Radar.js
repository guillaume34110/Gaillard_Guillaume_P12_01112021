import React, { useEffect, useState } from 'react';
import {  PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart,Radar } from 'recharts';
const kinds = [null,"Cardio" , "Energie" , "Endurance" , "Force" , "Vitesse" , "Intensité"]
const Chartradar = ({ userData }) => {
    const [sessionsData, setSessionData] = useState()
    useEffect(() => {
        let bufferData = [];
        userData?.performance.data.forEach(data => {
             bufferData.unshift(data)
        })
       
        
        if (bufferData.length>1){
        bufferData.forEach(data =>{
            data.kind = kinds[data.kind]
        })
    }
        setSessionData(bufferData)

    }, [userData])


    return (
        <div className = "radar-chart">
            <RadarChart cx="50%" cy="50%" outerRadius="65%"  width={258} height={263} data={sessionsData}>
                <PolarGrid  polarRadius={[10,21,45,65,90]} />
                <PolarAngleAxis   tick={{ fontWeight: "500", fontSize: "0.75rem" }} dataKey="kind"  stroke="white" axisLine={false} tickLine={false} />
                <PolarRadiusAxis angle={30} domain={[0, "dataMax"]} axisLine={false} tick = {false}  />
                <Radar  dataKey="value" stroke="rgba(255, 1, 1, 0.7)" fill="rgba(255, 1, 1, 0.7)"  />
            </RadarChart>
        </div>
    );
}

export default Chartradar;