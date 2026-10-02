
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import { useSelector } from "react-redux";
import getCurrentUser from "./hooks/getCurrentUser.jsx";

export const serverURL = "http://localhost:5000";


const App = () => {

  getCurrentUser();

  const { userData } = useSelector((state) => state.user);

  return (
    
    <Routes>

      <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to={"/"}/>} />
      <Route path="/signin" element={!userData ? <SignIn/> : <Navigate to={"/"}/>} />
      <Route path="/" element={ userData ? <Home/> : <Navigate to={"/signin"}/>} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword/> : <Navigate to={"/"}/>} />

    </Routes>
    
  )
}

export default App;