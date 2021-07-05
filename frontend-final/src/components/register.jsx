import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


const Register = () => {
    return (
        <Container>
         <ButtonSignGithub href="http://localhost:8080/oauth2/authorization/github"><FontAwesomeIcon icon={faGithub} size="2x"/> <span> Iniciar sesion con github </span></ButtonSignGithub>   
        </Container>
    )
}

export default Register;


const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color: #000;
`;

const ButtonSignGithub = styled.a`
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 10px;
    border:none;
    font-family: sans-serif;    
    color:#008000;
    text-transform:uppercase;
    font-size:18px;
    padding:10px;
    letter-spacing: 2px;
    text-decoration: none;
    cursor:pointer;
    
    &:hover{
        color:#111;
        background-color: #39ff14;
        box-shadow: 0 0 50px #39ff14;
    }

    span{
        margin:10px;
    }
`
