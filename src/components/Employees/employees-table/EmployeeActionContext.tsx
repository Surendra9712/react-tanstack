import { createContext } from "react";

export const HandleEmployeeContext = createContext<(personId: number) => void>(
  () => {}
);
