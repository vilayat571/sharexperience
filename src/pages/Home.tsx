import Header from "../components/Home/Header";
import Tabs from "../components/Home/Tabs";
import Layout from "../layout/Layout";
const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Tabs />
      </div>
    </Layout>
  );
};

export default Home;
