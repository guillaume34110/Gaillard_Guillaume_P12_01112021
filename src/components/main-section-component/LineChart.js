import React, { useEffect, useRef, useState } from 'react';
import {  Line, LineChart, Tooltip, XAxis } from 'recharts';
const weekDays = ["L", "M", "M", "J", "V", "S", "D"]
const Linechart = ({ userData }) => {
    const [sessionsData, setSessionData] = useState()
    const chartRef = useRef(null)

    useEffect(() => {
         let bufferData =[]
        for (let i = userData?.sessions.sessions.length - 1; i >= userData?.sessions.sessions.length - 7; i--) {
            bufferData[i] = (userData?.sessions.sessions[i]) 
        }
       bufferData?.forEach((session) => {//transformer les chiffres en jours de la semaine
           if (session.day  <= 7) session.day = weekDays[session.day-1 ]
           if (session.day  > 7) session.day = weekDays[(session.day-1 ) % 7]// utilisation du reste de la division
       })

        setSessionData(bufferData)

    }, [userData])

    const TooltipLine = ({ active, payload, label }) => {
        if (active && payload) {
          return (
            <div className="tooltip-line">
              <p >{payload[0]?.value  + "min"}</p>
            </div>
          );
        }
        return null;
      };

const onMouseMove = (hoveredData) => {
    const index = hoveredData.activeTooltipIndex;
    let percentage = (((index + 1) *100) / 7) ;
    if (index === 0) percentage -=20
    else if (index === 1)  percentage -=12
    else if (index === 2)  percentage -=10
    else if (index === 3)  percentage -=7.5
    else if (index === 4)  percentage -=5.5
    else if (index === 5)  percentage -=2.7
    else if (index === 6)  percentage -=0
    chartRef.current.style.backgroundImage = `linear-gradient(90deg,#FF0000 0 ${percentage}%,#E60000 ${percentage}% 100%)`
}
const onMouseOut = () => {
    chartRef.current.style.backgroundImage  = "linear-gradient(90deg,#FF0000 0 100%,#E60000 100% 100%)"
}
    return (
        <div className="linechart" ref = {chartRef}>
                <h2>Durée moyenne des sessions</h2>
                <LineChart onMouseMove={onMouseMove} onMouseOut={onMouseOut}  width={258} height={226} data={sessionsData}  margin={{ top: 50, right: 0, left: 0, bottom: 16 }} >
                <defs>
                    <linearGradient id="white-gradient" x1="0%" y1="0" x2="100%" y2="0">
                        <stop offset="10%" stopColor="rgba(255, 255, 255, 0.4)" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>

                </defs> 
                <Line xAxisId="trueAxis" type="monotone" dataKey="sessionLength" stroke="url(#white-gradient)" strokeWidth={2} dot={false} activeDot={{strokeWidth: 1 }}  />
                <Line hide ={true} xAxisId="falseAxis" type="monotone" dataKey="sessionLength" stroke="url(#white-gradient)" strokeWidth={2} dot={false}  activeDot={false}  />
                <XAxis hide ={true} xAxisId = "trueAxis"  dataKey="day" scale="auto" interval={0} />
                <XAxis xAxisId = "falseAxis"padding={{ left: 20, right: 20 }} dataKey="day" scale="auto" interval={0} axisLine={false} tickLine={false}  tick={{ transform: 'translate(-0, 10)',fill :"rgba(255, 255, 255, 0.3)" , stroke: "rgba(255, 255, 255, 0.3)", fontWeight: "500", fontSize: "0.75rem" }} />
                <Tooltip cursor={false} content={<TooltipLine />} />
            </LineChart>
        </div>
    );
}

export default Linechart;
