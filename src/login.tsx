import { Store, User, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const server=process.env.REACT_APP_SERVER;
  const API = `${server}/api/auth`;
  const navigate = useNavigate();

  const GoogleIcon = FcGoogle as unknown as React.FC<any>;

  const handlesubmit = async () => {
    if (!email || !password) {
      alert("Email and Password required");
      return;
    }

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Wrong Email or Password");
    } else {
      alert("Successful login");
      navigate("/user");
    }
  };

  const signwithgoogle = () => {
    const redirect_uri = " https://e-commerce-sepia-three-70.vercel.app/auth/google/callback";
    const scope = ["openid", "email", "profile"].join(" ");
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!client_id) throw new Error("Missing GOOGLE_CLIENT_ID in env");

    url.searchParams.set("client_id", client_id);
    url.searchParams.set("redirect_uri", redirect_uri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", scope);
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("prompt", "consent");

    window.location.href = url.toString();
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      axios
        .post(`${API}/google`, { code })
        .then((res) => {
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    }
  }, [API]);

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col gap-6 sm:gap-7 w-full sm:max-w-sm md:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">

        <div className="flex justify-center">
          <Store className="text-white w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        <div className="text-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-medium">
            Login
          </p>
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full border border-white/30 p-2 pl-10 bg-transparent rounded text-white placeholder-gray-200 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border border-white/30 p-2 pl-10 bg-transparent rounded text-white placeholder-gray-200 focus:outline-none"
          />
        </div>

        <div className="flex justify-end text-sm">
          <Link to="/forget" className="text-blue-200 hover:underline">
            Forget Password?
          </Link>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 transition rounded shadow-md w-full p-2 text-white font-medium"
          onClick={handlesubmit}
        >
          SUBMIT
        </button>

        <button
          className="flex items-center justify-center gap-2 bg-white text-black rounded p-2 hover:bg-gray-100 transition"
          onClick={signwithgoogle}
        >
          Sign in with
          <GoogleIcon size={22} />
        </button>

        <p className="text-white text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-200 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}