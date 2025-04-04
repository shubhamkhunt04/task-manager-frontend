import { Button, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const StyledHeader = styled.header`
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const StyledTitle = styled(Title)`
  margin: 0;
  margin-right: 48px;
  color: #1890ff;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <StyledHeader>
      <StyledTitle level={4}>Task Manager</StyledTitle>
      <Space>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Space>
    </StyledHeader>
  );
};

export default Navbar;
