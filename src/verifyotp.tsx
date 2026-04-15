import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
export default function VerifyOtp(){
    const location=useLocation()
    const navigate=useNavigate()
    const email=location.state?.email
    const changepassword=location.state?.changepassword
    const [otp,setotp]=useState("")
    const handlesubmit=async()=>{
        let vari
        if(changepassword===false){
            vari='verify'
        }
        else{
            vari='forget'
        }
        const API = "http://localhost:8000/api/auth";
        const res = await fetch(`${API}/${vari}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email,otp}),
        });

        if (!res.ok) {
        const data = await res.json();

        alert(data.msg);
        return;
        }

        alert("Successful Verification");
        if(changepassword){
            
        }
        else{
            navigate("/login");
        }
        

    }
    return(
       <div className="bg-blue-500 h-screen flex justify-center items-center">
                
                <div className="flex flex-col gap-8 justify-center items-stretch w-[20%]">
                    <div className="flex justify-center items-center">
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-white font-sans text-4xl font-normal">Verify Email</p>
                    </div>
                    <div >
                        <p className="text-white font-sans text-xl font-normal ">OTP has been sent to email {email}</p>
                        <div className="flex justify-center items-center">
                            <input type="text" 
                            placeholder="OTP"
                            value={otp}
                            onChange={(e)=>setotp(e.target.value)}
                            className="m-2"/>
                        </div>
                        <p className="text-white text-center text-sm mt-4">Back to Sign Up page?{" "}
                            <Link to="/forget"className="text-blue-900 cursor-pointer hover:underline">Forget Password?</Link>
                        </p>
                        
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 rounded shadow-md w-full p-2" onClick={handlesubmit}>Verify</button>
                    <p className="text-white text-center text-sm mt-4">Back to Sign Up page?{" "}
                        <Link to="/signup"className="text-blue-900 cursor-pointer hover:underline">Register</Link>
                    </p>
                    
                </div>
                
        </div>
    )
}