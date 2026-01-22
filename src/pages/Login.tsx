import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = (response: CredentialResponse) => {
    if (response.credential) {
      onLoginSuccess(response.credential);
      // Navigate to create post page after successful login
      navigate("/createpost");
    } else {
      console.log("Login failed or no credential returned");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login with Google</h2>
        <GoogleLogin 
          onSuccess={handleLogin} 
          onError={() => console.log("Login Failed")} 
        />
      </div>
    </div>
  );
};

export default Login;