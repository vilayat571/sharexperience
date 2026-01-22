import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Allposts from "./pages/Posts/Allposts";
import SinglePost from "./pages/Posts/SinglePost";
import Createpost from "./pages/Createpost";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("googleToken");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLoginSuccess = (jwtToken: string) => {
    setToken(jwtToken);
    localStorage.setItem("googleToken", jwtToken);
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
