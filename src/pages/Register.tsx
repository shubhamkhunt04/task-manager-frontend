import { Form, Input, Button, Card, Row, Col, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/authAPI";

const Register = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: "success" | "error", message: string) => {
    api[type]({
      message,
      placement: "topRight",
    });
  };

  const handleRegister = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await register(values.username, values.password);
      openNotification("success", "Registration successful. Please login.");
      navigate("/login");
    } catch (error: any) {
      console.log({ error });
      openNotification(
        "error",
        error?.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card title="Register">
            <Form layout="vertical" onFinish={handleRegister}>
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
                  { required: true, message: "Please enter a password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>
            </Form>
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <a onClick={() => navigate("/login")}>Login here</a>
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Register;
