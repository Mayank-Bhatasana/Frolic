import frolicLogo from "../../assets/frolic-logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="w-full bg-white/30 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-white/20 transition-all duration-500">


      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
      <div className="text-3xl font-extrabold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          FROLIC EVENT
      </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleProfile}
          className="px-4 py-2 bg-teal-300/50 backdrop-blur-sm rounded-xl shadow hover:scale-105 hover:bg-teal-400/50 transition-all duration-300"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/50 backdrop-blur-sm rounded-xl shadow hover:scale-105 hover:bg-red-600/50 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}