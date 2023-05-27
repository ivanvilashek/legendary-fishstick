import { Segmented } from 'antd';
import { Controller } from 'react-hook-form';
import { categories, segmentedOptions } from '../../constants';
import { Props } from './types';

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
