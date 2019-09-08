import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import UpcomingMovie from './data/upcoming.json';
import PollsDebug from './services/polls-debug';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header {...UpcomingMovie}/>
            <PollsDebug />
        </div>
    );
}

export default App;
