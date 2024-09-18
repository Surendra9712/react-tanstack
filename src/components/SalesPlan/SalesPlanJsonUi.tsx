import TailwindTheme from "@/modules/json_schema_forms/components/TailwindTheme";
import {IChangeEvent} from "@rjsf/core";
import {RJSFSchema, UiSchema} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import UpDownInput from "@/modules/json_schema_forms/components/InputTemplate";
import React, {useEffect, useState} from 'react';
import SalesPlan from "@/types/SalesPlan";
import {camelCaseToTitleCase} from "@/lib/utils";
import {ContentBody} from "@/components/ui/contentBody";
import {Title} from "@/components/ui/title";
import {usePlanOptions} from "@/components/SalesPlan/SalesPlanOptionProvider";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";

const generateUiSchema = (schema: UiSchema) => {
    let uiSchema: UiSchema = {};
    const processObject = (obj: UiSchema) => {
        const uiObject: UiSchema = {};

        Object.keys(obj.properties || {}).forEach((key) => {
            const property = obj.properties[key];

            if (property.type === 'object') {
                uiObject[key] = processObject(property);
            } else if (property.type === 'array') {
                uiObject[key] = {
                    items: processObject(property.items),
                };
            } else if (property.type === 'integer') {
                uiObject[key] = {
                    "ui:widget": UpDownInput,
                    "ui:options": {
                        label: true,
                        title: camelCaseToTitleCase(key),
                    },
                };
            }
        });

        return uiObject;
    };

    if (schema) {
        uiSchema = processObject(schema);
    }

    uiSchema["ui:submitButtonOptions"] = {
        norender: true,
    };

    return uiSchema;
};

const SalesPlanJsonUI = ({
                             jsonParams,
                             plan,
                             setJsonParams,
                         }: {
    jsonParams: object;
    plan: SalesPlan | undefined;
    setJsonParams: (value: object) => void;
}) => {
    const handleChange = ({formData}: IChangeEvent<any>) => {
        setJsonParams(formData);
    };

    const [jsonSchema, setJsonSchema] = useState<RJSFSchema | null>(null);

    const {canAddItems, handleAddClick} = usePlanOptions();

    useEffect(() => {
        if (plan && plan.logicApp?.parameterJsonSchema) {
            const schema = JSON.parse(plan.logicApp.parameterJsonSchema);
            const newSchema = {type: schema.type, ...schema.properties.parameters};
            setJsonSchema(newSchema);
        }
    }, [plan])

    return (
        <div className="md:p-6 p-4 !pt-0 relative md:space-y-6 space-y-4">
            <div className="flex max-md:flex-col justify-between gap-4">
                <div>
                    <Title>Plan Parameters</Title>
                    <ContentBody>Make changes to this sales plan here. Click save when you are done.</ContentBody>
                </div>
                {canAddItems ? (
                    <Button className="w-fit" size={'sm'}
                            type={'reset'}
                            onClick={handleAddClick}>
                        {Icons.plus(20, 20)}
                        Add New
                    </Button>
                ) : null}
            </div>
            <div>
                {jsonSchema && <TailwindTheme
                    validator={validator}
                    schema={jsonSchema}
                    uiSchema={generateUiSchema(jsonSchema)}
                    formData={jsonParams}
                    onChange={handleChange}
                    //onSubmit={handleSubmit}
                />}
            </div>
        </div>
    );
};

export default SalesPlanJsonUI;

