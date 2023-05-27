import { Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Props } from './types';

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
