import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Allposts from "./pages/Posts/Allposts";
import SinglePost from "./pages/Posts/SinglePost";
import Createpost from "./pages/Createpost";
import Login from "./pages/Login";

import { jwtDecode } from "jwt-decode"; // Changed: named import

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  // add other fields if needed
}

function App() {
  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("googleToken");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLoginSuccess = (jwtToken: string) => {
    localStorage.setItem("googleToken", jwtToken);
    setToken(jwtToken); // Added: update state when login succeeds
    const user: GoogleUser = jwtDecode(jwtToken); // Changed: use jwtDecode
    console.log("User info:", user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/posts" element={token ? <Allposts /> : <Navigate to="/login" />} />
        <Route path="/posts/:id" element={token ? <SinglePost /> : <Navigate to="/login" />} />
        <Route path="/createPost" element={token ? <Createpost /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;