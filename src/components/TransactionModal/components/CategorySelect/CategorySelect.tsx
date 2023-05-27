import { Controller } from 'react-hook-form';
import { Select } from 'antd';
import { categories } from 'components/TransactionModal/constants';
import { Props } from './types';

export const CategorySelect = ({ type, control }: Props) => {
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
