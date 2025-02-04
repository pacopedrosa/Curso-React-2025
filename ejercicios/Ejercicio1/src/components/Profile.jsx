import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
