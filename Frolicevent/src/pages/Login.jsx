import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/services";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser({
        EmailAddress: email.trim(),
        UserPassword: password,
      });
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-purple-100 via-pink-100 to-teal-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-80 flex flex-col gap-4 transition-all duration-500 hover:shadow-3xl"
      >
        <h2 className="text-3xl font-extrabold text-purple-700 mb-4 text-center drop-shadow-md">
          Frolic Event
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 placeholder-purple-500"
        />

        <button
          disabled={loading}
          className="bg-linear-to-r from-purple-400 to-pink-500 text-white font-bold p-3 rounded-2xl hover:from-purple-500 hover:to-pink-600 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
