import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import HomePage from "./Home";
import RegisterPage from "./Register";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
