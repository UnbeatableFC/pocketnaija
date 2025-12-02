import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma"; // Import from your existing client

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb", // Specify MongoDB provider
  }),
  emailAndPassword: {  
    enabled: true 
  },
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    // Session token storage time (7 days)
    expiresIn: 60 * 60 * 24 * 7, 
  }
});