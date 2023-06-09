import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'core/utils/firebase';
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
import { Transaction, TransactionData } from './types';
import { initialState } from './constants';

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction: TransactionData) => {
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
  async (editedTransaction: Transaction) => {
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
      (item) => ({ id: item.id, data: item.data() } as Transaction)
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
