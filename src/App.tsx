import React, { useState, useCallback } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Poll from './components/Poll';
import Admin from './components/Admin';
import Login from './components/Login';
import Debug from './components/Debug';
import { useUserSetup } from './hooks/user.hook';

const App: React.FC = () => {
    useUserSetup();

    return (
        <div className="App">
            {/* <Debug /> */}
            <Admin />
            <Login show={false}/>
            <Header />
            <div className="PollArea Container">
                <Tabs />
                <Poll />
            </div>
        </div>
    );
}

export default App;
