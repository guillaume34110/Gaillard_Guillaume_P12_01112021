import React from 'react';
import Barchart from './main-section-component/BarChart.js';
import Diet from './main-section-component/Diet.js';
import Linechart from './main-section-component/LineChart.js';
import Navbar from './main-section-component/NavBar.js';
import Chartradar from './main-section-component/Radar.js';
import Radialprogress from './main-section-component/RadialProgress.js';
import Title from './main-section-component/Title.js';


/**
 * 
 * Main fonction take all the component just feed this component with userData
 */
const Mainsection = ({ userData }) => {
    return (
        <div className="main-section">
            <div>
                <Navbar />
            </div >
            <div className="main-section-user">
                <Title userData={userData} />
                <div className="main-section-info">
                <div className="main-section-graph">
                    <Barchart userData={userData} />
                    <div className="main-section-chart">
                        <Linechart userData={userData} />
                        <Chartradar userData={userData} />
                        <Radialprogress userData={userData} />
                    </div>
                </div>
               
                <Diet userData={userData} />
            </div> 
            </div>
        </div>
    );
}

export default Mainsection;
