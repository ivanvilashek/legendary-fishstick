import { Controller, Control } from 'react-hook-form';
import { Input } from 'antd';
import { TransactionData } from 'core/store/slices/transactionSlice';

type Props = {
  control: Control<TransactionData>;
};

export const DescriptionInput = ({ control }: Props) => {
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
