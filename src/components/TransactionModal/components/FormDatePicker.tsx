import { Controller, Control } from 'react-hook-form';
import { DatePicker } from 'antd';
import { TransactionData } from 'core/store/slices/transactionSlice';
import dayjs from 'dayjs';

type Props = {
  control: Control<TransactionData>;
};

export const FormDatePicker = ({ control }: Props) => {
  return (
    <Controller
      name="date"
      control={control}
      defaultValue={+dayjs()}
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
