// import bcrypt from "bcrypt";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./lib/DBconnect";
import UserModel from "./models/User";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { User as DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Creadentials",
      id: "Creadentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async (credentials, req): Promise<User | null> => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please fill out all fields.");
        }

        // console.log(email, password);

        // connect to database
        await connectDB();

        try {
          // find user by email
          const user = await UserModel.findOne({ email: email }).select(
            "+password +role"
          );

          // if no user found, return error
          if (!user) {
            throw new CredentialsSignin("User not found.");
          }

          // compare password with hashed password
          const isValid = await bcrypt.compare(password, user.password);

          // if password is invalid, return error
          if (!isValid) {
            throw new CredentialsSignin("Invalid credentials.");
          }

          user.password = "";

          return user.toObject() as User;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.role = token.role?.toString();
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.role = user.role?.toString();
        token.email = user.email?.toString();
        token.firstName = user.firstName?.toString();
        token.lastName = user.lastName?.toString();
      }

      return token;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;

          await connectDB();

          let existingUser = await UserModel.findOne({ email });

          if (existingUser) {
            return true;
          } else {
            await UserModel.create({
              email,
              name,
              role: "user",
              authProviderId: id,
            });
            return true;
          }
        } catch (error) {
          console.error(error);
          return false; // Prevent sign-in on error
        }
      }

      return true;
    },
  },
});
