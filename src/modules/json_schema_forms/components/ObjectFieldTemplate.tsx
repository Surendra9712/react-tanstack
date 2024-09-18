import {ObjectFieldTemplateProps} from "@rjsf/utils";
import React from "react";
import {Title} from "@/components/ui/title";
import {camelCaseToTitleCase} from "@/lib/utils";

const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({properties, title}) => {
    const itemsFromTypeArray = properties.filter((item) => item.content.props.schema.type === "array");
    const itemsFromTypeObject = properties.filter((item) => item.content.props.schema.type !== "array");
    return (
        <fieldset>
            {title && <Title size={'md'} className="h-11 border-b mb-3">{camelCaseToTitleCase(title)}</Title>}
            {itemsFromTypeObject.length > 0 &&
                <div
                    className={`${itemsFromTypeArray.length > 0 ? "border-b pb-4 mb-4" : ""}  grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3`}>
                    {itemsFromTypeObject.map(element => (
                        <div key={element.content.key} className="w-full">
                            {element.content}
                        </div>
                    ))}
                </div>}
            {itemsFromTypeArray.length > 0 && itemsFromTypeArray.map(element => (
                <div key={element.content.key} className="w-full">
                    {element.content}
                </div>
            ))}
        </fieldset>
    )
};

export default ObjectFieldTemplate