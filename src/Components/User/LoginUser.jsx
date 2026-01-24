import React, { useState } from "react";
import { BsEye, BsEyeSlash, BsEnvelope } from "react-icons/bs";
import { Link } from "react-router-dom";

const LoginUser = () => {
  const [isRegister, setIsRegister] = useState(false); // toggle login/register
  const [name, setName] = useState(""); // only for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isRegister
      ? "http://127.0.0.1:8000/api/register"
      : "http://127.0.0.1:8000/api/login";

    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Request failed");
        setLoading(false);
        return;
      }

      // store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect to homepage after login or registration
      window.location.href = "/";
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Register" : "User Login"}
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Name field for registration */}
        {isRegister && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
        )}

        {/* Email field */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded pr-10"
            required
          />
          <span className="absolute top-3 right-3 text-gray-600">
            <BsEnvelope size={20} />
          </span>
        </div>

        {/* Password field */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded pr-10"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-3 cursor-pointer text-gray-600"
          >
            {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded px-6 py-1 transition mb-4"
          disabled={loading}
        >
          {loading ? (isRegister ? "Registering..." : "Logging in...") : isRegister ? "Register" : "Login"}
        </button>

        <p className="text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
     <Link to='/user/register'>    <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-500 cursor-pointer font-medium"
          >
            {isRegister ? "Login" : "Register"}
          </span></Link> 
        </p>
      </form>
    </div>
  );
};

export default LoginUser;
