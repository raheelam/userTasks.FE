import React, { useState } from "react";

import { Link } from "react-router-dom";
import { login } from "../../api/authCrud";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <form
          className="p-10 w-1/2 md:w-1/3 bg-gray-100 m-auto text-center"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            await login(email, password);
            window.location.reload();
          }}
        >
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            placeholder={`Email`}
            className="m-3 bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            placeholder={`Password`}
            className="m-3 bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`m-3 bg-yellow-500 w-full py-2 mb-10 text-center text-white mt-3 md:text-lg hover:bg-orange-600`}
          >
            Login
          </button>
          <div>
            dont have an account? <Link to="/auth/signup">sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
