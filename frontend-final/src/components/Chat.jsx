import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom'
import { selectUser, setSelectUser, selectUserUsername } from '../features/user/user'
import { addMessage, selectMessages } from '../features/messages/messages'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import uuid from 'react-uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Chat = () => {
    let query = useQuery();
    const { register, handleSubmit } = useForm();
    const location = useLocation();

    const dispatch = useDispatch();
    const selectedUser = useSelector(selectUser);
    const username = useSelector(selectUserUsername);
    const allMessages = useSelector(selectMessages);
    let stompClient;

    const connect = () => {
        const socket = new SockJS("http://localhost:8080/chat");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log("conectado" + frame);
            stompClient.subscribe("/topic/messages/" + username, function (response) {
                let data = JSON.parse(response.body);
                dispatch(addMessage({
                    message: data.message,
                    fromLogin: data.fromLogin
                }))
            })
        })
    }

    useEffect(() => {
        connect();

        if (query.get("username") !== null) {
            dispatch(setSelectUser(query.get("username")))
        }
    }, [dispatch, query, connect])



    const onSubmit = (data, e) => {

        stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify({
            fromLogin: username,
            message: data.message
        }))
        

        if (data.message !== '') {

            const datos = {
                message: data.message,
                fromLogin: username
            }
            dispatch(addMessage(datos));
        }

        e.target.reset();
    }


    return (
        <Container>
            <TopBar>
                <div className="left-items" />
                <h1>{query.get("name")}</h1>
                <div className="right-items">
                    <Link
                        to={{
                            pathname: '/settings',
                            state: { background: location }
                        }}
                        className="modal-link"
                    ><FontAwesomeIcon icon={faPalette} size="2x" /> </Link>
                </div>
            </TopBar>
            <MessageListContainer>
                <div className="message">
                    <div className="timestamp">
                        Sabado, Junio 26 2021 8:38PM
                    </div>
                    {
                        allMessages.map(item => (
                            <BubbleContainer messageColor={item.fromLogin === username} key={uuid()}>
                                <div className="bubble">
                                    {item.message}
                                </div>
                            </BubbleContainer>
                        ))
                    }
                </div>
            </MessageListContainer>
            <Compose onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("message")} placeholder="Escribir...." />
            </Compose>

        </Container>
    )
}

export default Chat



//Componentes
const Container = styled.div`
`;

const TopBar = styled.div`
    height:50px;
    display:flex;
    align-items:center;
    font-weight: 500;
    border-bottom:1px solid ${props => props.theme.body === '#fff' ? '#eff3f4' : '#38444d'};
    position:sticky;
    top:0;
    z-index:0;
    background:${props => props.theme.body};

    .left-items{
        flex:1 1;
        padding:10px;
        display:flex;
    }

    h1{
        margin:0;
        font-size: 16px;
        font-weight: 800;
    }

    .right-items{
        flex:1 1;
        padding:10px;
        display:flex;
        flex-direction:row-reverse;
        .modal-link{
            color:${props => props.theme.main};
        }
    }

`

const MessageListContainer = styled.div`
    padding:10px 20px 70px;
    z-index:-1;


    .message{
        display:flex;
        flex-direction:column;
    }

    .message .timestamp{
        display:flex;
        justify-content:center;
        color:#999;
        font-weight: 600;
        font-size:12px;
        margin:10px 0;
        text-transform: uppercase;
    }

    
`;

const BubbleContainer = styled.div`
    font-size:14px;
    display:flex;
    justify-content:${props => props.messageColor ? "flex-end" : "flex-start"};
    margin-bottom:5px;

     .bubble{
         border-bottom-right-radius:20px;
         margin-bottom: 10px;
         border-top-right-radius:${props => props.messageColor ? "none" : "20px"};
         background: ${props => props.messageColor ? props.theme.main : "#F4F4F8"};
         color:${props => props.messageColor ? "#fff" : "#000"};
         border-top-left-radius: ${props => props.messageColor ? "20px" : "none"};
         font-weight:600;
         border-bottom-left-radius: 20px;
         padding:10px 15px;
         margin:1px 0;
         max-width:75%;
    }
`;


const Compose = styled.form`
    padding:10px;
    display:flex;
    align-items:center;
    border-top: 1px solid ${props => props.theme.body === '#fff' ? '#eff3f4' : '#38444d'};
    position:fixed;
    width:calc(100% - 20px);
    bottom:0;
    z-index:1;
    background:${props => props.theme.body};
    

    input{
        flex:1 1;
        border:none;
        font-size: 14px;
        color:inherit;
        height:40px;
        background: none;
        width:100%;
    }

    input:focus{
        outline: none;
    }
`
