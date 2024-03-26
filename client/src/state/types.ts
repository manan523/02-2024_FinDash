//KPIS

export interface ExpensesByCategory {
  salaries: number;
  services: number;
  supplies: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
  _id:string;
}
export interface DailyData {
    date: string;
    revenue: number;
    expenses: number;
    _id:string;
}

export interface GetKpisResponse {
  _id: string;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<MonthlyData>;
  dailyData: Array<DailyData>;
  __v: number;
}

//Products

export interface GetProductsResponse {
  _id: string;
  price: number;
  expense: number;
  transactions: Array<string>;
  __v: number;
}

//Transactions

export interface GetTransactionsResponse {
  _id: string;
  amount: number;
  buyer: number;
  productIds: Array<string>;
  __v: number;
}
