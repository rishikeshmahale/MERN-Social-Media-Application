
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

export const serverURL = "http://localhost:5000";


const App = () => {
  return (
    
    <Routes>

      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />

    </Routes>
    
  )
}

export default App;