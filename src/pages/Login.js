import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    h1 {
        text-transform: uppercase;
        text-align: center;
    }
`;

export default function Login() {
    return (
        <LoginContainer>
            <h1>Pham Bets App</h1>
            <LoginForm />
            
        </LoginContainer>
    )
}