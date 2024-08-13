import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { LoginForm } from "@/components/ui/client/form"
import Link from 'next/link'


const Page = () => {

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                <LoginForm/>
                </CardContent>
                <CardFooter className='flex flex-col gap-4'>
                    <span>Or</span>

                    <form>
                        <Button type="submit" variant={"outline"}>Login With Google</Button>
                    </form>
                    <Link href={"/signup"}>
                        Don't have an account? signup
                    </Link>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Page