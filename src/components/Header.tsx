import React from 'react';
import * as UpcomingMovie from '../data/upcoming.json';
import '../styles/Header.scss';

const Header: React.FC = () => {
    return (
      <div
        className="Header"
        style={{backgroundImage: `url(${UpcomingMovie.wallpaper})`}}
      >
          <div className="Container">
              <h1 className="Header-title">{UpcomingMovie.title}</h1>
          </div>
      </div>
    );
}
  
export default Header;
  