import {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";

export interface SalesPlanContextInterface {
    setCanAdd: (value: boolean) => void,
    handleAddClick: (evt: any) => void,
    canAddItems: boolean,
    onAddTrigger: (action: () => void) => void
}

export const PlanOptionContext = createContext<SalesPlanContextInterface>({
    canAddItems: false,
    setCanAdd: () => {
    },
    handleAddClick: () => {
    },
    onAddTrigger: (action: () => void) => {
    }
});

export const usePlanOptions = (): SalesPlanContextInterface => {
    const context = useContext(PlanOptionContext);
    if (!context) {
        throw new Error("usePlans must be used within a SalesPlanOptionProvider");
    }
    return context;
};

export function SalesPlanOptionProvider({children}: { children: ReactNode }) {
    const [canAddItems, setCanAdd] = useState(false);
    const triggerActionRef = useRef<() => void>(() => {
    });

    const handleAddClick = useCallback(() => {
        if (triggerActionRef.current) {
            triggerActionRef.current();
        }
    }, []);

    const setTriggerAction = useCallback((action: () => void) => {
        triggerActionRef.current = action;
    }, []);
    return (
        <PlanOptionContext.Provider value={{canAddItems, setCanAdd, handleAddClick, onAddTrigger: setTriggerAction}}>
            {children}
        </PlanOptionContext.Provider>
    );
}
