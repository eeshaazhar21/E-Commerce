import { User, Lock} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Forget(){
    const navigate=useNavigate()
    const [email,setemail]=useState("")
    const [loading,setloading]=useState(false)
    const API="http://localhost:8000/api/auth"
    const handlesubmit=async()=>{
        const res = await fetch(`${API}/forget`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email}),
        });

        if (!res.ok) {
        const data = await res.json();
        setloading(false)
        alert(data.msg);
        return;
        }
        setloading(false)
        alert("OTP has been sent to your email");
        navigate("/verify", {
        state: { email: email,
            changepassword: true
        }
    })
    }
    return(
            <div className="bg-blue-500 h-screen flex justify-center items-center">
                {loading && (
                <div className="fixed top-0 left-0 w-full z-50">
                    <div className="bg-black/50 text-white text-center py-2">
                    Loading...
                    </div>
                </div>
                )} 
                    <div className="flex flex-col gap-8 justify-center items-stretch w-[20%]">
                        <div className="flex justify-center items-center">
                            <Lock color="white" className="w-[30%] h-[30%]"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-white font-sans text-4xl font-normal">Forget Password</p>
                        </div>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e)=>setemail(e.target.value)}
                                className="w-full border p-2 pl-10 bg-transparent rounded text-white font-normal"
                            />
                            </div>
                    
                        <button className="bg-blue-600 hover:bg-blue-700 rounded shadow-md w-full p-2" onClick={handlesubmit}>Send OTP</button>
                        <p className="text-white text-center text-sm mt-4">Back to login?{" "}
                            <Link to="/login"className="text-blue-900 cursor-pointer hover:underline">Login</Link>
                        </p>
                        
                    </div>
                    
            </div>
        )
}