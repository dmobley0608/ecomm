"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
};

type SignInProps = {
  action: (prevState: any, formData: FormData) => Promise<{ message: string } | undefined>;
};

const SignIn = ({ action }: SignInProps) => {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Form action={formAction} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 my-16">
      <h1 className="text-2xl font-bold text-center mb-2">Welcome Back!</h1>
      <p className="text-center text-sm text-rose-600 font-semibold mb-2">🔥 Sign in to access exclusive member deals! 🔥</p>
      <div className="space-y-6">

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm" />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input type="password" name="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm" />
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center justify-center">
              <Loader2  className="h-4 w-4 animate-spin"/>
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
        {state?.message && state.message.length > 0 && (
            <div className="text-center text-sm text-red-600">{state.message}</div>
            )}
      </div>
    </Form>
  );
};

export default SignIn;
