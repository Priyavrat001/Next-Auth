import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const Page = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="">
                    <Input type='email' placeholder='Email'/>
                    <Input type='password' placeholder='Password'/>
                    <Button className='bg-black text-white w-full hover:text-black' type='submit'>Login</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Page