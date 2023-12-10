import React from "react";
import { Link, Redirect } from "react-router-dom";

const Login = ({ setAuth }) => {
  return (
    <>
      <h1 className="flex justify-center font-bold "> Login</h1>
      <div class="grid justify-center">
        <div className="flex justify-center ">
          <form class="w-full max-w-lg">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                id="grid-password"
                type="password"
                placeholder="******************"
                required
              />
              <p class="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </form>
        </div>

        <button
          type="submit"
          onClick={() => setAuth(true)}
          class=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Sign in
        </button>
        <Link to="/register"> I don't have a account. Goto Register Page</Link>
      </div>
    </>
  );
};

export default Login;
