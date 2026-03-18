// src/components/layout/Sidebar.jsx
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaUniversity, FaBuilding, FaCalendar} from "react-icons/fa";
import { FaPeopleArrows, FaPeopleGroup, FaTrophy } from "react-icons/fa6";
import frolicLogo from "../../assets/frolic-logo.png"; // add logo

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Institutes", path: "/institutes", icon: <FaUniversity /> },
    { name: "Departments", path: "/departments", icon: <FaBuilding /> },
    { name: "Events", path: "/events", icon: <FaCalendar /> },
    { name: "Groups", path: "/groups", icon: <FaPeopleGroup /> },
    { name: "Participants", path: "/participants", icon: <FaPeopleArrows /> },
    { name: "Winners", path: "/winners", icon: <FaTrophy /> },
  ];

  return (
    <aside
      className={`bg-white/30 backdrop-blur-md border-r border-white/20 p-4 flex flex-col
      rounded-2xl shadow-xl transition-all duration-500 ease-in-out overflow-hidden
      hover:w-64`}
      style={{ width: expanded ? "16rem" : "4.5rem" }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >

      <div className="flex flex-col items-center mb-8">

      {expanded ? (
        <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img
            src={frolicLogo}
            alt="Frolic Logo"
            className="h-30 w-auto object-contain mb-2 transition-all duration-500"
          />

          <div className="text-3xl font-extrabold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            FROLIC
          </div>
        </div>
      ) : (
        <div className="font-extrabold text-purple-700">
          Frolic
        </div>
      )}

    </div>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300
              ${
                isActive
                  ? "bg-linear-to-r from-purple-400 to-pink-500 text-white shadow-lg"
                  : "text-purple-800 hover:bg-purple-300/40 hover:shadow-md"
              }`
            }
            onClick={() => setExpanded(true)}
          >
            <span className="text-lg shrink-0">{link.icon}</span>

            <span
              className={`${
                expanded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              {link.name}
            </span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
}