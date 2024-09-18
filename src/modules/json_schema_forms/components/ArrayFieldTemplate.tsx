import React, {useEffect} from "react";
import {ArrayFieldTemplateProps} from "@rjsf/utils";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Icons} from "@/components/icons";
import {usePlanOptions} from "@/components/SalesPlan/SalesPlanOptionProvider";

const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
                                                                   items,
                                                                   canAdd,
                                                                   onAddClick,
                                                                   title,
                                                               }) => {
    const {setCanAdd, onAddTrigger} = usePlanOptions();

    useEffect(() => {
        onAddTrigger(() => {
            onAddClick();
            setTimeout(() => {
                const element = document.getElementById('planOptions');
                if (element) {
                    element.scrollTo({top: element.scrollHeight, behavior: 'smooth'})
                }
            });
        });
    }, [onAddTrigger]);
    useEffect(() => {
        if (canAdd) {
            setCanAdd(canAdd);
        }
    }, [canAdd]);
    return (
        <Card>
            <CardContent className="md:px-0 p-0">
                <div className="space-y-4">
                    {items.map((element, index) => (
                        <React.Fragment key={element.index}>
                            <div className="w-full flex space-x-2 p-4 bg-surface-base rounded relative">
                                <div className={`flex-grow ${element.className}`}>{element.children}</div>
                                <div className="flex gap-1 absolute right-4">
                                    {element.hasMoveUp && (
                                        <Button
                                            variant="outline"
                                            size={"icon"}
                                            shade={"gray"}
                                            className="bg-white h-8 w-8 border-gray-200"
                                            onClick={element.onReorderClick(
                                                element.index,
                                                element.index - 1
                                            )}
                                        >
                                            {Icons.arrowUp()}
                                        </Button>
                                    )}
                                    {element.hasMoveDown && (
                                        <Button
                                            variant="outline"
                                            size={"icon"}
                                            shade={"gray"}
                                            className="bg-white border-gray-200 h-8 w-8"
                                            onClick={element.onReorderClick(
                                                element.index,
                                                element.index + 1
                                            )}
                                        >
                                            {Icons.arrowDown()}
                                        </Button>
                                    )}
                                    {element.hasRemove && (
                                        <Button
                                            size={'icon'}
                                            variant="translucent"
                                            className="w-8 h-8 ml-3"
                                            shade={'danger'}
                                            onClick={element.onDropIndexClick(element.index)}
                                        >
                                            {Icons.trash()}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ArrayFieldTemplate;
