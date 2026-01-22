import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Createpost = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>

    Create a post
  </div>;
};

export default Createpost;
