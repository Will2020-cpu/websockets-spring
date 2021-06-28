import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { setUser } from '../features/user/user'
import { useHistory } from 'react-router-dom'




const Register = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory()

    const onSubmit = (data) => {
        fetch("http://localhost:8080/registration/" + data.username).then(Response => {
            if (Response.ok) {
                setUserDetails(data.username)
                history.push("/messages")
            }
        })
    }


    const setUserDetails = (user) => {
        dispatch(
            setUser({
                name: user,
                email: "",
                picture: ""
            })
        )
    }

    return (
        <Container>
            <BoxJoin onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box">
                    <input name="username" {...register("username")} type="text" placeholder="Ingrese username" />
                    <button type="submit"><span>Unete</span></button>
                </div>
            </BoxJoin>
        </Container>
    )
}

export default Register;


const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const BoxJoin = styled.form`
    padding: 4px 4px 5px 4px;
    border:2px solid rgba(0,0,0,.33);
    border-radius:16px;
    background-color:#f4f4f5;

    .input-box{
        position:relative;
        margin:0;
        padding:0;
        display:flex;
        flex-direction:row;

        input::placeholder{
            font-size: 16px;
            color:#292a3a;
        }
        
        input{
            width:312px;
            margin-bottom: 0;
            font-size: 20px;
            padding:14px 17px;
            font-weight: 500;
            border-radius:12px;
            box-shadow:inset 0 1px 4px 0 rgba(0,0,0,.15);
            border:none;
            color:#292a3a;
            font-family:Quicksand,Helvetica,Arial;
        }

        input:focus{
            outline:none;
        }
    }
    button{
        flex:0;
        margin-left:4px;
        padding:14px 16px 12px 16px;
        margin-bottom: 5px;
        font-family:Quicksand,Helvetica,Arial;
        line-height: 18px;
        position:relative;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#2432b8;
        box-shadow:0 4px 0 #0c1f83;
        border-radius:12px;
        border:none;
        font-size: 18px;
        color:#fff;
        transition: all .2s;

        &:hover{
            cursor: pointer;
            background-color: #2432bc;
        }
    }
`;