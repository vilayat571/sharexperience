import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Allposts from "./pages/Posts/Allposts";
import SinglePost from "./pages/Posts/SinglePost";
import Createpost from "./pages/Createpost";
import Login from "./pages/Login";

import { jwtDecode } from "jwt-decode";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GoogleUser | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("googleToken");
    if (savedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(savedToken);
      try {
        const decoded: GoogleUser = jwtDecode(savedToken);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("googleToken");
      }
    }
  }, []);

  const handleLoginSuccess = (jwtToken: string) => {
    localStorage.setItem("googleToken", jwtToken);
    setToken(jwtToken);
    try {
      const decoded: GoogleUser = jwtDecode(jwtToken);
      setUser(decoded);
      console.log("User info:", decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route 
          path="/login" 
          element={
            token ? 
            <Navigate to="/createpost" /> : 
            <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />
        <Route path="/posts" element={token ? <Allposts /> : <Navigate to="/login" />} />
        <Route path="/posts/:id" element={token ? <SinglePost /> : <Navigate to="/login" />} />
        <Route path="/createpost" element={token ? <Createpost user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;