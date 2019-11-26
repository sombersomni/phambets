import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
//Contexts
import UserContext from '../contexts/UserContext';
//Material UI
import Button from '@material-ui/core/Button';

const NavContainer = styled.div`
    width: 100vw;
    min-height: 80px;
    background: lavender;
    display: flex;
    flex-direction: row;
    align-items: center;

    h3 {
        font-style: italic;
    }

    > div {
        flex-grow: 1;
        padding: 0px 25px;
        display: flex;
        flex-direction: row;
    }

    a {
        font-weight: bold;
        margin: 0px 10px;
    }
`;

const LinkContainer = styled.div`
    justify-content: ${props => props.left ? 'flex-start' : 'flex-end'};
`;

function Navigation() {
    const user = useContext(UserContext);

    function handleLogout() {
        if (window.sessionStorage) {
            window.sessionStorage.clear();
        }
        user.logout();
    }

    return (
        <NavContainer>
            <LinkContainer left={true}>
                <Link to="/"><h3>PhamBets</h3></Link>
            </LinkContainer>
            <LinkContainer>
                { !user.loggedIn ?
                    <Link to="/login">
                        <Button variant="outlined" color="primary">Login
                        </Button>
                    </Link> : 
                    <Button onClick={handleLogout} variant="outlined" color="secondary">
                        Logout
                    </Button>
                }
                <Link to="/signup"><Button>Signup</Button></Link>
            </LinkContainer>
        </NavContainer>
    )
}

export default observer(Navigation);