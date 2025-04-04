import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRoutes from "./routes/AppRoutes";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { StyledContent, StyledLayout } from "./styles/StyledComponents";

const { Content } = Layout;

const AppContent = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <StyledLayout>
      {token && <Navbar />}
      <StyledContent>
        <AppRoutes />
      </StyledContent>
    </StyledLayout>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
