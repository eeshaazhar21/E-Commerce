import { useAuth0 } from "@auth0/auth0-react";

function Auth() {
  const {
    isLoading, 
    isAuthenticated,
    error,
    loginWithRedirect: login, 
    logout: auth0Logout, 
    user, 
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <>
      <p>Logged in as {user?.email}</p>

      <h1>User Profile</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      <button className="bg-blue-500 rounded hover:bg-blue-600 shadow text-white p-2 m-2 " onClick={signup}>Signup</button> 

      <button className="bg-green-500 rounded hover:bg-green-600 shadow text-white p-2 m-2 " onClick={()=>login()}>Login</button> 
    </>
  );
}

export default Auth;
