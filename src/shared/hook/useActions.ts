import {
  openModal as openModalRaw,
  closeModal as closeModalRaw,
} from 'core/store/slices/UISlice';
import {
  addTransaction as addTransactionRaw,
  updateTransaction as updateTransactionRaw,
  deleteTransaction as deleteTransactionRaw,
  getTransactions as getTransactionsRaw,
  TransactionData,
  Transaction,
} from 'core/store/slices/transactionSlice';
import { useAppDispatch } from 'shared/hook';

const useActions = () => {
  const dispatch = useAppDispatch();

  const openModal = (payload: Transaction | null) =>
    dispatch(openModalRaw(payload));
  const closeModal = () => dispatch(closeModalRaw());

  const addTransaction = (payload: TransactionData) =>
    dispatch(addTransactionRaw(payload));
  const updateTransaction = (payload: Transaction) =>
    dispatch(updateTransactionRaw(payload));
  const getTransactions = () => dispatch(getTransactionsRaw());
  const deleteTransaction = (payload: string) =>
    dispatch(deleteTransactionRaw(payload));

  return {
    openModal,
    closeModal,
    addTransaction,
    updateTransaction,
    getTransactions,
    deleteTransaction,
  };
};

export default useActions;
