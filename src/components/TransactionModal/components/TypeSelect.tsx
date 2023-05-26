import { Segmented } from 'antd';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { categories, segmentedOptions } from '../constants';
import { TransactionData } from 'core/store/slices/transactionSlice';

type Props = {
  control: Control<TransactionData>;
  setValue: UseFormSetValue<TransactionData>;
};

export const TypeSelect = ({ control, setValue }: Props) => {
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
