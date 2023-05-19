import {
  openModal as openModalRaw,
  closeModal as closeModalRaw,
} from 'core/store/slices/UISlice';
import {
  addTransaction as addTransactionRaw,
  updateTransaction as updateTransactionRaw,
  deleteTransaction as deleteTransactionRaw,
  getTransactions as getTransactionsRaw,
  TransactionValue,
  StateValue,
} from 'core/store/slices/transactionSlice';
import { useAppDispatch } from 'shared/hook';

const useActions = () => {
  const dispatch = useAppDispatch();

  const openModal = (payload: StateValue | null) =>
    dispatch(openModalRaw(payload));
  const closeModal = () => dispatch(closeModalRaw());

  const addTransaction = (payload: TransactionValue) =>
    dispatch(addTransactionRaw(payload));
  const updateTransaction = (payload: StateValue) =>
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
