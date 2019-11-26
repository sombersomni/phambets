import React from 'react';
import BetForm from '../components/BetForm';
import styled from 'styled-components';

//Material UI
import Button from '@material-ui/core/Button';
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

const CasinoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 300px;
    max-width: 50vw;
    padding-bottom: 25px;
`;
export default function Bet() {
    return (
        <MainContainer>
            <BetContainer>
                <AppUIContext.Provider value={appUI}>
                    <BetForm />
                </AppUIContext.Provider>
                <CasinoContainer>
                    <h3>Visit Rivers Casino Sports below to find what you want to bet on</h3>
                    <img src="https://riverscasinosports.com/betslip/logo.png" aria-label="riverscasinosports" />
                    <a target="_blank" href="https://riverscasinosports.com/betslip-dev/#home">
                        <Button variant="outlined" color="default">Visit Website</Button>
                    </a>
                </CasinoContainer>
            </BetContainer>
        </MainContainer>
    )
}