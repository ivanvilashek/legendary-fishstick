import { Controller, Control } from 'react-hook-form';
import { Input } from 'antd';
import { TransactionValue } from 'core/store/slices/transactionSlice';

interface PropsType {
  control: Control<TransactionValue>;
}

export const DescriptionInput = ({ control }: PropsType) => {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <Input.TextArea
          {...field}
          placeholder="Enter the description"
          autoSize
          bordered={false}
        />
      )}
    />
  );
};
