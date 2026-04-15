import { User, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Forget() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const API = "http://localhost:8000/api/auth";

  const handlesubmit = async () => {
    setloading(true);

    const res = await fetch(`${API}/forget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      setloading(false);
      alert(data.msg);
      return;
    }

    setloading(false);
    alert("OTP has been sent to your email");

    navigate("/verify", {
      state: {
        email: email,
        changepassword: true,
      },
    });
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center px-4">

      {/* Loading */}
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-black/60 text-white text-center py-2 text-sm sm:text-base">
            Sending OTP...
          </div>
        </div>
      )}

      <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg flex flex-col gap-6">

        <div className="flex justify-center">
          <Lock className="text-white w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Forgot Password
        </h1>

        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full border border-white/30 p-2 pl-10 bg-transparent rounded text-white placeholder-gray-200 focus:outline-none"
          />
        </div>

        <button
          onClick={handlesubmit}
          className="bg-blue-600 hover:bg-blue-700 transition rounded w-full p-2 text-white font-medium"
        >
          Send OTP
        </button>

        <p className="text-white text-center text-sm">
          Back to login?{" "}
          <Link to="/login" className="text-blue-200 underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}