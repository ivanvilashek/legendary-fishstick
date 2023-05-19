import { Controller, Control } from 'react-hook-form';
import { InputNumber } from 'antd';
import { TransactionValue } from 'core/store/slices/transactionSlice';

interface PropsType {
  control: Control<TransactionValue>;
}

export const AmountInput = ({ control }: PropsType) => {
  return (
    <Controller
      name="amount"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <InputNumber
          {...field}
          size="small"
          bordered={false}
          placeholder="Enter the amount"
          type="number"
        />
      )}
    />
  );
};
