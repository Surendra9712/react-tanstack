import Employee from "./Employee";

interface Commission {
  id: number;
  stockNumber: string;
  type: string;
  model: string;
  make: string;
  year: number;
  saleAmount: number;
  splitWith: string;
  date: Date;
  dateStr: string;
  customerName: string;
  salesPerson: Employee;
  salesPeople: Employee[];
  finance: string;
  bankName: string | null;
  bankFee: number | null;
  saleType: string;
  financeReserve: number | null;
  leasedIncome: number | null;
}

export default Commission;
