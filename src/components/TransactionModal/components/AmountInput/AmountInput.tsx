import { Controller } from 'react-hook-form';
import { InputNumber } from 'antd';
import { Props } from './types';

export const AmountInput = ({ control }: Props) => {
  return (
    <Controller
      name="amount"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <InputNumber
          {...field}
          size="small"
          autoFocus
          bordered={false}
          placeholder="Enter the amount"
          type="number"
        />
      )}
    />
  );
};
