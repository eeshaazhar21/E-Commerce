import { Store, User, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function ChangePassword(){
    const [password,setpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const handlesubmit=()=>{

    }
    return(
        <div className="bg-blue-500 h-screen flex justify-center items-center">
                        
                        <div className="flex flex-col gap-8 justify-center items-stretch w-[20%]">
                            <div className="flex justify-center items-center">
                                <Store color="white" className="w-[30%] h-[30%]"/>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="text-white font-sans text-4xl font-normal">Change Password</p>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e)=>setpassword(e.target.value)}
                                    className="w-full border p-2 pl-10 bg-transparent rounded text-white font-normal"
                                />
                                </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={(e)=>setconfirmpassword(e.target.value)}
                                    className="w-full border p-2 pl-10 bg-transparent rounded text-white font-normal"
                                />
                            </div>
                            <div className="flex justify-end items-end">
                                    <Link to="/forget"className="text-blue-900 cursor-pointer hover:underline">Forget Password?</Link>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 rounded shadow-md w-full p-2" onClick={handlesubmit}>SUBMIT</button>
                                
                            <p className="text-white text-center text-sm ">Go back to Login?{" "}
                                <Link to="/login"className="text-blue-900 cursor-pointer hover:underline">Login</Link>
                            </p>
                            
                        </div>
                        
                </div>
    )
}