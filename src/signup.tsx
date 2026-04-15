import { Store } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { signupSchema } from "./userschema"
import { useMutation } from "@tanstack/react-query"

type FormData = z.infer<typeof signupSchema>

export default function Signup() {
  const navigate = useNavigate()
  const server = process.env.REACT_APP_SERVER
  const API = `${server}/api/auth`

  const [form, setForm] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmpassword: "",
    gender: "",
    role: "",
  })

  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ✅ API FUNCTION
  const signupUser = async (data: FormData) => {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.msg || "Signup failed")
    }

    return res.json()
  }

  // ✅ REACT QUERY MUTATION
  const {
    mutate: signup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: signupUser,

    onSuccess: () => {
      alert("Successful Signup")

      navigate("/verify", {
        state: {
          email: form.email,
          changepassword: false,
        },
      })
    },
  })

  const handlesubmit = () => {
    const result = signupSchema.safeParse(form)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }

    setErrors({})
    signup(form) // ✅ React Query handles API call
  }

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center px-4 py-6">

      {isPending && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-black/60 text-white text-center py-2 text-sm sm:text-base">
            Loading...
          </div>
        </div>
      )}

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-md p-5 sm:p-8 rounded-xl shadow-lg flex flex-col gap-4 sm:gap-5">

        <div className="flex justify-center">
          <Store className="text-white w-10 h-10 sm:w-14 sm:h-14" />
        </div>

        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Sign Up
        </h1>

        {isError && (
          <p className="text-red-300 text-center text-sm">
            {error.message}
          </p>
        )}

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

        <div className="text-white">
          <p>Gender:</p>

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

        <div className="text-white">
          <p>Role:</p>

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

        <button
          onClick={handlesubmit}
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 transition rounded w-full p-2 text-white font-medium disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "SUBMIT"}
        </button>

        <p className="text-white text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-200 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}