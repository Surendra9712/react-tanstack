import LogicApp from "./LogicApp";

interface SalesPlan {
  id: number;
  description: string;
  logicApp: LogicApp | undefined;
  logicAppJsonParameters: string;
}

export default SalesPlan;
