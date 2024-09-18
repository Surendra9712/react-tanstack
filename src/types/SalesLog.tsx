interface SalesLog {
    saleId: number,
    splitWith: string;
    type: string,
    make: string,
    date: Date,
    model: string,
    customerName: string,
    amount: number
  }
  
  export default SalesLog;