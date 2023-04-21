import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography, message } from 'antd';
import { ROUTES } from '../../constants';
import { FormRule } from '../../types';
import { Rule } from 'antd/es/form';

const { Title } = Typography;

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const auth = getAuth();

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const registerHandler = async (value: FormRule) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const data = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      await updateProfile(data.user, { displayName: value.username });
      navigate(ROUTES.HOME);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message, 3);
      }
    }
  };

  const validatePasswords = (rule: Rule, value: String) => {
    return !value || form.getFieldValue('password') === value
      ? Promise.resolve()
      : Promise.reject(new Error('Passwords do not match'));
  };

  return (
    <div className="wrapper">
      {contextHolder}
      <Form
        className="form"
        form={form}
        onFinish={(value) => registerHandler(value)}
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
            { validator: validatePasswords },
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
    </div>
  );
};
