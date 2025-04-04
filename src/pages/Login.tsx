import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  notification,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { login } from "../features/auth/authAPI";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: "success" | "error", message: string) => {
    api[type]({
      message,
      placement: "topRight",
    });
  };

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const data = await login(values.username, values.password);
      dispatch(
        loginSuccess({ token: data.tokens.access.token, user: data.user })
      );
      navigate("/tasks");
    } catch (error) {
      openNotification("error", "Invalid credentials");
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card title="Login" style={{ width: 400 }}>
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Text
              style={{ display: "block", textAlign: "center", marginTop: 12 }}
            >
              Don't have an account?{" "}
              <Link onClick={() => navigate("/register")}>Register here</Link>
            </Text>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
