import { Modal, List } from 'antd';
import { CalendarOutlined, FormOutlined } from '@ant-design/icons';
import { useAppSelector } from 'shared/hook';
import { TransactionData } from 'core/store/slices/transactionSlice';
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
import { initialValues } from './constants/initialValues';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export const TransactionModal = () => {
  const { user, UI } = useAppSelector((state) => state);
  const { isOpen, transaction } = UI.modal;

  const { closeModal, addTransaction, updateTransaction } = useActions();

  const { control, setValue, handleSubmit, reset } = useForm<TransactionData>({
    values: transaction?.data,
  });

  const formValues = useWatch({ control });

  useEffect(() => {
    if (isOpen && transaction) return;
    reset({ ...initialValues, date: +dayjs() });
  }, [isOpen, reset, transaction]);

  const onSubmit: SubmitHandler<TransactionData> = (data) => {
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

    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={closeModal}
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
