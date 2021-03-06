import React, { useEffect, useRef, useState } from 'react';
import {  Line, LineChart, Tooltip, XAxis } from 'recharts';
import PropTypes from 'prop-types';
import '../style/line-chart.css'

const weekDays = ["L", "M", "M", "J", "V", "S", "D"]
/**
 * 
 * this component generate a line chart feed this component with userData
 * need an object type : 
 * 
 * { 
 * sessions {
 *  sessions : [
 *      {
 *          day:1 ,
 *          sessionLength:39
 *      }
 *     ]
 *    }
 * }
 */
const Linechart = ({ userData }) => {
    const [sessionsData, setSessionData] = useState()
    const chartRef = useRef(null)

    useEffect(() => {
        const goodData = async () => {
            let sessionData = JSON.parse(JSON.stringify(userData?.sessions.sessions))
            let bufferData =[]
           for (let i = sessionData.length - 1; i >= sessionData.length - 7; i--) {
               bufferData.unshift(sessionData[i]) // create the new array of data in good order
           }
          bufferData?.forEach((session) => {//transform number in string value
              if (session.day  <= 7) session.day = weekDays[session.day-1 ]
              if (session.day  > 7) session.day = weekDays[(session.day-1 ) % 7]// use rest of division to have the right number
          })
        
           setSessionData(bufferData)
        }
         goodData()

    }, [userData])

    const TooltipLine = ({ active, payload, label }) => {//custom tooltip
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
                <h2>Dur??e moyenne des sessions</h2>
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
Linechart.propTypes = { //https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs
    userData: PropTypes.shape({
        sessions : PropTypes.shape({
            sessions : PropTypes.arrayOf(PropTypes.shape({//https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
                day: PropTypes.number,
                sessionLength: PropTypes.number
            }))
        })
    })
  };