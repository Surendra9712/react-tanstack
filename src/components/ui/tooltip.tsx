import React, {ReactNode} from 'react';
import * as TooltipPrimitives from '@radix-ui/react-tooltip';
import {TooltipContentProps, TooltipProviderProps} from "@radix-ui/react-tooltip";

interface RadixTooltipProps extends TooltipContentProps ,TooltipProviderProps{
    children: ReactNode;
    text: string
    hide?: boolean
}

const Tooltip = ({text, hide = false, children, ...props}: RadixTooltipProps) => {
    if (hide) {
        return children;
    }
    return (
        <TooltipPrimitives.Provider {...props}>
            <TooltipPrimitives.Root>
                <TooltipPrimitives.Trigger asChild>
                    {children}
                </TooltipPrimitives.Trigger>
                <TooltipPrimitives.Portal>
                    <TooltipPrimitives.Content
                        className="bg-gray-800 max-w-96 text-white z-50 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded  px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                        {...props}
                    >
                        {text}
                        <TooltipPrimitives.Arrow className="fill-gray-800"/>
                    </TooltipPrimitives.Content>
                </TooltipPrimitives.Portal>
            </TooltipPrimitives.Root>
        </TooltipPrimitives.Provider>
    );
};

export default Tooltip;