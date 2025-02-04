import { useNavigate } from "react-router-dom";
import { login } from "../auth";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/profile");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Home;
