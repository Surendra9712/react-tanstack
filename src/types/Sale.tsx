interface Sale {
  id: number;
  stockNumber: number;
  type: string;
  model: string;
  make: string;
  year: number;
  cost: number;
  saleAmount: number;
  color: string;
  date: Date;
  dateStr: string;
  vin: number;
  leaseAmount: number;
  tradeAmount: number;
  customerName: string;
  finance: string;
}

export default Sale;
