import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Userinfo() {
    const navigate = useNavigate();
    const API = "http://localhost:8000/api/users";

    const [auth, setauth] = useState<boolean | null>(null);
    const [user, setUser] = useState<any>(null);

    const handlelogout = async () => {
        const res = await fetch(`http://localhost:8000/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            navigate("/login");
        }
    };

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await fetch(`${API}/user`, {
                    credentials: "include",
                });

                if (!res.ok) {
                    const data = await res.json();
                    alert(data.msg);
                    setauth(false);
                    return;
                }

                const data = await res.json();
                setUser(data);
                setauth(true);
            } catch (err) {
                setauth(false);
            }
        };

        fetchuser();
    }, []);

    if (auth === null) return <div>Loading...</div>;

    if (!auth) return <Navigate to="/login" />;

    return (
        <div className="bg-orange-400 h-screen "> 
            <button className="bg-red-500 rounded hover:bg-red-600 shadow text-white p-2 m-2 " onClick={handlelogout}>Logout</button> 
            <div className="flex justify-center items-center h-full"> 
                <div className="flex flex-col justify-center items-stretch gap-4 p-6 w-[40%] h-[80%] bg-orange-500"> 
                    <div className="flex gap-6"> 
                        <div className="flex items-center gap-2 w-1/2"> 
                            <p className="w-52">First Name:</p> 
                            <p className="bg-orange-600 rounded px-3 py-1 w-full">{user.first_name}</p> 
                        </div> 
                        <div className="flex items-center gap-2 w-1/2"> 
                            <p className="w-32">Last Name:</p> 
                            <p className="bg-orange-600 rounded px-3 py-1 w-full">{user.last_name}</p> 
                        </div> 
                    </div> 
                    <div className="flex items-center gap-4"> 
                        <p className="w-32">Email: </p> 
                        <p className="bg-orange-600 rounded px-3 py-1 w-full">{user.email}</p> 
                    </div> 
                    <div className="flex items-center gap-4"> 
                        <p className="w-32">Gender: </p> 
                        <p className="bg-orange-600 rounded px-3 py-1 w-full">{user.gender}</p> 
                    </div> 
                </div> 
            </div> 
        </div>)
}