import { withTheme, ThemeProps } from "@rjsf/core";
import FieldTemplate from "./FieldTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";

const TailwindTheme: ThemeProps = {
  templates: {
    FieldTemplate,
    ObjectFieldTemplate,
    ArrayFieldTemplate,
  },
  widgets: {}, // Add custom widgets if needed
};

export default withTheme(TailwindTheme);
