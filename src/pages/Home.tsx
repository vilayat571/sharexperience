import Header from "../components/Home/Header";
import Tabs from "../components/Home/Tabs";
import Layout from "../layout/Layout";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

interface HomeProps {
  user: GoogleUser | null;
}

const Home = ({ user }: HomeProps) => {
  return (
    <Layout user={user}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Tabs />
      </div>
    </Layout>
  );
};

export default Home;
