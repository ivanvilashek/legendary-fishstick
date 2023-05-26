export type TransactionData = {
  amount: number | null;
  type: string;
  category: string;
  date: number;
  uid: string;
  description: string;
};

export type Transaction = {
  id: string;
  data: TransactionData;
};
