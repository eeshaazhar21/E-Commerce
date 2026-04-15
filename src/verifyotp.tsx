import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const changepassword = location.state?.changepassword;

  const [otp, setotp] = useState("");
  const [loading, setloading] = useState(false);

  const handlesubmit = async () => {
    setloading(true)
    let vari;

    if (changepassword === false) {
      vari = "verify";
    } else {
      vari = "forget";
    }

    const server=process.env.REACT_APP_SERVER;
    const API = `${server}/api/auth`;

    const res = await fetch(`${API}/${vari}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      const data = await res.json();
      setloading(false)
      alert(data.msg);
      return;
    }
    setloading(false)
    alert("Successful Verification");

    if (!changepassword) {
      navigate("/login");
    }
    else{
        navigate("/changepassword", {
      state: {
        email: email,
        changepassword: false,
      },
    });
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center px-4">

      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-black/60 text-white text-center py-2 text-sm sm:text-base">
            Loading...
          </div>
        </div>
      )}
      <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-md p-5 sm:p-8 rounded-xl shadow-lg flex flex-col gap-5">

        {/* Title */}
        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Verify Email
        </h1>

        {/* Email info */}
        <p className="text-white text-sm sm:text-base text-center leading-relaxed">
          OTP has been sent to:
          <br />
          <span className="font-semibold break-words">
            {email || "No email found"}
          </span>
        </p>

        {/* OTP input */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="w-full p-2 sm:p-3 rounded border text-center tracking-widest text-gray-700 focus:outline-none"
          />
        </div>

        {/* Verify button */}
        <button
          onClick={handlesubmit}
          className="bg-blue-600 hover:bg-blue-700 transition rounded w-full p-2 sm:p-3 text-white font-medium"
        >
          Verify
        </button>

        {/* Links */}
        <div className="flex flex-col gap-2 text-center text-sm">

          <p className="text-white">
            Back to signup?{" "}
            <Link to="/signup" className="text-blue-200 underline">
              Register
            </Link>
          </p>

          

        </div>

      </div>
    </div>
  );
}