import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUserUsername } from '../../features/user/user'
import { selectContacto, setContacto } from '../../features/contactos/contactoSlice'
import { Link, useHistory } from 'react-router-dom';


const Header = () => {
    const UserName = useSelector(selectUserUsername);
    const contacto = useSelector(selectContacto)
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        obteniendoDatos()
        async function obteniendoDatos() {
            await fetch('http://localhost:8080/user', {
                credentials: 'include',

            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        dispatch(
                            setUser({
                                name: data.name,
                                username: data.login,
                                picture: data.avatar_url
                            })
                        )
                    })
                }else{
                    history.push('/');
                }
            })
            fetch('http://localhost:8080/fetchAllUsers').then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        let datos = data.filter(item => item.login !== UserName);
                        dispatch(setContacto(datos))
                    })
                }
            })
        }

    }, [UserName, dispatch])



    return (
        <Container>
            <TopBar>
                <h1>Contactos</h1>
            </TopBar>
            <ConversationSearch>
                <input type="search" placeholder="Buscar Contacto" />
            </ConversationSearch>

            {
                contacto.map(item => (
                    <Link to={`/messages?name=${item.name}&username=${item.login}`}  key={item.login} style={{textDecoration:'none', color:"inherit"}}>
                        <ConversationList>
                            <img src={item.avatar_url} alt={item.name} />
                            <div className="conversation-info">
                                <h1>{item.name}</h1>
                                <p>
                                    Hola, este es el mensaje mas reciente
                                </p>
                            </div>
                        </ConversationList>
                    </Link>
                ))
            }
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
    cursor: pointer;

    &:hover{
        background-color: rgba(0,0,0,0.1);
    }

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
