import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Userinfo() {
  const navigate = useNavigate();
  const server=process.env.REACT_APP_SERVER;
  const API = `${server}/api/users`;

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
      } catch {
        setauth(false);
      }
    };

    fetchuser();
  }, []);

  if (auth === null) return <div className="text-center mt-10">Loading...</div>;
  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="bg-orange-400 min-h-screen p-4 sm:p-6">
      <button
        className="bg-red-500 rounded hover:bg-red-600 text-white px-4 py-2 mb-4"
        onClick={handlelogout}
      >
        Logout
      </button>

      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4 p-4 sm:p-6 w-full sm:w-[50%] md:w-[70%] lg:w-[50%] bg-orange-500 rounded-lg shadow-lg">
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 w-full">
              <p className="w-28 sm:w-40">First Name:</p>
              <p className="bg-orange-600 rounded px-3 py-1 w-full break-words">
                {user?.first_name}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full">
              <p className="w-28 sm:w-40">Last Name:</p>
              <p className="bg-orange-600 rounded px-3 py-1 w-full break-words">
                {user?.last_name}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="w-28 sm:w-40">Email:</p>
            <p className="bg-orange-600 rounded px-3 py-1 w-full break-words">
              {user?.email}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="w-28 sm:w-40">Gender:</p>
            <p className="bg-orange-600 rounded px-3 py-1 w-full break-words">
              {user?.gender}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="w-28 sm:w-40">Role:</p>
            <p className="bg-orange-600 rounded px-3 py-1 w-full break-words">{user?.role}</p>
          </div>

        </div>
      </div>
    </div>
  );
}