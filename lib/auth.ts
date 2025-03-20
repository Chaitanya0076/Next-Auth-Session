import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import db from '@/db';
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const secret = process.env.NEXT_SECRET || "secret";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                }

                try {
                    // Check if user exists in the database
                    const user = await db.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user) {
                        // Create a new user with hashed password
                        const hashedPassword = await bcrypt.hash(credentials.password, 10);
                        const newUser = await db.user.create({
                            data: {
                                email: credentials.email,
                                password: hashedPassword
                            }
                        });

                        return { id: newUser.id, email: newUser.email };
                    }

                    // Validate password using bcrypt
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid credentials.");
                    }

                    return { id: user.id, email: user.email };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
    ],
    secret: secret,
    callbacks: {
        session: ({ session, token }: any) => {
            if (session.user) {
                session.user.id  = token.sub;
            }
            return session
        }
    },
} as NextAuthOptions;