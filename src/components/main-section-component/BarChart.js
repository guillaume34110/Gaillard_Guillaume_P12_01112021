import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar  } from 'recharts'
import PropTypes from 'prop-types';
import  '../style/bar-chart.css'
/**
 * 
 * this component generate a bar chart feed this component with userData
 * need an object type :
 *  
 * { activity : 
 * {session : [
 * {day : '2020-007-01' , kilogram : 80 , calories : 240}
 * ]}
 * }
 */
const Barchart = ({ userData }) => {
  const [sessionsData, setSessionData] = useState([])
  const [chartMin, setChartMin] = useState({})
  const [chartMax, setChartMax] = useState({})
  const [chartStep, setChartStep] = useState([])

  useEffect(() => {
    if ( userData) {
      const sessionsBuffer = []
      let dataBuffer = JSON.parse(JSON.stringify(userData?.activity.sessions))
      const minBuffer = { kilogram: 10000, calories: 10000 } //set big value
      const maxBuffer = { kilogram: 0, calories: 0 } // set small value
      for (let i = dataBuffer.length - 1; i > dataBuffer.length - 11; i--) {
        if (i >= 0) {
          sessionsBuffer.unshift(userData.activity.sessions[i]) // reordering data

          if (minBuffer.kilogram > dataBuffer[i].kilogram) minBuffer.kilogram = dataBuffer[i].kilogram  // add min value
          if (minBuffer.calories > dataBuffer[i].calories) minBuffer.calories = dataBuffer[i].calories
          if (maxBuffer.calories < dataBuffer[i].calories) maxBuffer.calories = dataBuffer[i].calories //add max value
          if (maxBuffer.kilogram < dataBuffer[i].kilogram) maxBuffer.kilogram = dataBuffer[i].kilogram
        }
        else sessionsBuffer.push({ kilogram: 0, calories: 0 })
      }
      sessionsBuffer.forEach((e, index) => {
        e.name = index + 1
      })
      /*format data min data max*/
      minBuffer.kilogram = Math.round(minBuffer.kilogram - (minBuffer.kilogram / 100))
      minBuffer.calories = Math.round(minBuffer.calories - (minBuffer.calories / 100))
      maxBuffer.kilogram = Math.round(maxBuffer.kilogram + (maxBuffer.kilogram / 100))
      maxBuffer.calories = Math.round(maxBuffer.calories + (maxBuffer.calories / 100))
      if ((minBuffer.kilogram - maxBuffer.kilogram) % 2) minBuffer.kilogram = minBuffer.kilogram - 1 // to have the right placement of ticks
      /*chartStep */
      const stepBuffer = [minBuffer.kilogram, maxBuffer.kilogram - ((maxBuffer.kilogram - minBuffer.kilogram) / 2), maxBuffer.kilogram + 1]
      setChartMax(maxBuffer)
      setChartMin(minBuffer)
      setSessionData(sessionsBuffer)
      setChartStep(stepBuffer)

    }
  }, [userData])


  const CustomTooltip = ({ active, payload, label }) => { // custom tooltip
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-kg">{`${payload[0]?.value} kg`}</p>
          <p className="tooltip-kcal">{`${payload[1].value} Kcal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="barchart">
      <div className="legend">
        <h3>Activit?? quotidienne</h3>
        <div >
          <span className="legend-kg"><div></div><p>Poids (kg)</p></span>
          <span className="legend-kCal"><div></div><p>Calories br??l??es (kCal)</p></span>
        </div>
      </div>
      <BarChart barGap={8} width={775} height={204} data={sessionsData} barSize={7} margin={{ top: 20, right: 5, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="2 2 " vertical={false} stroke="#DEDEDE" horizontalPoints={[20, 95]} />
        <XAxis tick={{ transform: 'translate(0, 16)', stroke: "#9B9EAC", fontWeight: "500", fontSize: "0.875rem" }} scale="auto" padding={{ left: -25, right: -25 }} tickLine={false} dataKey="name" axisLine={{ stroke: "#DEDEDE" }} interval={0} />
        <YAxis ticks={chartStep} allowDataOverflow={true} domain={[chartMin.kilogram, chartMax.kilogram]} tick={{ transform: 'translate(10, 0)', stroke: "#9B9EAC", fontWeight: "500", fontSize: "0.875rem" }} tickMargin={20} tickLine={false} orientation="right" dataKey="kilogram" yAxisId="kilogram" axisLine={false} padding={{ top: 0, bottom: -1 }} />
        <YAxis allowDataOverflow={true} domain={[0, chartMax.calories]} hide={true} tickLine={false} orientation="right" dataKey="calories" yAxisId="calories" padding={{ top: 0, bottom: -1 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar yAxisId="kilogram" dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]} />
        <Bar yAxisId="calories" dataKey="calories" fill="#E60000" radius={[10, 10, 0, 0]} />
      </BarChart>

    </div>
  );
}

export default Barchart;
Barchart.propTypes = { //https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs
  userData: PropTypes.shape({
      activity : PropTypes.shape({
          sessions : PropTypes.arrayOf(PropTypes.shape({//https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
              day: PropTypes.string,
              kilogram: PropTypes.number,
              calories: PropTypes.number
          }))
      })
  })
};