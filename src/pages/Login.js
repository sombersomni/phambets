import React from 'react';
import LoginForm from '../components/LoginForm';
import { LoginContainer } from '../components/styled';

export default function Login() {
    return (
        <LoginContainer>
            <h1>Login</h1>
            <LoginForm />
        </LoginContainer>
    )
}