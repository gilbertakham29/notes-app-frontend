import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp />} path="/" />
        <Route element={<SignIn />} path="/signin" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
