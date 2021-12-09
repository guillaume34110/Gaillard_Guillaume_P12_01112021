import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import chicken from "../../assets/diet-icon/chicken.png"
import apple from "../../assets/diet-icon/apple.png"
import fire from "../../assets/diet-icon/fire.png"
import burger from "../../assets/diet-icon/cheeseburger.png"
import '../style/diet.css'
/**
 * 
 * this component generate 4 cards with user diet feed this component with userData
 * need an object type : 
 * 
 * { 
 * user : { 
 * keyData: { 
 * calorieCount: 1930
 * carbohydrateCount: 290
 * lipidCount: 50
 * proteinCount: 155
 * }
 * }
 * }
 *  
 */
const Diet = ({userData}) => {
    const [sessionsData, setSessionsData] = useState()
   
    useEffect(() => {
        const goodData = async () => {
    let bufferData = JSON.parse(JSON.stringify(userData?.user?.keyData)) ; //to clone object properly
        if (bufferData?.calorieCount){
            bufferData.calorieCount =  new Intl.NumberFormat("en-US").format(bufferData?.calorieCount) //format calorie count  1,000 
        }
        setSessionsData(bufferData)
}
        goodData()
    }, [userData ])


    return (
        <section className = "diet">
            <article>
                <div className = "diet-img diet-img-fire">
                <img src = {fire} alt = "fire icon" />
                </div>
                <div className = "diet-content">
                <h2>{sessionsData?.calorieCount}kCal</h2>
                <p>Calories</p>
            </div>
            </article>
            <article>
                <div className = "diet-img diet-img-chicken">
                <img src = {chicken} alt = "chicken icon" />
                </div>
                <div className = " diet-content">
                <h2>{sessionsData?.proteinCount}g</h2>
                <p>Proteines</p>
            </div>
            </article>
            <article>
                <div className = "diet-img diet-img-apple">
                <img src = {apple} alt = "apple icon" />
                </div>
                <div className = "diet-content">
                <h2>{sessionsData?.carbohydrateCount}g</h2>
                <p>Glucides</p>
            </div>
            </article>
            <article>
                <div className = "diet-img diet-img-burger">
                <img src = {burger} alt = "burger icon" />
                </div>
                <div className = "diet-content">
                <h2>{sessionsData?.lipidCount}g</h2>
                <p>Lipides</p>
            </div>
            </article>
        </section>
    );
}

export default Diet;
Diet.propTypes = { //https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs
    userData: PropTypes.shape({
        user : PropTypes.shape({
            keyData : PropTypes.shape({
                calorieCount: PropTypes.number,
                carbohydrateCount: PropTypes.number,
                lipidCount: PropTypes.number,
                proteinCount: PropTypes.number,
            })
        })
    })
  };