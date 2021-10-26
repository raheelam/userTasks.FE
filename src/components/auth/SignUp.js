import React, { useState } from "react";

import { Link } from "react-router-dom";
import { signUp } from "../../api/authCrud";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="p-10 w-1/2 md:w-1/3 bg-gray-100 text-center"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          await signUp(name, email, password);
          window.location.reload();
        }}
      >
        <h2>Sign Up</h2>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
          placeholder={`Name`}
          className="m-3 bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
        />
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
          className={`m-3 bg-yellow-500 mb-10 w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600`}
        >
          Sign up
        </button>
        <div>
          Already have an account? <Link to="/auth/login">sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
