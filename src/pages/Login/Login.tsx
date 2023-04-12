import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { ROUTES } from '../../constants';

const { Title } = Typography;

export const Login = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const loginHandler = (values: any) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        localStorage.setItem('token', 'true');
        navigate(ROUTES.HOME);
      })
      .catch(console.error);
  };

  return (
    <Form
      form={form}
      onFinish={loginHandler}
      initialValues={{ remember: true }}
      style={{ maxWidth: '400px', minWidth: '300px' }}
    >
      <Title level={1} style={{ color: '#1677ff', textAlign: 'center' }}>
        Log in
      </Title>
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
          prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Log in
        </Button>
        Or <Link to={ROUTES.REGISTER}>register now!</Link>
        <Link to="" style={{ float: 'right' }}>
          Forgot password
        </Link>
      </Form.Item>
    </Form>
  );
};
