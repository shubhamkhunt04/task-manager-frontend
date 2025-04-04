import { Button, Typography, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "80vh" }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title level={2}>Task Management</Title>
            <Text>
              Manage your tasks efficiently with our simple and powerful tool.
            </Text>
            <div style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                size="large"
                style={{ marginRight: "10px" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button size="large" onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
