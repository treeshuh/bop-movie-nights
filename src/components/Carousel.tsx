import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import '../styles/Carousel.scss';

interface Image {
    src: string,
    alt: string
}

interface CarouselProps {
    imgs: Image[],
    active?: number 
}

const Carousel: React.FC<CarouselProps> = ({
    imgs,
    active,
}) => {

    const [activeIndex, setActive] = useState(active || 0);
    const rootEl = useRef<HTMLDivElement>(null);

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
        let thisRoot = rootEl.current;
        if (thisRoot === null) {
            return;
        }
        const slideEl: HTMLElement | null = thisRoot.querySelector('.CarouselSlider');
        const firstEl: HTMLElement | null = thisRoot.querySelector('.Carousel .CarouselImageContainer');
        const activeEl: HTMLElement | null = thisRoot.querySelector('.CarouselImageContainer--active');
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
        if (event.keyCode === 37) {
            // left key
            setActive(Math.max(activeIndex-1, 0));
        } else if (event.keyCode === 39) {
            // right key
            setActive(Math.min(activeIndex+1, imgs.length-1));
        }
    }, [imgs, setActive, activeIndex]);

    return (
        <div ref={rootEl} onKeyDown={handleKeyDown} tabIndex={0} className="Carousel">
            <div className="CarouselSlider">
                { images }
            </div>
        </div>
    );
}

export default Carousel;