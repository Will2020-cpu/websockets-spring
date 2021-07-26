import React, { useState } from 'react'
import { animated } from 'react-spring'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTransition } from 'react-spring'
import { changeColor,changeColorBubble } from '../features/themes/themes'
import { useDispatch,useSelector } from 'react-redux'
import { selectTheme } from '../features/themes/themes'



const Modal = () => {
  const dispatch = useDispatch();
  const themeColor = useSelector(selectTheme)
  const location = useLocation();
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

  let theme = {
    light: {
      color: '#fff',
      name: 'Claro',
      active: true,
    },
    semiDark: {
      color: '#15202B',
      name: 'Semi-Dark',
      active: false,
    },
    dark: {
      color: '#000000',
      name: 'Oscuro',
      active: false,
    }
  }

  const onClickTheme = (color) => {
    const colorFont = color !== '#fff' ? '#fff' : '#000';
    let colorBox = '';

    switch (color) {
      case ('#15202B'):
        colorBox = '#192734';
        break;
      case ('#000000'):
        colorBox = '#15181C'
        break;
      default:
        colorBox = '#F7F9F9'
    }

    dispatch(changeColor({
      body: color,
      color: colorFont,
      colorBox: colorBox
    }))

  }

  const onClickColor = (color) =>{
    dispatch(changeColorBubble({
      color:color,
    }))
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
                    <Colors colorBox={item} onClick={()=> onClickColor(item)} >
                      {
                        themeColor.main === item ? 
                        <input type="radio" name="color" id={item} checked/>
                        :
                        <input type="radio" name="color" id={item}/>
                      }
                        <div className="design"></div>
                    </Colors>
                  ))
                }
              </div>
              <h3 style={{ marginTop: '20px' }}>Tema</h3>
              <div className="box-content-theme">
                {
                  Object.values(theme).map(item => (
                    <Themes  themeColor={item.color} onClick={()=>onClickTheme(item.color)}  >
                      {
                        themeColor.body === item.color ? 
                        <input type="radio" name="theme" id={item.name}  defaultChecked/>
                        :
                        <input type="radio" name="theme" id={item.name} />
                      }
                      <div className="design"></div>
                      <div className="text">{item.name}</div>
                    </Themes>
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
  background:rgba(91,112,131,0.4);

  .modal {
    width: 500px;
    height: 450px;
    border-radius:20px;
    color:${props => props.theme.colorBody};
    background:${props => props.theme.body};
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
          background:${props => props.theme.colorBox};
          padding:10px;
          border-radius: 20px;
          position:relative;
          display:grid;
          grid-template-columns:repeat(6,minmax(0,1fr));
          justify-content: center;
          grid-gap:20px;
          grid-template-rows: repeat(1,minmax(0,1fr));
        }

        .box-content-theme{
          background:${props => props.theme.colorBox};
          padding:10px;
          position:relative;
          margin-top:10px;
          border-radius: 20px;
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          justify-content:center;
          grid-gap:20px;
          grid-template-rows: repeat(1,minmax(0,1fr));
        }
      }

    .modal-close-button {
    display:flex;
    padding: 10px 15px;
    border-radius:20px;
    background-color: ${props => props.theme.main};
    color: #fff;
    font-size: 1em;
    border: none;
    margin-top: 16px;
    align-self: center;
    cursor: pointer;
    transition: background-color 0.1s linear;
    }
  }
`;


const Themes = styled.label`
  display:flex;
  align-items:center;
  border-radius:100px;
  background:${props => props.themeColor};
  padding:14px 16px;
  margin:10px 0;
  cursor:pointer;
  transition:.3s;



  input{
    position:absolute;
    left:0;
    top:0;
    right:0;
    width:1px;
    height:1px;
    opacity:0;
    z-index:-1;
  }
  .design{
    width:22px;
    height:22px;
    border-radius:100px;
    background: ${props => props.theme.main};
    position:relative;

    &:before{
      content:'';
      display:inline-block;
      width:inherit;
      height:inherit;
      border-radius:inherit;

      background:hsl(0,0%,90%);
      transform:scale(1.1);
      transition:.3s;
    }
  }
  input:checked+.design:before{
    transform:scale(0);
  }


  .text{
    color:hsl(0,0%,60%);
    margin-left:14px;
    letter-spacing:1px;
    text-transform:uppercase;
    font-size:12px;
    font-weight:900;

    transition:.3s;
  }

  input:checked~.text{
    color:hsl(0,0%,40%);
  }

`

const Colors = styled(Themes)`
  background:${props => props.colorBox};
  padding:0;
  width:50px;
  height:50px;
  border-radius:50%;

  .design{
    background:url("/check.png") no-repeat;
    background-size:20px 20px;
    left:27%;
    
    &:before{
      background:${props => props.colorBox};
    }
  }
`



