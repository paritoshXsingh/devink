import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Register = () => {
  const { axios, setToken, fetchProfile, navigate } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common["Authorization"] = data.token;

        setToken(data.token);

        await fetchProfile();

        toast.success("Account created successfully");

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
      <div className="w-full max-w-md bg-white border border-primary/20 rounded-xl shadow-xl shadow-primary/10 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Join <span className="text-primary">DevInk</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account and start publishing articles.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 text-primary cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
