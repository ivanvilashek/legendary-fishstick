import { useState } from 'react';
import styles from './InputNum.module.scss';

interface InputNumProps {
  value?: number;
  onChange?: (number: number) => void;
  maxLength?: number;
}

export const InputNum = ({ value, onChange, maxLength }: InputNumProps) => {
  const [val, setVal] = useState<number | string>(value || '');
  const [width, setWidth] = useState(2);
  const mdlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    value = +e.target.value;
    if (isNaN(value)) return;
    setVal(value);
    setWidth(value.toString().length + 1);
    if (typeof onChange === 'function') onChange(+e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label>
        {/* ₴ */}
        <input
          value={val}
          onChange={(value) => mdlChangeHandler(value)}
          className={styles.input}
          style={{ width: `${width}ch` }}
          maxLength={maxLength || 15}
          placeholder="Enter the amount"
        />
      </label>
    </div>
  );
};
