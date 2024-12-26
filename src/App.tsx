import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp />} path="/" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Welcome />} path="/welcome" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
