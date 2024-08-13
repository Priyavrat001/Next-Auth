"use client"

import { loginHandler } from "@/action/login";
import { toast } from "sonner";
import { Button } from "../button";
import { Input } from "../input";

const LoginForm = ()=>{
    return(
        <form action={async (formData) => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            if (!email || !password) return toast.error("Please provide all fields");
    
            const toastId = toast.loading("Logging in");
            const error = await loginHandler(email, password);

            if(!error){
                toast.success("Login successfully",{
                    id:toastId
                })
            }else{
                toast.error(String(error),{
                    id:toastId
                })
            }
        }}>
            <Input type='email' placeholder='Email' name="email" />
            <Input type='password' placeholder='Password' name="password" />
            <Button className='bg-black text-white w-full hover:text-black' type='submit'>Login</Button>
        </form>
    )
};

export {
    LoginForm
};
