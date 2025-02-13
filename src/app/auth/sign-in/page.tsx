import { getCurrentSession, loginUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import SignIn from '@/components/auth/SignIn';
import zod from 'zod'
import React from 'react'


const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    });

const SignInPage = async() => {
      //Check for current user
        const {user} = await getCurrentSession();
        //Redirect to home if user is already logged in
        if(user){
            return redirect("/");
        }
        //Action for registering user
        const action = async (prevState: any, formData:FormData) => {
            "use server"
            //Check Form Data
            const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
            //Form Data is invalid
            if(!parsed.success){
                return{
                    message:"Invalid form data",
                }
            }
            //Extract form data
            const {email, password} = parsed.data;
            //Login user
            const {user, error} = await loginUser(email, password);
           
            if(error){
                return{
                    message:error,
                }
            }else if(user){
                //Redirect to home
                return redirect("/");
            }

        }

  return <SignIn action={action}/>
}

export default SignInPage
