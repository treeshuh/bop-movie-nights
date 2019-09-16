import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Poll from './components/Poll';

// temp data
import Debug from './components/Debug';

const App: React.FC = () => {
    return (
        <div className="App">
            {/* <Debug /> */}
            <Header />
            <div className="PollArea Container">
                <Tabs />
                <Poll />
            </div>
        </div>
    );
}

export default App;
