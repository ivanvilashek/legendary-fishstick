import { Control } from 'react-hook-form';
import { TransactionData } from 'core/store/slices/transactionSlice';

export type Props = {
  control: Control<TransactionData>;
};
