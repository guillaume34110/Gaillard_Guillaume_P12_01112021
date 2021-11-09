import React from 'react';
import PropTypes from 'prop-types';
import '../style/title.css'
/**
 * 
 * this function generate title with dynamic name
 */
const Title = ({userData}) => {

    return (
    
        <div className = "title">
            <h1> Bonjour  <span> {userData?.user?.userInfos.firstName  }</span> </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
}

export default Title;


Title.propTypes = { //https://stackoverflow.com/questions/26923042/how-do-you-validate-the-proptypes-of-a-nested-object-in-reactjs
    /**
     * data for current user  */
    userData: PropTypes.shape({
        user : PropTypes.shape({
            userInfos: PropTypes.shape({
                firstName: PropTypes.string
            })
        })
    })
  };