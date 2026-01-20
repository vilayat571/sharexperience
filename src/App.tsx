import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";

function App() {
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const googleIdToken = credentialResponse.credential;

      if (!googleIdToken) {
        throw new Error("No Google ID token received");
      }

      const res = await axios.post("http://localhost:5000/auth/google", {
        token: googleIdToken
      });

      console.log("Authenticated user:", res.data);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sign in with Google</h2>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Google Login Error")}
      />
    </div>
  );
}

export default App;
