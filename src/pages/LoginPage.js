import { useState } from "react";
import { addUser, getUser } from "../database/userDB";

import "./LoginPage.css"
import { Navigate, useNavigate } from "react-router";
import User from "../models/User";

function LoginPage(props){
    const [logginIn, setLogginIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    if(props.user){
        return (
            <Navigate to='/' />
        );
    }

    const handleUsernameOnChange = (evt) => {
        setError('');
        setUsername(evt.target.value);
    }

    const handlePasswordOnChange = (evt) => {
        setError('');
        setPassword(evt.target.value);
    }

    const handleFormSubmit = (formData) => {
        if(username.trim().length === 0){
            setUsername('');
            setError('Username should not be of length 0');
            return;
        }

        if(password.length === 0) {
            setError('Password should not be of length 0');
            return;
        }

        let user = getUser(username.trim());
        if(!logginIn){
            if(user){
                setError('Username already in use');
                return;
            }

            user = new User(username.trim(), password);
            addUser(user);
        } else {
            if(!user){
                setError('Username or Password wrong');
                return;
            }

            if(user.password !== password){
                setError('Username or Password wrong');
                return;
            }
        }
        props.setUser(user);
        navigate('/');
    }

    return (
        <main>
            <div id="login-form">
                <form action={handleFormSubmit}>
                    {logginIn && <h3>Login</h3>}
                    {!logginIn && <h3>Register</h3>}
                    <div className="form-input">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={handleUsernameOnChange}
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            required
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handlePasswordOnChange}
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            required
                        />
                    </div>
                    {error && <p id="form-error">{error}</p>}
                    <div id="form-submit-button">
                        {logginIn && <button type="submit">Login</button>}
                        {!logginIn && <button type="submit">Register</button>}
                    </div>
                </form>
                {logginIn && <p>Don't have an account?<button onClick={() => setLogginIn(false)}>Register</button></p>}
                {!logginIn && <p>Already have an account?<button onClick={() => setLogginIn(true)}>Login</button></p>}
            </div>
        </main>
    );
}

export default LoginPage;