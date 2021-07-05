import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux';
import { selectUserName } from '../../features/user/user'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { selectContacto, setContacto } from '../../features/contactos/contactoSlice'


const Header = () => {
    const userName = useSelector(selectUserName);
    const dispatch = useDispatch();
    const contacto = useSelector(selectContacto)
    let stompClient;
    useEffect(()=>{

        connect()
        fetch('http://localhost:8080/fetchAllUsers').then(response =>{
            if(response.ok){
                response.json().then(data => console.log(data))
            }
        })
        fetch('http://localhost:8080/user',{
            credentials: 'include',

        }).then(response =>{
            if(response.ok){
                response.json().then(data => console.log(data))
            }
        })
    },[dispatch])

    const connect = () =>{
        const socket = new SockJS("http://localhost:8080/chat");
        stompClient = Stomp.over(socket);
        stompClient.connect({},function(frame){
            console.log("conectado" + frame);
            stompClient.subscribe("/topic/messages/"+userName,function(response){
                let data = JSON.parse(response.body);
                console.log(data)
            })
        })
    }

    return (
        <Container>
            <TopBar>
                <h1>Contactos</h1>
            </TopBar>
            <ConversationSearch>
                <input type="search" placeholder="Buscar Contacto" />
            </ConversationSearch>

            <ConversationList>
                <img src="https://randomuser.me/api/portraits/women/82.jpg" alt="profile" />
                <div className="conversation-info">
                    <h1>usuario 1</h1>
                    <p>
                        Hola, este es el mensaje mas reciente
                    </p>
                </div>
            </ConversationList>
        </Container>
    )
}

export default Header



//Componentes
const Container = styled.div`
    display:flex;
    flex-direction: column;
`;

const TopBar = styled.div`
    height: 50px;
    border-bottom:1px solid #eeeef1;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight: 500;
    position:sticky;
    top:0;

    h1{
        margin:0px;
        font-size:16px;
        font-weight: 800;
    }
`;

const ConversationSearch = styled.div`
    padding:10px;
    display:flex;
    flex-direction:column;

    input{
        background-color: #f4f4f8;
        padding: 8px 10px;
        border:none;
        border-radius:10px;
    }
    input:focus{
        outline: none;
    }
`;

const ConversationList = styled.div`
    display:flex;
    align-items:center;
    padding:10px;

    img{
        width:50px;
        height:50px;
        border-radius: 50%;
        object-fit:cover;
        margin-right: 10px;
    }

    .conversation-info{

        h1{
            font-size: 14px;
            font-weight: 700;
            text-transform: capitalize;
            margin: 0;
        }
        
        p{
            font-size:14px;
            color:#888;
            margin:0;
        }
    }
`;
