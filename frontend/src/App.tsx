import { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Layout from "./Layout/Layout";
import MainPage from "./Pages/MainPage/MainPage";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Navigation from "./Layout/UI/Navigation/Navigation";
import AuthenticatedAdminRoute from "./hoc/AuthenticatedAdminRoute";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import AuthenticatedReceptionistRoute from "./hoc/AuthenticatedReceptionistRoute";
import ReceptionistPanel from "./Pages/ReceptionistPanel/ReceptionistPanel";
import UserPanel from "./Pages/UserPanel/UserPanel";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import RoomBrowser from "./Pages/RoomBrowser/RoomBrowser";
import HallBrowser from "./Pages/HallBrowser/HallBrowser";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import setupAuthInterceptor from "./interceptors/authInterceptor";
import { MainProvider } from "./context/MainContext";
import { initialState, reducer } from "./reducer";

export const API_URL = "http://localhost:8080";

function App() {
  const [_, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setupAuthInterceptor(dispatch);
  }, [dispatch]);

  const header = (
    <Header>
      <Routes>
        <Route path="/platnosc/:idRes" element={<></>} />
        <Route path="/zmiana/:username" element={<></>} />
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Header>
  );

  const content = (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/zaloguj" element={<LoginPage />} />
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/zmiana/:username" element={<ForgotPasswordPage />} />
        <Route path="/przegladarkapokoji" element={<RoomBrowser />} />
        <Route path="/przegladarkasal" element={<HallBrowser />} />
        <Route
          path="/panelrecepcjonisty"
          element={
            <AuthenticatedReceptionistRoute>
              <ReceptionistPanel />
            </AuthenticatedReceptionistRoute>
          }
        />
        <Route
          path="/paneladmina"
          element={
            <AuthenticatedAdminRoute>
              <AdminPanel />
            </AuthenticatedAdminRoute>
          }
        />
        <Route
          path="/paneluzytkownika"
          element={
            <AuthenticatedRoute>
              <UserPanel />
            </AuthenticatedRoute>
          }
        />
        <Route path="/platnosc/:idRes" element={<PaymentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

  const footer = (
    <Routes>
      <Route path="/platnosc/:idRes" element={<></>} />
      <Route path="*" element={<Footer />} />
    </Routes>
  );

  return (
    <MainProvider>
      <Router>
        <Layout header={header} content={content} footer={footer} />
      </Router>
    </MainProvider>
  );
}

export default App;
