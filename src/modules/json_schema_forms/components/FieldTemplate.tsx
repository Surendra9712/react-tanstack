import React from "react";
import { FieldTemplateProps } from "@rjsf/utils";
import { Label } from "@/components/ui/label";
import Help from "./Help";
import Description from "./Description";
import Error from "./Error";

const FieldTemplate: React.FC<FieldTemplateProps> = ({
  id,
  children,
  classNames,
  displayLabel,
  hidden,
  label,
  required,
  rawDescription,
  rawErrors = [],
  rawHelp,
}) => {
  if (hidden) {
    return <div className="hidden">{children}</div>;
  }


  return (
    <div className={`${classNames} space-y-1`}>
      {displayLabel && (
        <Label htmlFor={id} size={'md'} weight={'medium'} className="line-clamp-1">
          {label}
        </Label>
      )}
      {children}
      {displayLabel && rawDescription && (
        <Description description={rawDescription} />
      )}
      {rawErrors.length > 0 && <Error errors={rawErrors} />}
      {rawHelp && <Help help={rawHelp} />}
    </div>
  );
};

export default FieldTemplate;
