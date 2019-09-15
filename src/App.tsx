import React from 'react';
import './styles/App.scss';
import Header from './components/Header';
import TabbedContent from './components/TabbedContent';
import Poll from './components/Poll';

// temp data
import UpcomingMovie from './data/upcoming.json';
import TabsData from './data/tabs.json';
import Debug from './components/Debug';

const App: React.FC = () => {
    const tabs = TabsData.map(tab => ({
        ...tab,
        content: <Poll options={tab.options} title={tab.title} disabled={tab.disabled}/>
    }));
    return (
        <div className="App">
            {/* <Debug /> */}
            <Header />
            <div className="PollArea Container">
                <TabbedContent initialTab={0} tabs={tabs} />
            </div>
        </div>
    );
}

export default App;
