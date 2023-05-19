import { Controller, Control } from 'react-hook-form';
import { DatePicker } from 'antd';
import { TransactionValue } from 'core/store/slices/transactionSlice';
import dayjs from 'dayjs';

interface PropsType {
  control: Control<TransactionValue>;
}

export const FormDatePicker = ({ control }: PropsType) => {
  return (
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <DatePicker
          value={dayjs(field.value)}
          onChange={(date) => field.onChange(date?.valueOf())}
          format={'D MMM, YYYY'}
          allowClear={false}
          bordered={false}
          suffixIcon={false}
        />
      )}
    />
  );
};
