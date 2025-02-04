import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navigation;
