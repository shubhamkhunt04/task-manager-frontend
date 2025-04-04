import styled from "styled-components";
import { Layout, Card, Space } from "antd";

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledContent = styled(Layout.Content)`
  padding: 24px;
  margin: 24px;
  background: #fff;
  min-height: 280px;
  border-radius: 8px;
`;

export const StyledCard = styled(Card)`
  height: 100%;
`;

export const StyledSpace = styled(Space)`
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  width: 100%;
`;

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 40px;
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 50px;
`;
