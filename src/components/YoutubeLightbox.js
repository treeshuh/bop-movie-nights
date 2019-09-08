import React from 'react';
import Lightbox from 'lightbox-react'
import ReactPlayer from 'react-player';
import '../styles/Lightbox.scss';

export default class YoutubeLightbox extends React.Component {
    getSrc() {
        return <div className="lightbox-content">
                <ReactPlayer
                    url={this.props.src}
                    playing
                    controls
                />
            </div>
    }
    render() {
        const {
            isOpen,
            onClose
        } = this.props;
        return isOpen && <Lightbox
            mainSrc={this.getSrc()}
            onCloseRequest={onClose}
            clickOutsideToClose
            enableZoom={false}
        />;
    }
}
