import Header from "../components/Home/Header";
import Tabs from "../components/Home/Tabs";
import Layout from "../layout/Layout";
import { jwtDecode } from "jwt-decode"; // Changed: named import

const Home = () => {
  const token = localStorage.getItem("googleToken");

  let userInfo;

  if (token) {
    userInfo = jwtDecode(token) as { // Changed: use jwtDecode instead of jwt_decode
      name: string;
      email: string;
      picture: string;
    };
  }

  return (
    <Layout>
      <div>
        {userInfo ? (
          <div>
            <h2>Welcome, {userInfo.name}</h2>
            <img src={userInfo.picture} alt="profile" />
            <p>Email: {userInfo.email}</p>
          </div>
        ) : (
          <p>Please login</p>
        )}
      </div>
        <div className="min-h-screen bg-gray-50">
        <Header />
        <Tabs />
      </div> 
    </Layout>
  );
};

export default Home;