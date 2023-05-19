import dayjs from 'dayjs';
import { Modal, List } from 'antd';
import { CalendarOutlined, FormOutlined } from '@ant-design/icons';
import { useAppSelector } from 'shared/hook';
import { TransactionValue } from 'core/store/slices/transactionSlice';
import styles from './TransactionModal.module.scss';
import { CategoryIcon } from 'components/CategoryIcon';
import {
  FieldIcon,
  CategorySelect,
  DescriptionInput,
  FormDatePicker,
  AmountInput,
  TypeSelect,
} from './components';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import useActions from 'shared/hook/useActions';

const initialValues = {
  amount: null,
  type: 'expense',
  category: 'uncategorized',
  description: '',
};

export const TransactionModal = () => {
  const { user, UI } = useAppSelector((state) => state);
  const { isOpen, transaction } = UI.modal;

  const { closeModal, addTransaction, updateTransaction } = useActions();

  const { control, setValue, handleSubmit, reset } = useForm<TransactionValue>({
    defaultValues: { ...initialValues, date: dayjs().valueOf() },
    values: transaction?.data,
  });

  const formValues = useWatch({ control });

  const closeDialog = () => {
    reset(initialValues);
    closeModal();
  };

  const onSubmit: SubmitHandler<TransactionValue> = (data) => {
    if (!transaction) {
      addTransaction({
        ...data,
        uid: user.id as string,
      });
    } else {
      updateTransaction({
        data: { ...data, uid: user.id as string },
        id: transaction.id,
      });
    }

    closeDialog();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={closeDialog}
      width={350}
      closable={false}
    >
      <form>
        <TypeSelect control={control} setValue={setValue} />

        <List className={styles.list}>
          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={<FieldIcon value={formValues?.amount}>₴</FieldIcon>}
              description={<AmountInput control={control} />}
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <CategoryIcon
                  type={formValues?.type as string}
                  category={formValues.category as string}
                />
              }
              title={'From category'}
              description={
                <CategorySelect
                  type={formValues.type as string}
                  control={control}
                />
              }
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <FieldIcon
                  icon={<CalendarOutlined />}
                  value={formValues?.date}
                />
              }
              description={<FormDatePicker control={control} />}
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <FieldIcon
                  icon={<FormOutlined />}
                  value={formValues?.description}
                />
              }
              description={<DescriptionInput control={control} />}
            />
          </List.Item>
        </List>
      </form>
    </Modal>
  );
};
