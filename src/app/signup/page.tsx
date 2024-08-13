import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {User} from "../../models/userModel"
import Link from 'next/link'
import React from 'react'
import { hash } from "bcryptjs";
import { redirect } from "next/navigation"
import {connectToDatabase} from "../../lib/utils"

const Page = ()=>{

    const signUp = async(formData:FormData)=>{
        "use server"

        await connectToDatabase();

        const name = formData.get("name") as string | undefined;

        const email = formData.get("email") as string |undefined;

        const password = formData.get("password") as string | undefined;

        if(!name || !email || !password){
            throw new Error("Please provide all fields");
        }

        const user = await User.findOne({email});

        if(user) throw new Error("User already exist");

        const hashPassword = await hash(password, 10);

        await User.create({
            name,
            email,
            password: hashPassword
        });

        redirect("/login");
    }

    return(
        <div className="flex justify-center items-center h-dvh">
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={signUp}>
                <Input type='Name' placeholder='Name' name="name"/>
                <Input type='email' placeholder='Email' name="email"/>
                <Input type='password' placeholder='Password' name="password"/>
                <Button className='bg-black text-white w-full hover:text-black' type='submit'>Signup</Button>
                </form>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
                <span>Or</span>

                <form>
                    <Button type="submit" variant={"outline"}>Login With Google</Button>
                </form>
                <Link href={"/signup"}>
                Already have an account? login
                </Link>
            </CardFooter>
        </Card>

    </div>
    )
}

export default Page;