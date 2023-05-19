import { Segmented } from 'antd';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { categories, segmentedOptions } from '../constants';
import { TransactionValue } from 'core/store/slices/transactionSlice';

interface PropsType {
  control: Control<TransactionValue>;
  setValue: UseFormSetValue<TransactionValue>;
}

export const TypeSelect = ({ control, setValue }: PropsType) => {
  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <Segmented
          value={field.value}
          onChange={(data) => {
            field.onChange(data);
            setValue('category', categories[data][0].value);
          }}
          block
          options={segmentedOptions}
        />
      )}
    />
  );
};
