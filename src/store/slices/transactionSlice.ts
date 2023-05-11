import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

export interface TransactionValue {
  amount: number;
  type: string;
  category: string;
  date: number;
  uid: string;
  description: string | null;
}

export interface StateValue {
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

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (editedTransaction: StateValue) => {
    await updateDoc(doc(db, 'transactions', editedTransaction.id), {
      data: editedTransaction.data,
    });
    return editedTransaction;
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: string) => {
    await deleteDoc(doc(db, 'transactions', id));
    return id;
  }
);

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (uid: string | undefined) => {
    if (!uid) return;
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
      .addCase(getTransactions.fulfilled, (state, action) => action.payload)
      .addCase(deleteTransaction.fulfilled, (state, action) =>
        state.filter((item) => item.id !== action.payload)
      )
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.findIndex((item) => item.id === id);
        if (index !== -1) {
          state[index] = { id: id, data };
        }
      });
  },
});

export default transactionSlice.reducer;
