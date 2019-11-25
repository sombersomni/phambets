import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
//Material UI
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

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
    width: 50vw;
    min-width: 300px;
`;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        minWidth: 300
    }
}));
export default function Login() {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    })
    const usernameRef = useRef(null);
    function handleChange(e, name = '') {
        setValues({ ...values, [name]: e.target.value });
    }
    function handleLogin(e) {
        e.preventDefault();
        console.log('login in', values);
    }
    useEffect(() => {
        usernameRef.current.focus();
    }, []);
    return (
        <LoginContainer>
            <h1 style={{ textTransform: 'uppercase' }}>Pham Bet App</h1>
            <MordernForm onSubmit={handleLogin}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                    <OutlinedInput
                        ref={usernameRef}
                        id="outlined-adornment-username"
                        value={values.amount}
                        onChange={e => handleChange(e, 'username')}
                        labelWidth={80}
                        required
                        
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={e => handleChange(e, 'password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setValues({...values, showPassword: !values.showPassword})}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                        required
                        autoComplete="current-password"
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </MordernForm>
        </LoginContainer>
    )
}