import axios from 'axios';

export let newUserData = {}


export const apiCall = async (userid) => {
    console.log('enter');
    await axios.get(`http://localhost:3000/user/${userid}`)
    .then(function (response) {
        newUserData.user = response.data.data
    })
    await axios.get(`http://localhost:3000/user/${userid}/activity`)
    .then(function (response) {
        newUserData.activity = response.data.data
    })
    await axios.get(`http://localhost:3000/user/${userid}/average-sessions`)
    .then(function (response) {
        newUserData.sessions = response.data.data
    })
    await axios.get(`http://localhost:3000/user/${userid}/performance`)
    .then(function (response) {
        newUserData.performance = response.data.data
    })
    console.log(newUserData,"userData");
}