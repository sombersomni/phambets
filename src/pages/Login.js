import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;
const MordernForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

`;
const ModernInput = styled.input`
    min-width: 300px
    max-width: 50vw;
    height: 35px;
    border-radius: 5px;
    border: 2px solid black;
    padding: 5px;
    margin: 10px;
`;

const ModernButton = styled.button`
    padding: 10px 25px;
    border-radius: 5px;
    outline: none;
    border: none;
    background: linear-gradient(to left, #FA0000, #CC2500);
    cursor: pointer;
`;

export default function Login() {
    const [ user, setUser ] = useState({
        username: '',
        password: '',
    })
    const usernameRef = useRef(null);
    function handleInput(e, name='') {
        setUser({...user, [name]: e.target.value});
    }
    function handleLogin(e) {
        e.preventDefault();
        console.log('login in', user);
    }
    useEffect(() => {
        usernameRef.current.focus();
    }, []);
    return (
        <LoginContainer>
            <h1 style={{ textTransform: 'uppercase' }}>Pham app</h1>
            <MordernForm onSubmit={handleLogin}>
                <ModernInput 
                    type="text" 
                    onChange={e => handleInput(e, 'username')} 
                    placeholder="Enter your username"
                    ref={usernameRef}
                    required/>
                <ModernInput 
                    type="password" 
                    placeholder="Enter your password"
                    onChange={e => handleInput(e, 'password')} 
                    required />
                <ModernButton type="submit">Submit</ModernButton>
            </MordernForm>
        </LoginContainer>
    )
}