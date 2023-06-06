import { ImSpoonKnife, ImPencil, ImAirplane, ImGift } from 'react-icons/im';
import { BsFillBriefcaseFill } from 'react-icons/bs';

export type Category = {
  value: string;
  label: string;
  icon: React.ReactElement | string;
  color: string;
};

type Categories = {
  [index: string]: Category[];
};

export const categories: Categories = {
  expense: [
    {
      value: 'uncategorized',
      label: 'Uncategorized expense',
      icon: '?',
      color: '#bfbfbf',
    },
    {
      value: 'food',
      label: 'Food',
      icon: <ImSpoonKnife />,
      color: '#fcba03',
    },
    {
      value: 'education',
      label: 'Education',
      icon: <ImPencil />,
      color: '#eb4034',
    },
    {
      value: 'travel',
      label: 'Travel',
      icon: <ImAirplane />,
      color: '#32a852',
    },
    {
      value: 'gift',
      label: 'Gift',
      icon: <ImGift />,
      color: '#ff9666',
    },
  ],
  income: [
    {
      value: 'salary',
      label: 'Salary',
      icon: <BsFillBriefcaseFill />,
      color: '#ac6526',
    },
    {
      value: 'gift',
      label: 'Gift',
      icon: <ImGift />,
      color: '#ff9666',
    },
  ],
};
