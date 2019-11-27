import React, { useState, useEffect, useRef, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import axios from 'axios';
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
//Components
import MessageAlert from '../components/MessageAlert';
//Contexts
import UserContext from '../contexts/UserContext';

const MordernForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50vw;
    min-width: 250px;

    input {
        width: 100%;
    }
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
        width: '100%'
    }
}));

function LoginForm() {
    const user = useContext(UserContext);
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    })
    const [alert, setAlert] = useState({
        message: '',
        variant: 'success'
    });

    const [open, setOpen] = useState(false);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function handleChange(e, name = '') {
        setValues({ ...values, [name]: e.target.value });
    }
    async function handleLogin(e) {
        e.preventDefault();
        console.log('login in', values);
        const { username, password } = values;
        try {
            const url = window.APP_ENV === 'development' ? 'http://localhost:8080/login' : '/login';
            const response = await axios.post(url, { username, password});
            console.log(response);
            if (response.status === 200) {
                const { id, username } = response.data;
                const token = response.headers['x-auth-token'];
                if (window.sessionStorage) {
                    console.log('setting token', token);
                    window.sessionStorage.setItem('token', token);
                }
                user.login(id, username, token);
                console.log(user.loggedIn, 'user is logged in');
            }
        } catch(err) {
            const { data } = err.response;
            setAlert({ message: data, variant: 'error' });
            setOpen(true);
        }
    }

    useEffect(() => {
        usernameRef.current.focus();
        setValues({ 
            ...values,
            username: usernameRef.current.value || '',
            password: passwordRef.current.value || ''
        });
    }, []);

    const validated = values.username.length > 0 && values.password.length > 0;

    return (
            <MordernForm onSubmit={handleLogin}>
                { user.loggedIn ? <Redirect exact to="/bet" /> : null }
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                    <OutlinedInput
                        ref={usernameRef}
                        id="outlined-adornment-username"
                        value={values.username}
                        onChange={e => handleChange(e, 'username')}
                        labelWidth={80}
                        required
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        ref={passwordRef}
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
                <Button 
                    disabled={!validated}
                    type="submit" variant="contained" color= "primary">Submit</Button>
                <MessageAlert message={alert.message} variant={alert.variant} open={open} setOpen={setOpen} />
            </MordernForm>
    )
}

export default observer(LoginForm);