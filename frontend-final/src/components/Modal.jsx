import React, { useState } from 'react'
import { animated } from 'react-spring'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTransition } from 'react-spring'

const Modal = () => {
  const location = useLocation();
  console.log(location.pathname === '/settings')
  const [modalVisible, setModalVisible] = useState(location.pathname === '/settings');

  const history = useHistory();

  const transitions = useTransition(modalVisible, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-40px)" }
  })

  const onClick = (e) => {
    e.stopPropagation();
    setModalVisible(!modalVisible)
    history.goBack();
  }

  const colors = {
    blue: '#1DA1F2',
    yellow: '#FFAD1F',
    red: '#E0245E',
    purple: '#794BC4',
    orange: '#F45D22',
    green: '#17BF63'
  }

  const theme = {
    light: {
      color: '#fff',
      name: 'Claro',
    },
    semiDark: {
      color: '#15202B',
      name: 'Semi-Dark'
    },
    dark: {
      color: '#000000',
      name: 'Oscuro'
    }
  }


  return (
    <Container>
      {transitions((styles, item) => (
        item && (
          <animated.div style={styles} className="modal">
            <div className="title">
              <h3>Personaliza su tema</h3>
            </div>
            <div className="box-color">
              <h3>Color</h3>
              <div className="box-content-color">
                {
                  Object.values(colors).map(item => (
                    <div><Colors colorBox={item} /></div>
                  ))
                }
              </div>
              <h3 style={{ marginTop: '20px' }}>Tema</h3>
              <div className="box-content-theme">
                {
                  Object.values(theme).map(item => (
                    <div><Themes colorTheme={item.color}>{item.name}</Themes></div>
                  ))
                }
              </div>
            </div>
            <button className="modal-close-button" onClick={onClick}>Listo</button>
          </animated.div>
        )
      ))}
    </Container>
  )

}

export default Modal

const Container = styled.div`
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  z-index:10;
  background:rgba(0,0,0,0.15);

  .modal {
    width: 500px;
    height: 450px;
    border-radius:20px;
    color: #000;
    background:#fff;
    padding: 14px 40px;
    position: absolute;
    z-index: 90;
    top: calc(50% - 45%);
    left: calc(50% - 20%);
    display: flex;
    justify-content:space-between;
    flex-direction: column;

      .title{
        display:flex;
        justify-content:center;
        align-items:center;
      }

      .box-color{
        h3{
          font-size: 14px;
          color:#556673;
          margin:0;
          padding:0;
        }

        .box-content-color{
          background:#F7F9F9;
          padding:10px;
          display:grid;
          grid-template-columns:repeat(6,minmax(0,1fr));
          justify-content: center;
          grid-gap:20px;
          grid-template-rows: repeat(1,minmax(0,1fr));
        }

        .box-content-theme{
          background:#F7F9F9;
          padding:10px;
          margin-top:10px;
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          justify-content:center;
          grid-gap:20px;
          grid-template-rows: repeat(1,minmax(0,1fr));
        }
      }

    .modal-close-button {
    display:flex;
    padding: 10px;
    border-radius:20px;
    background-color: #1A91DA;
    color: #fff;
    font-size: 1em;
    border: none;
    margin-top: 16px;
    align-self: center;
    cursor: pointer;
    transition: background-color 0.1s linear;
    }

    .modal-close-button:hover,
    .modal-close-button:focus {
    background-color: #1A91DA;
    }
  }
`;

const Colors = styled.div`
  background:${props => props.colorBox};
  padding:30px 18px;
  border-radius:50%;

`

const Themes = styled.div`
  background: ${props => props.colorTheme};
  color:${props => props.colorTheme !== '#fff' ? '#fff':'#000'};
  font-size:17px;
  font-weight: 600;
  padding:10px 20px;
  border-radius:5px;
  border:1px solid #1A91DA;

`




