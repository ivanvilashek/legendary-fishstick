import { Controller } from 'react-hook-form';
import { Input } from 'antd';
import { Props } from './types';

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
