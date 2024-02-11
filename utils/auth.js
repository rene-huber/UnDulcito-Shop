import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { connectToDB } from "@/mongodb/dataBase";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },        
      }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid Email or Password");
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      session.user = { ...session.user, ...sessionUser._doc };

      return session;
    },

    async signIn({ account, profile }) {
        if (account.provider === "google" || account.provider === "github") {
          try {
            await connectToDB();
      
            let user = await User.findOne({ email: profile.email });
      
            if (!user) {
              let userProfileImagePath = profile.picture;
            
              if (account.provider === "github") {
                userProfileImagePath = profile.avatar_url; 
              }
      
              user = await User.create({
                email: profile.email,
                username: profile.name,
                role: "user",
                profileImagePath: userProfileImagePath,
                wishlist: [],
                cart: [],
                order: [],
                work: [],
              });
            }
          return user;
        } catch (err) {
          console.log("Error checking if user exists: ", err.message);
        }
      }

      return true;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
