import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../styles/Carousel.scss';

function Carousel({
    imgs,
    active,
}) {
    const [activeIndex, setActive] = useState(active || 0);
    const rootEl = useRef(null);

    const handleImageClick = useCallback((event) => {
        const {
            index
        } = event.target.dataset;
        setActive(parseInt(index, 10));
    }, [setActive]);
    const images = useMemo(() => imgs.map((img, index) => (
        <div className={classNames(
                'CarouselImageContainer',
                {'CarouselImageContainer--active': index === activeIndex},
                {'CarouselImageContainer--before': index < activeIndex -1},
                {'CarouselImageContainer--after': index > activeIndex + 1}
            )}
            data-index={index}
            key={`${img.alt}-${index}`}
            onClick={handleImageClick}
        >
            <img
                className={classNames(
                    'CarouselImage',
                    {'CarouselImage--active': index === activeIndex},
                )}
                src={img.src}
                alt={img.alt}
            />
        </div>
    )), [imgs, activeIndex, handleImageClick]);

    /* Handles responsive and transforms */
    const handleResize = useCallback(() => {
        if (!rootEl.current) {
            return;
        }
        const slideEl = rootEl.current.querySelector('.CarouselSlider');
        const firstEl = rootEl.current.querySelector('.Carousel .CarouselImageContainer');
        const activeEl = rootEl.current.querySelector('.CarouselImageContainer--active');
        if (slideEl && firstEl && activeEl) {
            const firstLeft = firstEl.offsetLeft;
            const activeLeft = activeEl.offsetLeft;
            const activeWidth = activeEl.offsetWidth;
            const slideWidth = slideEl.offsetWidth;
            slideEl.style.transform = `translateX(${firstLeft - activeLeft + slideWidth/2 - activeWidth/2}px)`;
        }
    }, []);
    useEffect(handleResize, [handleResize, activeIndex]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        }
    }, [handleResize]);

    /* Handles keyboard presses */ 
    const handleKeyDown = useCallback((event) => {
        console.log(event.keyCode, event.target);
        if (event.keyCode === 37) {
            // left key
            setActive(Math.max(activeIndex-1, 0));
        } else if (event.keyCode === 39) {
            // right key
            setActive(Math.min(activeIndex+1, imgs.length-1));
        }
    }, [imgs, setActive, activeIndex]);

    /* Focuses the active element */
    useEffect(() => {
        if (rootEl.current) {
            const activeEl = rootEl.current.querySelector('.CarouselItemContainer--active');
            if (activeEl) {
                activeEl.focus();
            }
        }
    }, [activeIndex])

    return (
        <div ref={rootEl} onKeyDown={handleKeyDown} tabIndex={0} className="Carousel">
            <div className="CarouselSlider">
                { images }
            </div>
        </div>
    );
}

Carousel.defaultProps = {
    active: 0
}

Carousel.propTypes = {
    imgs: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    })).isRequired,
    active: PropTypes.number
}

export default Carousel;