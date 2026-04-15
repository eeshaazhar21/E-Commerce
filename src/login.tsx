import { Store, User, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
export default function Login(){
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const API="http://localhost:8000/api/auth"
    const navigate = useNavigate();
    const GoogleIcon = FcGoogle as unknown as React.FC<any>;
    const handlesubmit=async()=>{
        if(!email || !password){
            alert('Email and Password required')
        }
        const res=await fetch(`${API}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({email,password})
                
            }
        )

        if(!res.ok){
          alert("Wrong Email or Password")  
        }
        else{
            alert("Successful login")
            navigate('/user')
        }
        


    }
    const signwithgoogle=()=>{
        const redirect_uri="http://localhost:3000/auth/google/callback"
        const scope=["openid","email","profile"].join(" ")
        const url=new URL("https://accounts.google.com/o/oauth2/v2/auth")
        const client_id=process.env.REACT_APP_GOOGLE_CLIENT_ID
        if(!client_id)
            throw new Error("Missing GOOGLE_CLIENT_ID in env");
        url.searchParams.set("client_id",client_id)
        url.searchParams.set("redirect_uri",redirect_uri)
        url.searchParams.set("response_type","code")
        url.searchParams.set("scope",scope)
        url.searchParams.set("access_type", "offline");
        url.searchParams.set("prompt", "consent");

        window.location.href=url.toString()
        
    }

    useEffect(()=>{
        const query=new URLSearchParams(window.location.search)
        const code=query.get('code')
        if(code){
            axios.post("http://localhost:8000/api/auth/google",{code})
            .then((res)=>{console.log(res.data.user)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            })
            .catch((err)=>{console.log("ERROR",err)})
        }
        
    },[])
    return(
        <div className="bg-blue-500 h-screen flex justify-center items-center">
                
                <div className="flex flex-col gap-8 justify-center items-stretch w-[20%]">
                    <div className="flex justify-center items-center">
                        <Store color="white" className="w-[30%] h-[30%]"/>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-white font-sans text-4xl font-normal">Login</p>
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
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            className="w-full border p-2 pl-10 bg-transparent rounded text-white font-normal"
                        />
                    </div>
                    <div className="flex justify-end items-end">
                            <Link to="/forget"className="text-blue-900 cursor-pointer hover:underline">Forget Password?</Link>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 rounded shadow-md w-full p-2" onClick={handlesubmit}>SUBMIT</button>
                        <button style={{ display: "flex", alignItems: "center", gap: 10, color: 'white' }} onClick={signwithgoogle}>
                            Sign in with: 
                            <GoogleIcon size={22} />
                        </button>
                    <p className="text-white text-center text-sm ">Don't have an account?{" "}
                        <Link to="/signup"className="text-blue-900 cursor-pointer hover:underline">Register</Link>
                    </p>
                    
                </div>
                
        </div>
    )
}