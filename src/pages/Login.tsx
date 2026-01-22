import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const handleLogin = (response: CredentialResponse) => {
    if (response.credential) {
      onLoginSuccess(response.credential);
    } else {
      console.log("Login failed or no credential returned");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Login Failed")} />
    </div>
  );
};

export default Login;
