import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { categories } from '../constants';
import { TransactionValue } from 'core/store/slices/transactionSlice';

interface PropsType {
  type: string;
  control: Control<TransactionValue>;
}

export const CategorySelect = ({ type, control }: PropsType) => {
  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          bordered={false}
          size="small"
          options={categories[type]}
        />
      )}
    />
  );
};
