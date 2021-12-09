import React, { useEffect, useState } from 'react';
import { apiCall, newUserData } from '../api-call/apiCall';
import Header from '../components/Header';
import Mainsection from '../components/MainSection';


const Profilepage = () => {
    const [userData ,setUserData] =useState()
    const [userToggle ,setUserToggle] =useState('12')
    const [emptyToken , setEmptyToken] = useState(0)

    useEffect( () => {
    async function fetchData() {
        await apiCall(userToggle)
        if (userData !== newUserData)setUserData(newUserData)//fonctionnement normal
        else {
            setUserData(undefined) // en cas d'objet trop peu different
            setEmptyToken(emptyToken + 1)
        }
    }
     fetchData()
    }, [userToggle]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect( () => {
        if(emptyToken>0) setUserData(newUserData)// on met a jour l'objet
        
    }, [emptyToken]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <Header userToggle={userToggle} setUserToggle = {setUserToggle}/>
            <div>
                <Mainsection userData = {userData} />
            </div>
        </div>
    );
}

export default Profilepage;
