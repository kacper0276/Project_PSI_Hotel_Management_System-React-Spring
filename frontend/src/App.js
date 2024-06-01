import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initialState, reducer } from "./reducer";
import { useReducer } from "react";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Layout from "./Layout/Layout";
import MainPage from "./Pages/MainPage/MainPage";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Navigation from "./Layout/UI/Navigation/Navigation";
import MainContext from "./context/MainContext";
import AuthenticatedAdminRoute from "./hoc/AuthenticatedAdminRoute";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import AuthenticatedReceptionistRoute from "./hoc/AuthenticatedReceptionistRoute";
import ReceptionistPanel from "./Pages/ReceptionistPanel/ReceptionistPanel";
import UserPanel from "./Pages/UserPanel/UserPanel";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import RoomBrowser from "./Pages/RoomBrowser/RoomBrowser"
import HallBrowser from "./Pages/HallBrowser/HallBrowser"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const API_URL = "http://localhost:8080";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Routes>
        <Route path="/zmiana/:username" exact element={<></>} />
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Header>
  );

  const content = (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/zaloguj" exact element={<LoginPage />} />
        <Route path="/rejestracja" exact element={<RegisterPage />} />
        <Route
          path="/zmiana/:username"
          exact
          element={<ForgotPasswordPage />}
        />
        {/*Room Browser*/}
        <Route path="/przegladarkapokoji" element={<RoomBrowser/>}/>
        {/*Hall Browser*/}
        <Route path="/przegladarkasal" element={<HallBrowser/>}/>

        {/* Receptionist Panel */}
        <Route
          path="/panelrecepcjonisty"
          exact
          element={
            <AuthenticatedReceptionistRoute>
              <ReceptionistPanel />
            </AuthenticatedReceptionistRoute>
          }
        />

        {/* Admin panel */}
        <Route
          path="/paneladmina"
          exact
          element={
            <AuthenticatedAdminRoute>
              <AdminPanel />
            </AuthenticatedAdminRoute>
          }
        />

        {/* User panel */}
        <Route
          path="/paneluzytkownika"
          exact
          element={
            <AuthenticatedRoute>
              <UserPanel />
            </AuthenticatedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

  const footer = <Footer />;

  return (
    <MainContext.Provider
      value={{
        dispatch: dispatch,
        state: state,
      }}
    >
      <Router>
        <Layout header={header} content={content} footer={footer} />
      </Router>
    </MainContext.Provider>
  );
}

export default App;
