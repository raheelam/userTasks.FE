import React, { useState } from "react";

import { Link } from "react-router-dom";
import { signUp } from "../../api/authCrud";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-gray-100 m-auto py-4 text-center">
        <img
          alt="bunny studio logo"
          className="w-1/2 py-3   pl-10"
          src="/images/bunny-studio.png"
        />
        <hr className="mt-2"></hr>
        <form
          className="p-10 pt-10"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            let res = await signUp(name, email, password);
            if (res.isAxiosError) {
              setIsSubmitting(false);
              setError(res.response.data.message);
              return;
            }
            window.location.reload();
          }}
        >
          {error !== null && (
            <div className="bg-red-300  text-center p-5 mb-5 rounded">
              {error}
            </div>
          )}
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
            placeholder={`Name`}
            className="mb-5 bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            placeholder={`Email`}
            className="mb-5 bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            placeholder={`Password`}
            className="mb-3 bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`my-3 bg-yellow-500 mb-10 w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600`}
          >
            Sign up
          </button>
          <div>
            Already have an account? <Link to="/auth/login">sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
