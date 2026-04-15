import VerifyOtp from "./verifyotp";
import Auth from "./auth";
import Login from "./login";
import Signup from "./signup";
import Userinfo from "./userinfo";
import { Route, Routes } from "react-router-dom";
import Forget from "./forget";
import CallBack from "./callback";
import ChangePassword from "./changepassword";
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user" element={<Userinfo/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/verify" element={<VerifyOtp/>}/>
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/changepassword" element={<ChangePassword/>}/>
        <Route path="/auth/google/callback" element={<CallBack/>}/>
      </Routes>
    </div>
  );
}

export default App;
