import User from "../models/User";

var userDB = {}
if(localStorage.getItem('userDB')){
    userDB = JSON.parse(localStorage.getItem('userDB'));
} else {
    userDB = {
        "skywalker22": {
            password: "password123",
        },
        "pixelninja": {
            password: "securePass456",
        },
        "shadowwolf": {
            password: "charlie789",
        },
        "neonphantom": {
            password: "davidPass321",
        },
        "cybereclipse": {
            password: "eveSecret999",
        },
    }
    localStorage.setItem('userDB', JSON.stringify(userDB));
}

/**
 * 
 * @param {User} user user class object
 */
export function addUser(user){
    const {username, password} = user;
    userDB[username] = {
        password: password,
    }
    localStorage.setItem('userDB', JSON.stringify(userDB));
}

export function getUser(username){
    if(userDB[username]){
        return new User(username, userDB[username].password);
    }

    return null;
}

export function getAllUsers(){
    const users = [];
    for (const username in userDB){
        const {password} = userDB[username];
        users.push(new User(username, password));
    }

    return users;
}