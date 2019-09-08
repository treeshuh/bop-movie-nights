import React, { ReactFragment } from 'react';
import classNames from 'classnames';
import '../styles/Tabs.scss';

interface Tab {
    title: string,
    options: object[]
    disabled?: boolean,
    content?: ReactFragment
}

interface Props {
    tabs: Tab[],
    initialTab: number
}

interface State {
    activeTab: number
}

export default class TabbedContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: props.initialTab
        };
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab = (index: number) => () => {
        this.setState({activeTab: index});
    }

    createTab(tab: Tab, index: number) {
        return (<button className="TabButton" onClick={this.setActiveTab(index)}>
            {tab.title}
            {index === this.props.initialTab && <small>Current</small>}
        </button>)
    }

    render() {
        const {
            tabs
        } = this.props;
        const {
            activeTab
        } = this.state; 

        return (
            <div className="TabbedContent">
                <ul className="Tabs">
                    {tabs.map((tab, index) => {
                        return (<li 
                            className={classNames('Tab', {'Tab--active': index === activeTab})} 
                            key={`tab-${tab.title}`}
                        >
                            {this.createTab(tab, index)}
                        </li>)
                    })}
                </ul>
                <div className="Content">
                    {tabs[activeTab].content}
                </div>
            </div>
        );
    }
}