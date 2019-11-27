import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { throttle } from 'lodash';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//Components
import MessageAlert from './MessageAlert';

//Context
import { AppUIContext } from '../contexts/AppUIContext';
import UserContext from '../contexts/UserContext';
//Store
import { observer } from 'mobx-react';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 25px;
`;

const FormGroupContainer = styled.div`
    display: flex;
    flex-direction: ${ props => props.mobile ? 'column' : 'row'};
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0px 10px;

    input, textarea, select {
        width: 100%;
    }
    
`;

const BetFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: center;
    margin: 0px 10px;
    max-width: 50vw;
    min-width: 300px;

    h1,h2,h3,h4 {
        text-align: center;
        text-transform: capitalize;
        margin-top: 0px;
        width: 100%;
    }
`;
function BetForm() {
    const classes = useStyles();
    const ui = useContext(AppUIContext);
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
       message: 'hurray',
       variant: 'success' 
    });
    const [bet, setBet] = useState({
        name: 'Rockets vs. Pistons',
        type: 'money-line',
        amount: 5,
        numOfBets: 1,
    });
    const labelWidth = 80;

    const placeBet = async(e) => {
        e.preventDefault();
        console.log('bet', bet);
        try {
            const response = await axios.post('http://localhost:8080/bet', { ...bet, username: user.username, id: user.id })
            console.log(response);
            if (response.status === 200) {
                //show success message
                const { data } = response;
                setAlert({ message: data , variant: 'success' });
            }
        } catch (err) {
            console.log(err);
            const { data } = err.response;
            setAlert({ message: data, variant: 'error' });
        }
        setOpen(true);
    }

    const tPlaceBet = throttle(placeBet, 5000, { leading: true });
    console.log(tPlaceBet);
    function handleChange(e, name) {
        setBet({ ...bet, [name]: e.target.value });
    }

    function calculateTotal() {
        return parseFloat(bet.amount * bet.numOfBets).toFixed(2);
    }
    return (
        <BetFormContainer>
            { user.loggedIn ? null :
            <Redirect exact to="/login" /> }
            <h2>{user.username }, Place Your Bet</h2>
            <FormContainer
                onSubmit={tPlaceBet}>
                <FormGroupContainer mobile={ui.mobile}>
                    <FormGroup>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows="4"
                            defaultValue="(ex. Rockets vs. Pistons)"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={e => handleChange(e, 'name')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">
                                Bet Type
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={bet.type}
                                onChange={e => handleChange(e, 'type')}
                                labelWidth={labelWidth}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="money-line">Money Line</MenuItem>
                                <MenuItem value="over-under">Over/Under</MenuItem>
                                <MenuItem value="bet-slip">Bet Slip</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-num-bets">Number of Bets</InputLabel>
                            <OutlinedInput
                                id="outlined-num-bets"
                                value={bet.numOfBets}
                                onChange={e => handleChange(e, 'numOfBets')}
                                labelWidth={100}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={bet.amount}
                                onChange={e => handleChange(e, 'amount')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                            />
                        </FormControl>
                    </FormGroup>
                </FormGroupContainer>
                <p>Total : ${calculateTotal()}</p>
                <Button type="submit" variant="contained" color="primary">Place Bet</Button>
            </FormContainer>
            <MessageAlert 
                open={open}
                setOpen={setOpen}
                variant={alert.variant}
                message={alert.message} />
        </BetFormContainer>
    )
}

export default observer(BetForm);