import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';

interface TransactionValue {
  amount: number;
  type: string;
  category: string;
  date: number;
  uid: string;
  description: string | null;
}

interface StateValue {
  id: string;
  data: TransactionValue;
}

const initialState: StateValue[] = [];

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction: TransactionValue) => {
    const transactionRef = await addDoc(
      collection(db, 'transactions'),
      transaction
    );
    const newTransaction = { id: transactionRef.id, data: transaction };
    return newTransaction;
  }
);

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (uid: any) => {
    const q = await query(
      collection(db, 'transactions'),
      where('uid', '==', uid)
    );
    const querySnapshot = await getDocs(q);
    const transactions = querySnapshot.docs.map(
      (item) => ({ id: item.id, data: item.data() } as StateValue)
    );
    return transactions;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(getTransactions.fulfilled, (state, action) => action.payload);
  },
});

export default transactionSlice.reducer;
