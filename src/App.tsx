import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import UpcomingMovie from './data/upcoming.json';
import Debug from './models/Debug';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header {...UpcomingMovie}/>
            <Debug />
        </div>
    );
}

export default App;
