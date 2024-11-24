import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";

import Header from "./components/Header";

import AppRoutes from "./routes/AppRoutes";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth={"xl"}>
        <AppRoutes />
        <ToastContainer />
      </Container>
    </>
  );
}

export default App;
