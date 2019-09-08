import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import UpcomingMovie from './data/upcoming.json';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header {...UpcomingMovie}/>
        </div>
  );
}

export default App;
