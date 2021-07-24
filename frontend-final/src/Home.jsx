import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/Chat'
import Register from './components/register'
import Modal from './components/Modal'
import { Switch, Route, useLocation } from 'react-router-dom'



const Home = () => {
    const location = useLocation();

    const background = location.state && location.state.background;

    return (
        <div>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <Register />
                </Route>
                <Route path="/messages">
                    <div className="App">
                        <div className="scrollable sidebar">
                            <Sidebar />
                        </div>
                        <div className="scrollable content">
                            <Chat />
                        </div>
                    </div>
                </Route>
                <Route path="/settings">
                    <Modal />
                </Route>
            </Switch>
            {background && <Route path="/settings" children={<Modal />} />}
        </div>
    )
}

export default Home
