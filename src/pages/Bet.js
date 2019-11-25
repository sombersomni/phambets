import React from 'react';
import BetForm from '../components/BetForm';
import styled from 'styled-components';
//Context
import { AppUIContext } from '../contexts/AppUIContext';
//store
import appUI from '../stores/AppUI';
const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const BetContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
    padding-top: 80px;

    iframe {
        min-width: 300px;
        width: 50vw;
        height: 90vh;
    }
`;

export default function Bet() {
    return (
        <MainContainer>
            <BetContainer>
                <AppUIContext.Provider value={appUI}>
                    <BetForm />
                </AppUIContext.Provider>
                <iframe src="https://www.google.com">
                </iframe>   
            </BetContainer>
        </MainContainer>
    )
}