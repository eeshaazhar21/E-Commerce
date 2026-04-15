import { Store } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { signupSchema } from "./userschema";

type FormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const API = "http://localhost:8000/api/auth";

  const [form, setForm] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmpassword: "",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async () => {
    setloading(true);

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      setloading(false);
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setloading(false);
      alert(data.msg);
      return;
    }

    setloading(false);
    alert("Successful Signup");

    navigate("/verify", {
      state: {
        email: form.email,
        changepassword: false,
      },
    });
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center px-4 py-6">

      {/* Loading bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-black/60 text-white text-center py-2 text-sm sm:text-base">
            Loading...
          </div>
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-md p-5 sm:p-8 rounded-xl shadow-lg flex flex-col gap-4 sm:gap-5">

        {/* Logo */}
        <div className="flex justify-center">
          <Store className="text-white w-10 h-10 sm:w-14 sm:h-14" />
        </div>

        {/* Title */}
        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Sign Up
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-2">
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full p-2 rounded border text-gray-700"
          />
          {errors.first_name && (
            <p className="text-red-300 text-sm">{errors.first_name[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full p-2 rounded border text-gray-700"
          />
          {errors.last_name && (
            <p className="text-red-300 text-sm">{errors.last_name[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded border text-gray-700"
          />
          {errors.email && (
            <p className="text-red-300 text-sm">{errors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded border text-gray-700"
          />
          {errors.password && (
            <p className="text-red-300 text-sm">{errors.password[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmpassword}
            onChange={handleChange}
            className="w-full p-2 rounded border text-gray-700"
          />
          {errors.confirmpassword && (
            <p className="text-red-300 text-sm">
              {errors.confirmpassword[0]}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white text-sm sm:text-base">
          <span className="font-medium">Gender:</span>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        {errors.gender && (
          <p className="text-red-300 text-sm">{errors.gender[0]}</p>
        )}

        {/* Role */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white text-sm sm:text-base">
          <span className="font-medium">Role:</span>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={form.role === "Admin"}
                onChange={handleChange}
              />
              Admin
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="User"
                checked={form.role === "User"}
                onChange={handleChange}
              />
              User
            </label>
          </div>
        </div>

        {errors.role && (
          <p className="text-red-300 text-sm">{errors.role[0]}</p>
        )}

        {/* Button */}
        <button
          onClick={handlesubmit}
          className="bg-blue-600 hover:bg-blue-700 transition rounded w-full p-2 text-white font-medium"
        >
          SUBMIT
        </button>

        {/* Login link */}
        <p className="text-white text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-200 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}