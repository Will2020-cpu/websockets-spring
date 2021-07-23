import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import { selectUser, setSelectUser, selectUserUsername } from '../features/user/user'
import { addMessage, selectMessages } from '../features/messages/messages'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import uuid from 'react-uuid'
import { useTransition } from 'react-spring'
import Modal from './Modal'



function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Chat = () => {
    let query = useQuery();
    const { register, handleSubmit } = useForm();
    const [modalVisible, setModalVisible] = useState(false);

    const transitions = useTransition(modalVisible, {
        from: { opacity: 0, transform: "translateY(-40px)" },
        enter: { opacity: 1, transform: "translateY(0)" },
        leave: { opacity: 0, transform: "translateY(-40px)" }
    })


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

        const datos = {
            message: data.message,
            fromLogin: username
        }
        dispatch(addMessage(datos));
        e.target.reset();
    }

    const onClick = () =>{
        
    }

    return (
        <Container>
            <TopBar>
                <div className="left-items" />
                <h1>{query.get("name")}</h1>
                <div className="right-items">
                    <button onClick={() => setModalVisible(true)}>Change Color</button>
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
            {transitions((styles, item) => (
                item && (
                    <Modal
                        style={styles}
                        closeModal={() => setModalVisible(false)}
                    />
                )
            ))}
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
    border-bottom:1px solid #eeeef1;
    position:sticky;
    top:0;
    z-index:0;
    background:#fff;

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
    }
`

const MessageListContainer = styled.div`
    padding:10px 10px 70px;
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
         background: ${props => props.messageColor ? props.theme.main : "#F4F4F8"};
         color:${props => props.messageColor ? "#fff" : "#000"};
         border-top-left-radius: 20px;
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
    border-top: 1px solid #eeeef1;
    position:fixed;
    width:calc(100% - 20px);
    bottom:0;
    z-index:1;
    background:#fff;
    
    input{
        flex:1 1;
        border:none;
        font-size: 14px;
        height:40px;
        background: none;
        width:100%;
    }

    input:focus{
        outline: none;
    }
`
