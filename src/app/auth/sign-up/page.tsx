import { getCurrentSession, loginUser, registerUser } from "@/actions/auth";
import SignUp from "@/components/auth/SignUp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import zod from "zod";


const SignUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  confirmPassword: zod.string().min(6),
  name: zod.string().min(2),
});

type SignUpFormData = {
  email: string;
  password: string;
  name?: string;
};

export default async function SignUpPage() {
  //Check for current user
  const { user } = await getCurrentSession();
  //Redirect to home if user is already logged in
  if (user) {
    return redirect("/");
  }
  //Action for registering user
  const action = async (prevState: any, formData: SignUpFormData) => {
    "use server";
    //Check Form Data
    const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
    //Form Data is invalid
    if (!parsed.success) {
      return {
        message: "Invalid form data",
      };
    }
    //Extract form data
    const { email, password, confirmPassword, name } = parsed.data;
    //Store form data in cookies

    //Check if passwords match
    if (password !== confirmPassword) {
      return {
        message: "Passwords do not match",
      };
    }
    //Register user
    const { user, error } = await registerUser(email, name, password);
    if (error) {
      return {
        message: error,
      };
    } else if (user) {
      //Login user
      await loginUser(email, password);
      //Redirect to home
      (await cookies()).delete("signUpFormData");
      return redirect("/");
    }
  };

  return <SignUp action={action} />;
}
