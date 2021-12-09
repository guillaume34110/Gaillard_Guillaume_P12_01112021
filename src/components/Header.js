import React from 'react';
import logo from '../assets/logo/logo.png'
/**
 * 
 * Header  component just feed this component with {userToggle , setUserToggle} to toggeling user
 */

const Header = ({userToggle , setUserToggle}) => {
    const toggle = () => {
        if (userToggle === '12') setUserToggle('18')
        else setUserToggle('12')
    }
    return (
        <div className="header">
            <img src = {logo} alt = "home page" onClick={toggle} />
            <p>Acceuil</p>
            <p>Profil</p>
            <p>Réglage</p>
            <p>Communauté</p>
        </div>
    );
}

export default Header;
