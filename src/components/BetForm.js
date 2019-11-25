import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 10px;
`;

const BetFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0px 10px;
    max-width: 50vw;
    min-width: 300px;

    h1,h2,h3,h4 {
        text-align: center;
        text-transform: capitalize;
        margin-top: 0px;
    }
`;
export default function BetForm() {
    function placeBet(e) {
        e.preventDefault();
    }
    return (
        <BetFormContainer>
            <h3>Start your bet</h3>
            <FormContainer onSubmit={placeBet}>
                <FormGroup>
                    <label htmlFor="bet-name">What's your bet</label>
                    <textarea rows="4" placeholder="(ex. Rockets vs. Pistons)"></textarea>
                </FormGroup>
                <FormGroup>
                    <label htmlFor='bet-type'>Choose bet type</label>
                    <select id="bet-type">
                        <option value="money-line">Money Line</option>
                        <option value="under-over">Under Over</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="bet-num">number of bets</label>
                    <input type="number" max="10" min="1" id="bet-num"/>
                    <label htmlFor='bet-amount'>bet amount</label>
                    <input type="text" id="bet-amount" placeholder="(ex. $10.00)"/>
                    <button type="submit">Place Bet</button>
                </FormGroup>
            </FormContainer>
        </BetFormContainer>
    )
}