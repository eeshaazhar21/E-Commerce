import { Store, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ChangePassword() {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading,setloading]=useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const server=process.env.REACT_APP_SERVER;
  const API = `${server}/api/auth`;

  const email = location.state?.email;

  const handlesubmit = async() => {
    setloading(true)
    if(!password || !confirmpassword){
        alert('ALL FIELDS REQUIRED')
        setloading(false)
        return
    }
    if(password!==confirmpassword)
    {
        alert('Password and Confirm Password dont match')
        setloading(false)
        return
    }
    console.log(email,password)
    const res=await fetch(`${API}/changepassword`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        }
    )
    console.log("GOT API")
    if (!res.ok) {
      const data = await res.json();
      setloading(false);
      alert(data.msg);
      return;
    }

    setloading(false);
    alert("Password has been changed");
    navigate("/login");
    
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center px-4">

      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-black/60 text-white text-center py-2 text-sm sm:text-base">
            Changing Password
          </div>
        </div>
      )}
      <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg flex flex-col gap-5">

        <div className="flex justify-center">
          <Store className="text-white w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        {/* Title */}
        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Change Password
        </h1>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border border-white/30 p-2 pl-10 bg-transparent rounded text-white placeholder-gray-200 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            className="w-full border border-white/30 p-2 pl-10 bg-transparent rounded text-white placeholder-gray-200 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handlesubmit}
          className="bg-blue-600 hover:bg-blue-700 transition rounded w-full p-2 text-white font-medium"
        >
          SUBMIT
        </button>

        {/* Links */}
        <div className="flex flex-col gap-2 text-center text-sm">

          <Link to="/forget" className="text-blue-200 underline">
            Forgot Password?
          </Link>

          <Link to="/login" className="text-blue-200 underline">
            Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
}