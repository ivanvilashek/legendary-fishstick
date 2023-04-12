import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import { ROUTES } from '../../constants';

const { Title } = Typography;

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const auth = getAuth();

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const registerHandler = (value: any) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, value?.email, value?.password);
    navigate(ROUTES.HOME);
  };

  return (
    <Form
      form={form}
      onFinish={registerHandler}
      style={{ maxWidth: '400px', minWidth: '300px' }}
    >
      <Title level={1} style={{ color: '#1677ff', textAlign: 'center' }}>
        Register
      </Title>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="Name"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Incorrect email',
          },
          { required: true, message: 'Please enter your email' },
        ]}
      >
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match'));
            },
          }),
          { required: true, message: 'Please confirm your password' },
        ]}
        dependencies={['password']}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="Confirm your password"
        />
      </Form.Item>

      <Form.Item>
        <Space.Compact block direction="vertical">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Button type="default" onClick={() => navigate(ROUTES.LOGIN)}>
            Log in
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  );
};
