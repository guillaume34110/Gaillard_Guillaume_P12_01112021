import React from 'react';
import yoga from "../../assets/nav-icon/yoga.png"
import swim from "../../assets/nav-icon/swim.png"
import cycling from "../../assets/nav-icon/cycle.png"
import strength from "../../assets/nav-icon/strength.png"

const Navbar = () => {
    return (
        <div className="navbar">
            <div></div>
            <div className="navbar-selection">
                <div>
                    <img src={yoga} alt="yoga" />
                </div>
                <div>
                    <img src={swim} alt="swim" />
                </div>
                <div>
                    <img src={cycling} alt="cycling" />
                </div>
                <div>
                    <img src={strength} alt="strength" />
                </div>
            </div>
            <p>Copiryght, SportSee 2020</p>
        </div>
    );
}

export default Navbar;
