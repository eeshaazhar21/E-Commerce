import { Store } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {signupSchema} from './userschema'

type FormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [loading,setloading]=useState(false)
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
    setloading(true)
    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setloading(false)
      alert(data.msg);
      return;
    }
    setloading(false)
    alert("Successful Signup");
    navigate("/verify", {
    state: { email: form.email,
        changepassword: false
     }
    });
  };

  return (
    
    <div className="bg-blue-500 h-screen flex justify-center items-center">
        {loading && (
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="bg-black/50 text-white text-center py-2">
                Loading...
                </div>
            </div>
            )}
      <div className="flex flex-col gap-4 w-[20%]">

        {/* Logo */}
        <div className="flex justify-center">
          <Store color="white" />
        </div>

        <h1 className="text-white text-3xl text-center">Sign Up</h1>

        {/* First Name */}
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="p-2 border rounded text-gray-500"
        />
        {errors.first_name && (
          <p className="text-red-300 text-sm">{errors.first_name[0]}</p>
        )}

        {/* Last Name */}
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="p-2 border rounded text-gray-500"
        />
        {errors.last_name && (
          <p className="text-red-300 text-sm">{errors.last_name[0]}</p>
        )}

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border rounded text-gray-500"
        />
        {errors.email && (
          <p className="text-red-300 text-sm">{errors.email[0]}</p>
        )}

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded text-gray-500"
        />
        {errors.password && (
          <p className="text-red-300 text-sm">{errors.password[0]}</p>
        )}

        {/* Confirm Password */}
        <input
          name="confirmpassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmpassword}
          onChange={handleChange}
          className="p-2 border rounded text-gray-500"
        />
        {errors.confirmpassword && (
          <p className="text-red-300 text-sm">
            {errors.confirmpassword[0]}
          </p>
        )}

        {/* Gender */}
        <div className="text-white">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label className="ml-4">
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

        {errors.gender && (
          <p className="text-red-300 text-sm">{errors.gender[0]}</p>
        )}

        {/* Role */}
        <div className="text-white">
          <label>
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={form.role === "Admin"}
              onChange={handleChange}
            />
            Admin
          </label>

          <label className="ml-4">
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

        {errors.role && (
          <p className="text-red-300 text-sm">{errors.role[0]}</p>
        )}

        {/* Submit */}
        <button
          onClick={handlesubmit}
          className="bg-blue-700 p-2 text-white rounded"
        >
          Submit
        </button>

        <p className="text-white text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}