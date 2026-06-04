import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken, fetchProfile, navigate, token } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common["Authorization"] = data.token;

        setToken(data.token);

        await fetchProfile();

        toast.success("Login successful");

        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/3 px-4">
      {" "}
      <div className="w-full max-w-md bg-white border border-primary/20 rounded-xl shadow-xl shadow-primary/10 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back to
            <span className="text-primary"> DevInk</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in and continue publishing your ideas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-1 text-primary cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
