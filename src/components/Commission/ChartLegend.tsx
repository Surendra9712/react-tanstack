import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";
import {Icons} from "@/components/icons";

const ChartLegend = ({legend}: { legend: { label: string, color: string }[] }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const containerRef = useRef(null);
    useEffect(() => {
        const checkOverflow = () => {
            setTimeout(() => {
                if (containerRef.current) {
                    const {scrollWidth, clientWidth} = containerRef.current;
                    setClientWidth(clientWidth)
                    setScrollWidth(scrollWidth)
                    setIsOverflowing(scrollWidth > clientWidth);
                }
            })
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, []);

    const scroll = (direction: string) => {
        if (containerRef.current) {
            const element = containerRef.current as HTMLElement;
            const scrollAmount = element.clientWidth * 0.4;
            if (direction === 'left') {
                element.scrollBy(-scrollAmount, 0);
            } else {
                element.scrollBy(scrollAmount, 0);
            }
            setScrollPosition(element.scrollLeft);
        }
    };
    return (
        <div className="flex justify-between items-center">
            {isOverflowing && <Button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full"
                size={'icon'}
                variant={'subtle'}
                shade={'gray'}
                disabled={scrollPosition === 0}
            >
                {Icons.chevronLeft()}
            </Button>}
            <ul ref={containerRef}
                className="flex items-center gap-3 h-8 max-w-[calc(100%-100px)] overflow-auto no-scrollbar mx-auto">
                {legend && legend.map((entry, index) => (
                    <li key={`item-${index}`} className="text-body-md whitespace-nowrap flex items-center gap-1">
                        <div
                            style={{
                                backgroundColor: entry.color,
                            }}
                            className={`w-2 h-2 rounded-sm`}
                        />
                        {entry.label}
                    </li>
                ))}
            </ul>
            {isOverflowing && <Button
                className="w-8 h-8 rounded-full"
                size={'icon'}
                variant={'subtle'}
                shade={'gray'}
                onClick={() => scroll('right')}
                disabled={
                    scrollPosition + clientWidth >= scrollWidth
                }
            >
                {Icons.chevronRight()}
            </Button>}
        </div>

    )
}

export default ChartLegend;