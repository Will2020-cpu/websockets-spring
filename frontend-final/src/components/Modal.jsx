import React from 'react'
import { animated } from 'react-spring'


const Modal = ({ style, closeModal }) => {
  return (
    <animated.div style={style} className="modal">
      <h3 className="modal-title">Modal title</h3>
      <p className="modal-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, soluta? Eaque, exercitationem aperiam veritatis magnam officiis necessitatibus eius modi excepturi cum voluptas, eligendi, adipisci officia nobis aliquid nisi. Est, officiis.
      </p>
      <button className="modal-close-button" onClick={closeModal}>Close</button>
    </animated.div>
  )

}

export default Modal

