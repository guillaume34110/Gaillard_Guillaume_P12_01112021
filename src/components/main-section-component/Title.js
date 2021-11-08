import React from 'react';


const Title = ({userData}) => {

    return (
        <div className = "title">
            <h1> Bonjour  <span> {userData?.user?.userInfos.firstName  }</span> </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
}

export default Title;
