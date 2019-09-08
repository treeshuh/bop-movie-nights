import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import PollsDebug from './services/polls-debug';

const App: React.FC = () => {
    return (
        <div className="App">
            <PollsDebug />
            <Header />
        </div>
    );
}

export default App;
