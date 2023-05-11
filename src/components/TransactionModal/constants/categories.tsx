import { ImSpoonKnife, ImPencil, ImAirplane, ImGift } from 'react-icons/im';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { QuestionOutlined } from '@ant-design/icons';

interface CategoryType {
  [index: string]: {
    value: string;
    label: string;
    icon?: React.ReactElement | string;
    color?: string;
  }[];
}

export const categories: CategoryType = {
  expense: [
    {
      value: 'uncategorized',
      label: 'Uncategorized expense',
      icon: '?',
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
