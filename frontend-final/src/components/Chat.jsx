import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import { selectUser, setSelectUser } from '../features/user/user'
import { useSelector,useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Chat = () => {
    let query = useQuery();
    const { register,handleSubmit,watch } = useForm();

    const dispatch = useDispatch();
    const selectedUser = useSelector(selectUser)
    useEffect(()=>{
        if(query.get("username") !== null){
            dispatch(setSelectUser(query.get("username")))
        }
    },[dispatch,query])
    return (
        <Container>
            <TopBar>
                <h1>{query.get("name")}</h1>
            </TopBar>
            <MessageListContainer>
                <div className="message">
                    <div className="timestamp">
                        Sabado, Junio 26 2021 8:38PM
                    </div>
                    <div className="bubble-container">
                        <div className="bubble">
                            Hola este un nuevo mensaje escrito por mi
                        </div>
                    </div>
                </div>
            </MessageListContainer>
            <Compose>
                <input type="text" placeholder="Escribir...." />
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
    justify-content:center;
    font-weight: 500;
    border-bottom:1px solid #eeeef1;
    position:sticky;
    top:0;

    h1{
        font-size: 16px;
        font-weight: 800;
    }
`

const MessageListContainer = styled.div`
    padding:10px 10px 70px;

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

    .message .bubble-container{
        font-size: 14px;
        display:flex;
        justify-content:flex-start;

        .bubble{
            border-bottom-right-radius:20px;
            margin-bottom: 10px;
            background: #007aff;
            color:#fff;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            padding:10px 15px;
            margin:1px 0;
            max-width:75%;
        }
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