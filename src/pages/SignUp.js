import React from 'react';
import { LoginContainer } from '../components/styled';
//components 
import SignUpForm from '../components/SignUpForm';

export default function SignUp() {
    return (
        <LoginContainer>
            <h1>Sign Up</h1>
            <p>Start making premium bets now</p>
            <SignUpForm />
        </LoginContainer>
    )
}