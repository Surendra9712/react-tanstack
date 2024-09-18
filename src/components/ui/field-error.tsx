import {FieldApi} from "@tanstack/react-form";
import React from "react";

export default function FieldError({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <span className="absolute -bottom-[18px] text-danger text-body-sm">{field.state.meta.errors.join(", ")}</span>
            ) : null}
        </>
    )
}