import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";

const UpDownInput: React.FC<WidgetProps> = ({
                                                id,
                                                value,
                                                required,
                                                disabled,
                                                readonly,
                                                label,
                                                onChange,
                                                onBlur,
                                                onFocus,
                                            }) => {
    const handleIncrement = () => {
        if (!disabled && !readonly) {
            onChange((value || 0) + 1);
        }
    };

    const handleDecrement = () => {
        if (!disabled && !readonly) {
            onChange((value || 0) - 1);
        }
    };

    return (
        <div className="relative">
            <input
                id={id}
                className="number-input h-10 w-full border text-body-lg rounded px-3 py-1 transition-colors placeholder:text-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-danger-200 border-gray-200 focus-not-error read-only:pointer-events-none"
                type="number"
                value={value || 0}
                required={required}
                disabled={disabled || readonly}
                readOnly={readonly}
                onChange={(e) => onChange(parseInt(e.target.value))}
                onBlur={onBlur && ((e) => onBlur(id, e.target.value))}
                onFocus={onFocus && ((e) => onFocus(id, e.target.value))}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Button
                        type={'reset'}
                        size={"icon"}
                        variant={'subtle'}
                        shade={'gray'}
                        className={'w-3 h-3 cursor-default'}
                        onClick={handleIncrement}
                    >
                    {Icons.chevronUp(12, 12)}
                </Button>
                <Button type={'reset'}
                        size={"icon"}
                        variant={'subtle'}
                        shade={'gray'}
                        className={'w-3 h-3 cursor-default'}
                    onClick={handleDecrement}
                >
                    {Icons.chevronDown(12, 12)}
                </Button>
            </div>
        </div>
    );
};

export default UpDownInput;
