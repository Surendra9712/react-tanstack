import { useState, useEffect } from 'react';

export const useElementDimensions = (element: HTMLElement | null, initialWidth: number = 750) => {
    const [dimension, setDimension] = useState({width:initialWidth,height:0});

    useEffect(() => {
        const handleResize = () => {
            if (element) {
                const { clientWidth: width,clientHeight:height } = element;
                setDimension({width,height});
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [element]);

    return dimension;
};
