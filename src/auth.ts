import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                },

            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password");
                }

                const user = await User.findOne({ email }).select("+password");

                if (!user) {
                    throw new CredentialsSignin("Invaild email or password");
                };
                if (!user.password) {
                    throw new CredentialsSignin("Invaild email or password");
                };

                const isMatch = await compare(password, user.password);

                if (!isMatch) {
                    throw new CredentialsSignin("Invaild email or password");
                };

                return {name:user.name, email:user.email, id:user._id};
            }
        })
    ],
});